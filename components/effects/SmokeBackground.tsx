"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen colourful smoke flowing behind the whole site (WebGL shader).
 * Purely decorative — it doesn't react to the mouse.
 * Renders at reduced resolution for performance; shows one still frame if the
 * visitor prefers reduced motion; falls back to the CSS background if WebGL
 * isn't available.
 *
 * Tweak the look in FRAG: SPEED (flow speed), the colours in palette(), and
 * BRIGHTNESS (overall strength — keep it low enough for text to stay readable).
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

#define SPEED 0.06
#define BRIGHTNESS 0.62

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

// Colours the smoke cycles through: violet → pink → cyan → blue → (back to violet).
vec3 palette(float t) {
  vec3 violet = vec3(0.52, 0.24, 1.00);
  vec3 pink   = vec3(0.96, 0.28, 0.74);
  vec3 cyan   = vec3(0.16, 0.80, 0.98);
  vec3 blue   = vec3(0.26, 0.34, 1.00);
  float s = fract(t) * 4.0;
  if (s < 1.0) return mix(violet, pink, smoothstep(0.0, 1.0, s));
  if (s < 2.0) return mix(pink, cyan, smoothstep(1.0, 2.0, s));
  if (s < 3.0) return mix(cyan, blue, smoothstep(2.0, 3.0, s));
  return mix(blue, violet, smoothstep(3.0, 4.0, s));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.y;
  float t = u_time * SPEED;

  // Domain-warped noise, drifting slowly up and to the right.
  vec2 p = uv * 1.4 + vec2(t * 0.6, t * 0.25);
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.8 * q + vec2(1.7, 9.2) + 0.2 * t), fbm(p + 3.8 * q + vec2(8.3, 2.8) - 0.15 * t));
  float f = fbm(p + 3.8 * r);

  // Colour drifts through the palette across space and time.
  vec3 smoke = palette(length(q) * 0.9 + r.x * 0.5 + t * 0.35);
  float density = smoothstep(0.25, 0.95, f);       // wispy shape of the smoke
  vec3 base = vec3(0.020, 0.016, 0.045);
  vec3 col = mix(base, smoke, density * 0.85);
  col += smoke * pow(density, 3.0) * 0.35;          // brighter cores

  // Darken toward the edges so text stays readable.
  vec2 c = gl_FragCoord.xy / u_res - 0.5;
  col *= 1.0 - dot(c, c) * 0.8;
  gl_FragColor = vec4(col * BRIGHTNESS, 1.0);
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

    // Render at reduced resolution — smoke is soft, so it still looks smooth.
    const SCALE = 0.5;
    const resize = () => {
      canvas.width = Math.max(1, Math.floor(window.innerWidth * SCALE));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * SCALE));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = 0;

    const draw = (now: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000 + 30);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
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
