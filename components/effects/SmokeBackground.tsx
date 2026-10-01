"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen animated smoke behind the whole site (WebGL shader).
 * The smoke swirls and glows along a trail that follows the mouse / finger.
 * Renders at reduced resolution for performance; shows one still frame if the
 * visitor prefers reduced motion; falls back to the CSS background if WebGL
 * isn't available.
 */

const TRAIL = 14;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec3 u_trail[${TRAIL}]; // xy = position in pixels, z = strength

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 rot = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = rot * p * 2.0 + 3.1; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.y;
  float t = u_time * 0.045;

  // Cursor trail: swirl + push the smoke, and add a soft glow.
  vec2 disp = vec2(0.0);
  float glow = 0.0;
  for (int i = 0; i < ${TRAIL}; i++) {
    vec2 m = u_trail[i].xy / u_res.y;
    float s = u_trail[i].z;
    vec2 d = uv - m;
    float f = exp(-dot(d, d) * 22.0) * s;
    disp += vec2(-d.y, d.x) * f * 2.2 + d * f * 0.8;
    glow += f;
  }

  vec2 p = uv * 1.5 + disp;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.5 * q + vec2(1.7, 9.2) + 0.15 * t), fbm(p + 3.5 * q + vec2(8.3, 2.8) - 0.12 * t));
  float f = fbm(p + 3.5 * r);

  vec3 base   = vec3(0.020, 0.016, 0.045);
  vec3 violet = vec3(0.42, 0.20, 0.85);
  vec3 pink   = vec3(0.85, 0.30, 0.80);
  vec3 cyan   = vec3(0.15, 0.70, 0.85);

  vec3 col = mix(base, violet, clamp(f * f * 1.6, 0.0, 1.0));
  col = mix(col, pink, clamp(length(q) - 0.55, 0.0, 1.0) * 0.55);
  col = mix(col, cyan, clamp(r.y * r.y - 0.25, 0.0, 1.0) * 0.5);
  col *= 0.25 + 0.75 * f;                    // smoky density
  col += min(glow, 1.0) * vec3(0.55, 0.38, 0.95) * 0.22; // cursor glow

  // Darken toward the edges and overall, so text stays readable.
  vec2 c = gl_FragCoord.xy / u_res - 0.5;
  col *= 1.0 - dot(c, c) * 0.7;
  gl_FragColor = vec4(col * 0.6, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export function SmokeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uTrail = gl.getUniformLocation(prog, "u_trail");

    // Render at reduced resolution — smoke is soft, so it still looks smooth.
    const SCALE = 0.5;
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    // Trail: each point eases toward the one ahead of it (a "snake" behind the cursor).
    const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 };
    const trail = Array.from({ length: TRAIL }, () => ({ x: mouse.x, y: mouse.y }));
    let energy = 0;
    const onMove = (x: number, y: number) => {
      energy = Math.min(1, energy + Math.hypot(x - mouse.x, y - mouse.y) / 120);
      mouse.x = x;
      mouse.y = y;
    };
    const onMouse = (e: MouseEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => e.touches[0] && onMove(e.touches[0].clientX, e.touches[0].clientY);
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    const data = new Float32Array(TRAIL * 3);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = 0;

    const draw = (now: number) => {
      trail[0].x += (mouse.x - trail[0].x) * 0.35;
      trail[0].y += (mouse.y - trail[0].y) * 0.35;
      for (let i = 1; i < TRAIL; i++) {
        trail[i].x += (trail[i - 1].x - trail[i].x) * 0.3;
        trail[i].y += (trail[i - 1].y - trail[i].y) * 0.3;
      }
      energy *= 0.965;
      for (let i = 0; i < TRAIL; i++) {
        data[i * 3] = trail[i].x * SCALE;
        data[i * 3 + 1] = (window.innerHeight - trail[i].y) * SCALE; // GL y is bottom-up
        data[i * 3 + 2] = (0.18 + energy) * (1 - i / TRAIL);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000 + 40);
      gl.uniform3fv(uTrail, data);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-0 transition-opacity duration-[1500ms]"
    />
  );
}
