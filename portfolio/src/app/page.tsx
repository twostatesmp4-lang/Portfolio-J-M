"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  EDIT ME: all the content lives here                                */
/* ------------------------------------------------------------------ */

const EMAIL = "hello@yourdomain.com"; // TODO: swap for your real email

const AIMS = [
  { title: "Clear", text: "Visitors get what you offer in seconds, not minutes.", c: "var(--violet)" },
  { title: "Fast", text: "Pages open quickly on any phone, any connection.", c: "var(--lime)" },
  { title: "Findable", text: "Built so Google can read it and people can find it.", c: "var(--pink)" },
  { title: "Human", text: "You talk directly to the two people building it.", c: "var(--orange)" },
];

const TEAM = [
  {
    name: "Jainy Pasnani",
    role: "Design & front-end",
    blurb: "Obsessed with layouts that look sharp and behave on every screen.",
    c: "var(--pink)",
  },
  {
    name: "Mehak Arora",
    role: "Full-stack & logic",
    blurb: "Makes the clever stuff work: data, forms, calculators, no surprises.",
    c: "var(--lime)",
  },
];

/* Real name for developers, plain English for everyone else. */
const TECH = [
  { name: "React", plain: "Builds the screens you click and tap" },
  { name: "Next.js", plain: "Makes pages load quickly" },
  { name: "TypeScript", plain: "Catches mistakes before visitors do" },
  { name: "Tailwind CSS", plain: "Keeps the look consistent everywhere" },
  { name: "Framer Motion", plain: "Adds smooth, gentle animations" },
  { name: "Node.js", plain: "The engine running behind the scenes" },
  { name: "REST APIs", plain: "Lets apps and websites share information" },
  { name: "UI / UX", plain: "Designing sites that feel easy to use" },
  { name: "Responsive design", plain: "Looks right on phone, tablet and desktop" },
  { name: "Technical SEO", plain: "Helps your site show up on Google" },
  { name: "Vercel", plain: "Puts your site live on the internet" },
  { name: "Git", plain: "Saves every version so nothing is lost" },
];
const TILE_COLORS = ["var(--violet)", "var(--pink)", "var(--orange)", "var(--lime)", "var(--sky)"];
/* Text colour that stays readable on a solid card colour (violet needs the theme's light/dark ink). */
const inkOn = (c: string) => (c === "var(--violet)" ? "var(--violet-ink)" : "#1B1633");

const TICKER = [
  "Fast websites",
  "Clean design",
  "Mobile-first",
  "Found on Google",
  "No templates",
  "Built by two humans",
];

/*
 * PROJECT IMAGES (optional)
 * Drop real screenshots into /public/projects/ with these names and they
 * replace the illustrated previews automatically:
 *   finfastspace-desktop.png   finfastspace-mobile.png
 *   mindmetrics-desktop.png    mindmetrics-mobile.png
 */
const PROJECTS = [
  {
    key: "fin",
    n: "01",
    name: "FinFastSpace",
    type: "Commercial property platform",
    url: "https://finfastspace.com/",
    summary:
      "Where buyers and brokers in Ahmedabad and GIFT City find commercial space and check the numbers, all in one place.",
    points: [
      "Filter listings by area and type instantly",
      "Built-in loan (EMI) and returns calculators",
      "Optimised for local Google searches",
    ],
    stack: ["Next.js", "TypeScript"],
    desktop: "/finfastspace-desktop.png",
    mobile: "/finfastspace-mobile.jpg",
    cta: "Open the live site",
    bg: "var(--card-a)",
  },
  {
    key: "mind",
    n: "02",
    name: "Mind Metrics",
    type: "Cognitive performance tool",
    url: "https://mind-metrics-nine.vercel.app/",
    summary:
      "Turns abstract scoring into a quick, interactive experience: take it, see your results, actually understand them.",
    points: [
      "Guided flow that takes just minutes",
      "Live charts that make results clear",
      "Smooth on phone, tablet and desktop",
    ],
    stack: ["React", "TypeScript"],
    desktop: "/mindmetrics-desktop.png",
    mobile: "/mindmetrics-mobile.jpg",
    cta: "Try it live",
    bg: "var(--card-b)",
  },
];

/* ------------------------------------------------------------------ */
/*  Styles (self-contained: does not rely on Tailwind for layout)      */
/*  Fonts: Gabarito (headings), Albert Sans (body), Caveat (notes)     */
/* ------------------------------------------------------------------ */

type Mode = "light" | "dark";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600&family=Caveat:wght@600&family=Gabarito:wght@500;700;900&display=swap');

.pf {
  --bg: #FBF7EF;
  --surface: #FFFFFF;
  --ink: #1B1633;
  --muted: #5E587A;
  --line: #1B1633;
  --soft: #E7E1D3;
  --violet: #6C4CFF;
  --violet-ink: #FFFFFF;
  --lime: #D5FF4F;
  --pink: #FF7AB8;
  --orange: #FF9442;
  --sky: #6CCBFF;
  --card-a: #E9E3FF;
  --card-b: #F2FFC4;
  --tint: #F3EEE2;
  color-scheme: light;
}
.pf[data-theme="dark"] {
  --bg: #130F26;
  --surface: #1C1736;
  --ink: #F4F0FF;
  --muted: #A9A3C8;
  --line: #F4F0FF;
  --soft: #342E55;
  --violet: #8D76FF;
  --violet-ink: #130F26;
  --card-a: #251D4F;
  --card-b: #243311;
  --tint: #221C41;
  color-scheme: dark;
}
html[data-pf-theme="light"], html[data-pf-theme="light"] body { background: #FBF7EF; }
html[data-pf-theme="dark"],  html[data-pf-theme="dark"] body  { background: #130F26; }

.pf, .pf * { box-sizing: border-box; }
.pf {
  background: var(--bg); color: var(--ink);
  font-family: 'Albert Sans', system-ui, sans-serif;
  font-size: 17px; line-height: 1.6;
  transition: background-color .3s ease, color .3s ease;
  overflow-x: clip;
}
.pf h1, .pf h2, .pf h3, .pf-display {
  font-family: 'Gabarito', system-ui, sans-serif;
  letter-spacing: -0.02em; line-height: 1.02; margin: 0;
}
.pf p { margin: 0; }
.pf a { color: inherit; text-decoration: none; }
.pf ul { list-style: none; margin: 0; padding: 0; }
.pf section[id], .pf footer[id] { scroll-margin-top: 16px; }

.pf-wrap { max-width: 1120px; margin: 0 auto; padding: 0 24px; }
.pf-muted { color: var(--muted); }
.pf-h2 { font-size: clamp(2rem, 4.6vw, 3.4rem); font-weight: 900; }
.pf-note { font-family: 'Caveat', cursive; font-size: 1.5rem; color: var(--violet); display: inline-block; transform: rotate(-3deg); }

/* ---------- Nav ---------- */
.pf-nav { display: flex; align-items: center; justify-content: space-between; padding: 22px 0; gap: 16px; }
.pf-logo {
  display: inline-flex; align-items: center; gap: .4rem; font-family: 'Gabarito', sans-serif; font-weight: 900; font-size: 1.2rem;
  border: 2px solid var(--line); border-radius: 999px; padding: .3rem .9rem; background: var(--lime); color: #1B1633;
  transform: rotate(-2deg); transition: transform .25s ease;
}
.pf-logo:hover { transform: rotate(2deg) scale(1.05); }
.pf-links { display: none; gap: 2rem; font-weight: 500; }
.pf-links a { position: relative; }
.pf-links a::after { content: ""; position: absolute; left: 0; right: 0; bottom: -4px; height: 2px; background: var(--violet); transform: scaleX(0); transform-origin: left; transition: transform .25s ease; }
.pf-links a:hover::after { transform: scaleX(1); }
.pf-nav-right { display: flex; align-items: center; gap: .6rem; }
@media (min-width: 820px) { .pf-links { display: flex; } }

.pf-toggle { border: 2px solid var(--line); border-radius: 999px; background: var(--surface); color: var(--ink); padding: .35rem .85rem; font: inherit; font-size: .85rem; cursor: pointer; transition: transform .2s; }
.pf-toggle:hover { transform: translateY(-2px); }

/* ---------- Buttons ---------- */
.pf-btn {
  display: inline-flex; align-items: center; gap: .5rem; font-weight: 600; font-size: 1rem;
  padding: .85rem 1.5rem; border: 2px solid var(--line); border-radius: 999px; background: var(--surface); color: var(--ink);
  box-shadow: 3px 3px 0 var(--line); transition: transform .18s ease, box-shadow .18s ease; cursor: pointer;
}
.pf-btn:hover { transform: translate(-2px, -2px); box-shadow: 5px 5px 0 var(--line); }
.pf-btn:active { transform: translate(2px, 2px); box-shadow: 1px 1px 0 var(--line); }
.pf-btn-primary { background: var(--violet); color: var(--violet-ink); }

/* ---------- Hero ---------- */
.pf-hero { position: relative; padding: 56px 0 72px; }
.pf-status {
  display: inline-flex; align-items: center; gap: .55rem; font-weight: 600; font-size: .9rem;
  border: 2px solid var(--line); border-radius: 999px; padding: .3rem .9rem; background: var(--surface);
}
.pf-pulse { width: 9px; height: 9px; border-radius: 50%; background: #22C55E; box-shadow: 0 0 0 0 rgba(34,197,94,.6); animation: pf-pulse 1.8s infinite; }
@keyframes pf-pulse { 70% { box-shadow: 0 0 0 9px rgba(34,197,94,0); } 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); } }
.pf-h1 { font-size: clamp(2.7rem, 7.6vw, 6rem); font-weight: 900; margin-top: 1.4rem; max-width: 12.5em; }
.pf-hl { position: relative; display: inline-block; z-index: 0; padding: 0 .12em; color: #1B1633; }
.pf-hl::before { content: ""; position: absolute; inset: .08em 0 .02em; background: var(--lime); border-radius: .18em; transform: rotate(-1.5deg); z-index: -1; }
.pf-sub { font-size: clamp(1.05rem, 2vw, 1.3rem); max-width: 36em; margin-top: 1.6rem; color: var(--muted); }
.pf-cta-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 2.2rem; }
.pf-who { display: flex; align-items: center; gap: .9rem; margin-top: 2.6rem; }
.pf-avatars { display: flex; }
.pf-avatars span {
  width: 44px; height: 44px; border-radius: 50%; border: 2px solid var(--line); display: flex; align-items: center; justify-content: center;
  font-family: 'Gabarito', sans-serif; font-weight: 900; color: #1B1633;
}
.pf-avatars span + span { margin-left: -10px; }

.pf-deco { position: absolute; pointer-events: none; display: none; }
.pf-float { animation: pf-float 6s ease-in-out infinite; }
@keyframes pf-float { 50% { transform: translateY(-14px) rotate(8deg); } }
@media (min-width: 980px) { .pf-deco { display: block; } }

/* ---------- Ticker ---------- */
.pf-ticker { border-top: 2px solid var(--line); border-bottom: 2px solid var(--line); background: var(--violet); color: var(--violet-ink); overflow: hidden; transform: rotate(-1deg); margin: 0 -10px; }
.pf-ticker-track { display: flex; width: max-content; animation: pf-scroll 30s linear infinite; }
.pf-ticker-item { font-family: 'Gabarito', sans-serif; font-weight: 700; font-size: 1.25rem; padding: .8rem 0; white-space: nowrap; display: flex; align-items: center; }
.pf-ticker-item::after { content: "✦"; margin: 0 1.6rem; color: var(--lime); }
@keyframes pf-scroll { to { transform: translateX(-50%); } }

/* ---------- Notch (shared by Why us, Projects, Skills and Team cards) ----------
   The card needs position: relative and --r (scoop radius). The scoop is a half-circle in the page colour,
   outlined on its curved edge only, sitting over the card's top border. */
.pf-notch {
  position: absolute; top: -2px; left: 50%; width: calc(var(--r) * 2); height: var(--r); transform: translateX(-50%);
  background: var(--bg); border: 2px solid var(--line); border-top: 0; border-radius: 0 0 var(--r) var(--r);
  transition: background-color .3s ease;
}
/* Hides the card's anti-aliased top edge so the scoop opens cleanly (no hairline). */
.pf-notch::before { content: ""; position: absolute; left: 0; right: 0; top: -2px; height: 3px; background: var(--bg); }
.pf-notch-in {
  position: absolute; top: calc(var(--r) * .15); left: 50%; width: calc(var(--r) * .66); height: calc(var(--r) * .66); margin-left: calc(var(--r) * -.33);
  display: flex; align-items: center; justify-content: center; color: var(--ink);
  transition: transform .4s cubic-bezier(.34, 1.56, .64, 1);
}
.pf-notch-in svg { width: 100%; height: 100%; display: block; overflow: visible; }
.pf-notch-in.txt { width: calc(var(--r) * 1.1); margin-left: calc(var(--r) * -.55); font-family: 'Gabarito', sans-serif; font-weight: 900; font-size: 1.5rem; letter-spacing: -0.02em; line-height: 1; }
.pf-aim:hover .pf-notch-in, .pf-project:hover .pf-notch-in, .pf-member:hover .pf-notch-in { transform: scale(1.22) rotate(-8deg); }

/* ---------- Why us ---------- */
.pf-aims { display: grid; grid-template-columns: 1fr; gap: 18px; margin-top: 2.5rem; }
@media (min-width: 640px) { .pf-aims { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 980px) { .pf-aims { grid-template-columns: repeat(4, 1fr); } }
.pf-aim {
  --r: 54px; position: relative; text-align: center; padding: calc(var(--r) + 22px) 1.3rem 1.6rem;
  background: var(--c); color: var(--on, #1B1633);
  border: 2px solid var(--line); border-radius: 24px; box-shadow: 4px 4px 0 var(--line); transition: transform .2s ease;
}
.pf-aim:hover { transform: translateY(-4px) rotate(-1deg); }
.pf-aim h3 { font-size: 1.6rem; font-weight: 900; }
.pf-aim p { margin-top: .5rem; font-size: .98rem; line-height: 1.5; opacity: .9; }

/* ---------- Section shell ---------- */
.pf-sec { padding: 88px 0 0; }
.pf-kicker { display: inline-block; font-weight: 600; font-size: .85rem; border: 2px solid var(--line); border-radius: 999px; padding: .15rem .8rem; background: var(--pink); color: #1B1633; margin-bottom: 1rem; }

/* ---------- Projects ---------- */
.pf-projects { display: grid; gap: 40px; margin-top: 3rem; }
.pf-project {
  --r: 60px; position: relative;
  display: grid; grid-template-columns: minmax(0, 1fr); gap: 36px; align-items: center;
  border: 2px solid var(--line); border-radius: 32px; padding: 26px; padding-top: calc(var(--r) + 22px); box-shadow: 7px 7px 0 var(--line);
  transition: transform .25s ease, box-shadow .25s ease;
}
.pf-project:hover { transform: translate(-2px, -2px); box-shadow: 10px 10px 0 var(--line); }
@media (min-width: 900px) {
  .pf-project { grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 56px; padding: 44px; padding-top: calc(var(--r) + 26px); }
  .pf-project.flip .pf-preview { order: 2; }
}
.pf-preview { position: relative; display: block; padding-bottom: 20px; transform: rotate(-1.5deg); transition: transform .35s ease; }
.pf-project.flip .pf-preview { transform: rotate(1.5deg); }
.pf-project:hover .pf-preview { transform: rotate(0deg) scale(1.02); }
.pf-browser { border: 2px solid var(--line); border-radius: 14px; overflow: hidden; background: var(--surface); box-shadow: 5px 5px 0 var(--line); }
.pf-browser-bar { display: flex; align-items: center; gap: 6px; padding: .5rem .75rem; border-bottom: 2px solid var(--line); background: var(--tint); }
.pf-browser-bar i { width: 9px; height: 9px; border-radius: 50%; border: 1.5px solid var(--line); display: block; }
.pf-browser-bar i:nth-child(1) { background: var(--pink); }
.pf-browser-bar i:nth-child(2) { background: var(--orange); }
.pf-browser-bar i:nth-child(3) { background: var(--lime); }
.pf-browser-bar span { margin-left: .5rem; flex: 1; font-size: .7rem; color: var(--muted); background: var(--surface); border: 1.5px solid var(--soft); border-radius: 999px; padding: 0 .7rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pf-view { position: relative; aspect-ratio: 2 / 1; overflow: hidden; background: var(--tint); }
.pf-shot { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: left top; transition: opacity .3s ease; }
.pf-phone { position: absolute; right: -10px; bottom: -4px; width: 23%; min-width: 74px; border: 2px solid var(--line); border-radius: 18px; overflow: hidden; background: var(--surface); box-shadow: 4px 4px 0 var(--line); transition: transform .35s ease; }
.pf-phone-view { position: relative; aspect-ratio: 9 / 18; background: var(--tint); }
.pf-project:hover .pf-phone { transform: translateY(-8px) rotate(3deg); }
.pf-open {
  position: absolute; left: -8px; top: -14px; z-index: 3; font-family: 'Gabarito', sans-serif; font-weight: 700; font-size: .9rem;
  background: var(--lime); color: #1B1633; border: 2px solid var(--line); border-radius: 999px; padding: .3rem .85rem;
  transform: rotate(-6deg); transition: transform .3s ease; box-shadow: 2px 2px 0 var(--line);
}
.pf-project:hover .pf-open { transform: rotate(4deg) scale(1.1); }

.pf-pnum { font-family: 'Gabarito', sans-serif; font-weight: 900; font-size: .95rem; }
.pf-ptype { display: inline-block; margin-top: .6rem; font-size: .8rem; font-weight: 600; border: 2px solid var(--line); border-radius: 999px; padding: .1rem .75rem; background: var(--surface); }
.pf-pname { font-size: clamp(2.1rem, 4.2vw, 3.2rem); font-weight: 900; margin-top: .9rem; }
.pf-psum { margin-top: .9rem; color: var(--muted); }
.pf-points { margin-top: 1.2rem; display: grid; gap: .55rem; }
.pf-points li { display: flex; gap: .7rem; font-size: .98rem; line-height: 1.45; }
.pf-points li::before { content: "✦"; color: var(--violet); flex: none; }
.pf-stack { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.3rem; }
.pf-stack span { font-size: .8rem; font-weight: 600; border: 2px solid var(--line); border-radius: 999px; padding: .1rem .75rem; background: var(--surface); }
.pf-visit { margin-top: 1.8rem; }

/* ---------- Illustrated previews ---------- */
.mk { position: absolute; inset: 0; padding: 4.5%; display: flex; flex-direction: column; gap: 4%; background: var(--surface); }
.mk-top { display: flex; align-items: center; justify-content: space-between; }
.mk-logo { width: 22%; height: 14px; border-radius: 4px; background: var(--violet); display: block; }
.mk-nav { display: flex; gap: 6px; }
.mk-nav i { width: 22px; height: 6px; border-radius: 3px; background: var(--soft); display: block; }
.mk-search { height: 26px; border: 2px solid var(--line); border-radius: 999px; display: flex; align-items: center; padding: 0 .8rem; font-size: .62rem; color: var(--muted); background: var(--surface); }
.mk-chips { display: flex; gap: 6px; }
.mk-chips span { font-size: .55rem; font-weight: 600; border: 1.5px solid var(--line); border-radius: 999px; padding: 1px 8px; }
.mk-chips span.on { background: var(--lime); color: #1B1633; }
.mk-split { display: grid; grid-template-columns: 1.6fr 1fr; gap: 4%; flex: 1; min-height: 0; }
.mk-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px; }
.mk-card { border: 1.5px solid var(--line); border-radius: 8px; padding: 5px; display: flex; flex-direction: column; gap: 4px; background: var(--surface); }
.mk-img { flex: 1; border-radius: 5px; min-height: 22px; }
.g1 { background: linear-gradient(135deg, var(--violet), var(--sky)); }
.g2 { background: linear-gradient(135deg, var(--pink), var(--orange)); }
.g3 { background: linear-gradient(135deg, var(--lime), var(--sky)); }
.mk-line { height: 5px; border-radius: 3px; background: var(--soft); display: block; }
.mk-price { height: 7px; width: 40%; border-radius: 4px; background: var(--ink); display: block; }
.mk-calc { border: 1.5px solid var(--line); border-radius: 8px; padding: 7px; background: var(--card-a); display: flex; flex-direction: column; gap: 7px; font-size: .55rem; font-weight: 700; }
.mk-slider { height: 5px; border-radius: 3px; background: var(--soft); position: relative; display: block; }
.mk-slider::after { content: ""; position: absolute; left: var(--p, 50%); top: -3px; width: 10px; height: 10px; border-radius: 50%; background: var(--violet); border: 1.5px solid var(--line); transform: translateX(-50%); }
.mk-result { margin-top: auto; height: 16px; border-radius: 6px; background: var(--violet); display: block; }
.mk-prog { display: flex; gap: 5px; }
.mk-prog i { width: 16px; height: 6px; border-radius: 3px; background: var(--soft); display: block; }
.mk-prog i.on { background: var(--violet); }
.mk-ring { display: flex; align-items: center; justify-content: center; border: 1.5px solid var(--line); border-radius: 10px; background: var(--card-a); padding: 6px; }
.mk-ring svg { width: 78%; max-height: 100%; }
.mk-bars { display: flex; align-items: flex-end; gap: 6px; border: 1.5px solid var(--line); border-radius: 10px; padding: 8px; background: var(--surface); }
.mk-bars i { flex: 1; border-radius: 4px 4px 0 0; display: block; }
.mk-q { height: 9px; border-radius: 5px; background: var(--soft); display: block; }
.mk-phone-body { position: absolute; inset: 0; padding: 12%; display: flex; flex-direction: column; gap: 7px; background: var(--surface); }
.mk-phone-block { border-radius: 6px; display: block; }

/* ---------- Skills (notched cards: icon sits in a scooped-out top; hover lifts the card and pops the icon) ---------- */
.pf-skills { display: grid; grid-template-columns: 1fr; gap: 26px 22px; margin-top: 2.5rem; }
@media (min-width: 640px) { .pf-skills { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 980px) { .pf-skills { grid-template-columns: repeat(3, 1fr); } }
.pf-skill {
  --r: 54px;
  position: relative; text-align: center; padding: calc(var(--r) + 22px) 1.4rem 1.7rem;
  background: var(--c); color: var(--on, #1B1633);
  border: 2px solid var(--line); border-radius: 26px; box-shadow: 4px 4px 0 var(--line);
  transition: opacity .3s ease, transform .3s ease, box-shadow .3s ease; outline-offset: 4px;
}
.pf-skill h3 { font-size: 1.35rem; font-weight: 900; }
.pf-skill p { margin-top: .45rem; font-size: .95rem; line-height: 1.45; opacity: .9; }
.pf-skills:hover .pf-skill { opacity: .5; }
.pf-skills .pf-skill:hover, .pf-skills .pf-skill:focus-visible { opacity: 1; transform: translate(-2px, -4px); box-shadow: 6px 8px 0 var(--line); }
.pf-skill:hover .pf-notch-in, .pf-skill:focus-visible .pf-notch-in { transform: scale(1.22) rotate(-8deg); }

/* ---------- Team ---------- */
.pf-team { display: grid; grid-template-columns: 1fr; gap: 22px; margin-top: 2.5rem; }
@media (min-width: 760px) { .pf-team { grid-template-columns: repeat(2, 1fr); } }
.pf-member {
  --r: 54px; position: relative; text-align: center; padding: calc(var(--r) + 24px) 1.8rem 1.9rem;
  background: var(--c); color: var(--on, #1B1633);
  border: 2px solid var(--line); border-radius: 28px; box-shadow: 5px 5px 0 var(--line); transition: transform .25s ease;
}
.pf-member:nth-child(1) { transform: rotate(-1deg); }
.pf-member:nth-child(2) { transform: rotate(1deg); }
.pf-member:hover { transform: rotate(0) translateY(-4px); }
.pf-member h3 { font-size: 1.7rem; font-weight: 900; }
.pf-role { display: inline-block; margin-top: .55rem; font-weight: 600; font-size: .85rem; border: 2px solid var(--line); border-radius: 999px; padding: .1rem .8rem; background: var(--surface); color: var(--ink); }
.pf-member p.b { margin-top: .8rem; opacity: .9; }

/* ---------- Contact ---------- */
.pf-contact-wrap { padding: 96px 0 40px; }
.pf-contact {
  position: relative; overflow: hidden; background: var(--violet); color: var(--violet-ink); border: 2px solid var(--line); border-radius: 36px;
  padding: clamp(2rem, 6vw, 4.5rem); box-shadow: 8px 8px 0 var(--line);
}
.pf-contact h2 { font-size: clamp(2.3rem, 6.4vw, 5rem); font-weight: 900; max-width: 11em; }
.pf-contact p.lead { margin-top: 1.2rem; max-width: 30em; opacity: .9; font-size: 1.1rem; }
.pf-mail { display: inline-flex; align-items: center; gap: .6rem; margin-top: 2rem; font-weight: 700; font-size: clamp(1rem, 2.4vw, 1.3rem); background: var(--lime); color: #1B1633; border: 2px solid #1B1633; border-radius: 999px; padding: .9rem 1.6rem; box-shadow: 4px 4px 0 #1B1633; transition: transform .18s, box-shadow .18s; word-break: break-all; }
.pf-mail:hover { transform: translate(-2px, -2px) rotate(-1deg); box-shadow: 7px 7px 0 #1B1633; }
.pf-copy { text-align: center; font-size: .8rem; color: var(--muted); padding: 2rem 0 2.5rem; }

.pf :focus-visible { outline: 3px solid var(--violet); }

@media (prefers-reduced-motion: reduce) {
  .pf *, .pf *::before, .pf *::after { transition: none !important; animation: none !important; }
}
`;

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Portfolio() {
  const [mode, setMode] = useState<Mode>("light");
  const reduce = useReducedMotion();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      if (saved === "light" || saved === "dark") return setMode(saved);
    } catch {}
    if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setMode("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-pf-theme", mode);
  }, [mode]);

  const toggle = () => {
    const next: Mode = mode === "light" ? "dark" : "light";
    setMode(next);
    try {
      localStorage.setItem("portfolio-theme", next);
    } catch {}
  };

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.45, delay, ease: "easeOut" as const },
  });

  return (
    <div data-theme={mode} className="pf">
      <style>{CSS}</style>

      <div className="pf-wrap">
        {/* Nav */}
        <header className="pf-nav">
          <a href="#top" className="pf-logo">J&amp;M ✦</a>
          <nav className="pf-links">
            <a href="#work">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#us">Us</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="pf-nav-right">
            <button
              onClick={toggle}
              aria-pressed={mode === "dark"}
              aria-label={`Switch to ${mode === "light" ? "dark" : "light"} theme`}
              className="pf-toggle"
            >
              {mode === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
            <a href="#contact" className="pf-btn pf-btn-primary" style={{ padding: ".5rem 1.1rem" }}>
              Hire us
            </a>
          </div>
        </header>

        {/* Hero */}
        <main id="top">
          <section className="pf-hero">
            <Star className="pf-deco pf-float" style={{ right: "6%", top: "40px", width: 84, color: "var(--pink)" }} />
            <Squiggle className="pf-deco" style={{ right: "18%", bottom: "70px", width: 130, color: "var(--violet)" }} />
            <Blob className="pf-deco pf-float" style={{ right: "2%", bottom: "40px", width: 70, color: "var(--lime)", animationDelay: "-2s" }} />

            <motion.div {...reveal()}>
              <span className="pf-status">
                <span className="pf-pulse" /> Open for new projects
              </span>
              <h1 className="pf-h1">
                Websites that make people stop scrolling and{" "}
                <span className="pf-hl">get in touch.</span>
              </h1>
              <p className="pf-sub">
                We're Jainy &amp; Mehak, a two-person web team. We design and build fast,
                good-looking sites for small businesses and ideas, made to turn visitors
                into customers.
              </p>
              <div className="pf-cta-row">
                <a href="#work" className="pf-btn pf-btn-primary">See what we've built ↓</a>
                <a href="#contact" className="pf-btn">Start a project</a>
              </div>
              <div className="pf-who">
                <div className="pf-avatars" aria-hidden>
                  <span style={{ background: "var(--pink)" }}>J</span>
                  <span style={{ background: "var(--lime)" }}>M</span>
                </div>
                <p className="pf-muted" style={{ fontSize: ".95rem" }}>
                  You work directly with both of us. No middlemen.
                </p>
              </div>
            </motion.div>
          </section>
        </main>
      </div>

      {/* Ticker */}
      <div className="pf-ticker" aria-hidden>
        <div className="pf-ticker-track">
          {[...TICKER, ...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="pf-ticker-item">{t}</span>
          ))}
        </div>
      </div>

      <div className="pf-wrap">
        {/* Why us */}
        <section className="pf-sec">
          <motion.div {...reveal()}>
            <span className="pf-kicker">Why us</span>
            <h2 className="pf-h2">Simple promise. Four things.</h2>
          </motion.div>
          <div className="pf-aims">
            {AIMS.map((a, i) => (
              <motion.div
                key={a.title}
                {...reveal(i * 0.06)}
                className="pf-aim"
                style={{ ["--c" as string]: a.c, ["--on" as string]: inkOn(a.c) }}
              >
                <span className="pf-notch" aria-hidden />
                <span className="pf-notch-in" aria-hidden>
                  <AimIcon name={a.title} />
                </span>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="pf-sec">
          <motion.div {...reveal()}>
            <span className="pf-kicker">Our work</span>
            <h2 className="pf-h2">Real sites. Live right now.</h2>
            <p style={{ marginTop: ".8rem" }}>
              <span className="pf-note">psst, click a project to open it ↓</span>
            </p>
          </motion.div>

          <div className="pf-projects">
            {PROJECTS.map((p, i) => (
              <motion.article
                key={p.name}
                {...reveal()}
                className={`pf-project ${i % 2 ? "flip" : ""}`}
                style={{ background: p.bg }}
              >
                <span className="pf-notch" aria-hidden />
                <span className="pf-notch-in" aria-hidden>
                  <ProjectIcon name={p.key} />
                </span>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-preview"
                  aria-label={`${p.cta}: ${p.name}`}
                >
                  <span className="pf-open">Open ↗</span>
                  <div className="pf-browser">
                    <div className="pf-browser-bar" aria-hidden>
                      <i /><i /><i />
                      <span>{p.url.replace("https://", "").replace(/\/$/, "")}</span>
                    </div>
                    <div className="pf-view">
                      {p.key === "fin" ? <FinMock /> : <MindMock />}
                      <Shot src={p.desktop} alt={`${p.name} homepage preview`} />
                    </div>
                  </div>
                  <div className="pf-phone" aria-hidden>
                    <div className="pf-phone-view">
                      <PhoneMock variant={p.key} />
                      <Shot src={p.mobile} alt="" />
                    </div>
                  </div>
                </a>

                <div>
                  <span className="pf-pnum">{p.n} /</span>
                  <br />
                  <span className="pf-ptype">{p.type}</span>
                  <h3 className="pf-pname">{p.name}</h3>
                  <p className="pf-psum">{p.summary}</p>
                  <ul className="pf-points">
                    {p.points.map((pt) => (
                      <li key={pt}>{pt}</li>
                    ))}
                  </ul>
                  <div className="pf-stack">
                    {p.stack.map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                  </div>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pf-btn pf-btn-primary pf-visit"
                  >
                    {p.cta} ↗
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="pf-sec">
          <motion.div {...reveal()}>
            <span className="pf-kicker">Skills</span>
            <h2 className="pf-h2">What we use, in plain English.</h2>
          </motion.div>
          <motion.div {...reveal(0.05)} className="pf-skills">
            {TECH.map((t, i) => (
              <div
                key={t.name}
                className="pf-skill"
                tabIndex={0}
                style={{
                  ["--c" as string]: TILE_COLORS[i % TILE_COLORS.length],
                  ["--on" as string]: inkOn(TILE_COLORS[i % TILE_COLORS.length]),
                }}
              >
                <span className="pf-notch" aria-hidden />
                <span className="pf-notch-in" aria-hidden>
                  <SkillIcon name={t.name} />
                </span>
                <h3>{t.name}</h3>
                <p>{t.plain}</p>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Team */}
        <section id="us" className="pf-sec">
          <motion.div {...reveal()}>
            <span className="pf-kicker">The team</span>
            <h2 className="pf-h2">Two people. One high bar.</h2>
          </motion.div>
          <div className="pf-team">
            {TEAM.map((m, i) => (
              <motion.div
                key={m.name}
                {...reveal(i * 0.08)}
                className="pf-member"
                style={{ ["--c" as string]: m.c, ["--on" as string]: inkOn(m.c) }}
              >
                <span className="pf-notch" aria-hidden />
                <span className="pf-notch-in txt" aria-hidden>
                  {m.name.split(" ").map((w) => w[0]).join("")}
                </span>
                <h3>{m.name}</h3>
                <p className="pf-role">{m.role}</p>
                <p className="b">{m.blurb}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="pf-contact-wrap">
          <motion.div {...reveal()} className="pf-contact">
            <Star
              className="pf-deco pf-float"
              style={{ right: "7%", top: "10%", width: 90, color: "var(--lime)" }}
            />
            <h2>Got an idea? Let's make it real.</h2>
            <p className="lead">
              Tell us what you're building. We'll come back with a clear plan and a
              site you'll be proud to share.
            </p>
            <a href={`mailto:${EMAIL}`} className="pf-mail">
              {EMAIL} <span aria-hidden>→</span>
            </a>
          </motion.div>
          <p className="pf-copy">
            © 2026 Jainy Pasnani &amp; Mehak Arora. Made with care, caffeine and a lot of tabs.
          </p>
        </section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Pieces                                                             */
/* ------------------------------------------------------------------ */

/** Real screenshot: fades in over the illustrated preview once it loads. */
function Shot({ src, alt }: { src: string; alt: string }) {
  const [ok, setOk] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="pf-shot"
      src={src}
      alt={ok ? alt : ""}
      loading="lazy"
      onLoad={() => setOk(true)}
      onError={() => setOk(false)}
      style={{ opacity: ok ? 1 : 0 }}
    />
  );
}

/* Illustrated sneak-peeks (replaced automatically by real screenshots) */

function FinMock() {
  return (
    <div className="mk" aria-hidden>
      <div className="mk-top">
        <i className="mk-logo" />
        <span className="mk-nav"><i /><i /><i /></span>
      </div>
      <div className="mk-search">Search area or property type…</div>
      <div className="mk-chips">
        <span>Office</span>
        <span className="on">Retail</span>
        <span>Showroom</span>
      </div>
      <div className="mk-split">
        <div className="mk-cards">
          {["g1", "g2", "g3"].map((g) => (
            <div key={g} className="mk-card">
              <i className={`mk-img ${g}`} />
              <i className="mk-line" />
              <i className="mk-price" />
            </div>
          ))}
        </div>
        <div className="mk-calc">
          EMI calculator
          <i className="mk-slider" style={{ ["--p" as string]: "65%" }} />
          <i className="mk-slider" style={{ ["--p" as string]: "35%" }} />
          <i className="mk-result" />
        </div>
      </div>
    </div>
  );
}

function MindMock() {
  const bars = [
    { h: "45%", c: "var(--pink)" },
    { h: "70%", c: "var(--violet)" },
    { h: "55%", c: "var(--orange)" },
    { h: "88%", c: "var(--lime)" },
    { h: "62%", c: "var(--sky)" },
  ];
  return (
    <div className="mk" aria-hidden>
      <div className="mk-top">
        <i className="mk-logo" />
        <span className="mk-prog"><i className="on" /><i className="on" /><i className="on" /><i /><i /></span>
      </div>
      <i className="mk-q" style={{ width: "70%" }} />
      <div className="mk-split">
        <div className="mk-ring">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="none" stroke="var(--soft)" strokeWidth="12" />
            <circle
              cx="50" cy="50" r="38" fill="none" stroke="var(--violet)" strokeWidth="12" strokeLinecap="round"
              strokeDasharray="165 239" transform="rotate(-90 50 50)"
            />
          </svg>
        </div>
        <div className="mk-bars">
          {bars.map((b, i) => (
            <i key={i} style={{ height: b.h, background: b.c, border: "1.5px solid var(--line)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneMock({ variant }: { variant: string }) {
  return (
    <div className="mk-phone-body" aria-hidden>
      <i className="mk-phone-block" style={{ height: 8, width: "50%", background: "var(--violet)" }} />
      {variant === "fin" ? (
        <>
          <i className="mk-phone-block" style={{ height: 38, background: "linear-gradient(135deg, var(--pink), var(--orange))" }} />
          <i className="mk-phone-block" style={{ height: 38, background: "linear-gradient(135deg, var(--lime), var(--sky))" }} />
          <i className="mk-phone-block" style={{ height: 8, background: "var(--soft)" }} />
        </>
      ) : (
        <>
          <i className="mk-phone-block" style={{ height: 44, borderRadius: "50%", width: 44, alignSelf: "center", background: "var(--violet)" }} />
          <i className="mk-phone-block" style={{ height: 8, background: "var(--soft)" }} />
          <i className="mk-phone-block" style={{ height: 8, width: "70%", background: "var(--soft)" }} />
        </>
      )}
    </div>
  );
}

/* Skill icons: inline SVG, keyed by TECH name. Add a case here when you add a skill. */

function SkillIcon({ name }: { name: string }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (name) {
    case "React":
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="#2BB5DD" strokeWidth="1.7">
          <ellipse cx="16" cy="16" rx="13.5" ry="5.2" />
          <ellipse cx="16" cy="16" rx="13.5" ry="5.2" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="13.5" ry="5.2" transform="rotate(120 16 16)" />
          <circle cx="16" cy="16" r="2.4" fill="#2BB5DD" stroke="none" />
        </svg>
      );
    case "Next.js":
      return (
        <svg viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="currentColor" />
          <g fill="none" stroke="var(--bg)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11.5 21.5v-11l10 12" />
            <path d="M21 10v6" />
          </g>
        </svg>
      );
    case "TypeScript":
      return (
        <svg viewBox="0 0 32 32">
          <rect x="2" y="2" width="28" height="28" rx="5" fill="#3178C6" />
          <g fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.5 14.5h9M12 14.5v10" />
            <path d="M25 15.6c-.7-.9-1.6-1.3-2.7-1.3-1.4 0-2.4.8-2.4 2 0 3 5.3 1.7 5.3 4.8 0 1.4-1.2 2.4-2.9 2.4-1.2 0-2.3-.5-3-1.5" />
          </g>
        </svg>
      );
    case "Tailwind CSS":
      return (
        <svg viewBox="0 0 24 24" fill="#38BDF8">
          <path d="M12 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C13.7 10.6 15 12 18 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C16.3 6.2 15 4.8 12 4.8zM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.9.2 1.6.9 2.3 1.6C7.7 17.8 9 19.2 12 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.9-.2-1.6-.9-2.3-1.6C10.3 13.4 9 12 6 12z" />
        </svg>
      );
    case "Framer Motion":
      return (
        <svg viewBox="-3 0 30 24" fill="currentColor">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      );
    case "Node.js":
      return (
        <svg viewBox="0 0 32 32">
          <path d="M16 2l12 7v14l-12 7-12-7V9z" fill="#5FA04E" stroke="#3E7A34" strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M12.2 21.5v-11l7.6 11v-11" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "REST APIs":
      return (
        <svg viewBox="0 0 32 32" fill="none" stroke="var(--violet)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 11h23M27 11l-5-5M27 11l-5 5" />
          <path d="M28 21H5M5 21l5-5M5 21l5 5" />
        </svg>
      );
    case "UI / UX":
      return (
        <svg viewBox="0 0 32 32">
          <g {...stroke} strokeWidth={2.2}>
            <rect x="3" y="5" width="22" height="18" rx="3" />
            <path d="M3 11h22" />
          </g>
          <path d="M17 15l11.5 4.5-5 1.8-1.8 5z" fill="#FF7A1A" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
    case "Responsive design":
      return (
        <svg viewBox="0 0 32 32">
          <g {...stroke} strokeWidth={2.2}>
            <rect x="2.5" y="6" width="20" height="14" rx="2.5" />
            <path d="M9 26h7M12.5 20v6" />
          </g>
          <rect x="22.5" y="11" width="7.5" height="15" rx="2.2" fill="var(--bg)" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="26.25" cy="23.2" r=".9" fill="currentColor" />
        </svg>
      );
    case "Technical SEO":
      return (
        <svg viewBox="0 0 32 32">
          <g {...stroke} strokeWidth={2.4}>
            <circle cx="14" cy="14" r="9" />
            <path d="M21 21l7.5 7.5" />
          </g>
          <path d="M10 18v-3M14 18v-7M18 18v-5" fill="none" stroke="#22C55E" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );
    case "Vercel":
      return (
        <svg viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 4l14 24H2z" />
        </svg>
      );
    case "Git":
      return (
        <svg viewBox="0 0 32 32">
          <rect x="5" y="5" width="22" height="22" rx="4" fill="#F05032" transform="rotate(45 16 16)" />
          <g fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
            <path d="M13 10.5v11" />
            <path d="M13 13l7 3.2" />
          </g>
          <g fill="#fff">
            <circle cx="13" cy="10.5" r="2.3" />
            <circle cx="13" cy="21.5" r="2.3" />
            <circle cx="20.5" cy="16.4" r="2.3" />
          </g>
        </svg>
      );
    case "Python":
      return (
        <svg viewBox="0 0 32 32">
          <path d="M15.8 2C10.6 2 11 4.3 11 4.3V7h5v.9H8.7S4 7.4 4 13.9s4 6.2 4 6.2h2.3v-3s-.1-4 3.9-4h5.5s3.6.1 3.6-3.5V5.5S23.8 2 15.8 2z" fill="#3A75B0" />
          <path d="M16.2 30c5.2 0 4.8-2.3 4.8-2.3V25h-5v-.9h7.3s4.7.5 4.7-6-4-6.2-4-6.2H21.7v3s.1 4-3.9 4h-5.5S8.7 19 8.7 22.5v4S8.2 30 16.2 30z" fill="#FFC331" />
          <circle cx="13" cy="5.2" r="1.1" fill="#fff" />
          <circle cx="19" cy="26.8" r="1.1" fill="#fff" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32">
          <path d="M16 3l3.2 9.3L29 16l-9.8 3.7L16 29l-3.2-9.3L3 16l9.8-3.7z" fill="var(--violet)" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
      );
  }
}

/* Why us icons: ink outline with the card's own colour as the fill. */

function AimIcon({ name }: { name: string }) {
  const g = { fill: "var(--c)", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <svg viewBox="0 0 32 32">
      {name === "Clear" && (
        <>
          <path d="M2.5 16C6.5 9 11 6 16 6s9.5 3 13.5 10C25.5 23 21 26 16 26S6.5 23 2.5 16z" {...g} />
          <circle cx="16" cy="16" r="4.2" fill="currentColor" />
        </>
      )}
      {name === "Fast" && <path d="M18.5 2.5L6 18h8.5L12.5 29.5 26 13h-8.5z" {...g} />}
      {name === "Findable" && (
        <>
          <circle cx="14" cy="14" r="9.5" {...g} />
          <path d="M21 21l7.5 7.5" {...g} fill="none" strokeWidth={3} />
        </>
      )}
      {name === "Human" && (
        <>
          <circle cx="11" cy="10.5" r="4.2" {...g} />
          <path d="M3 27c0-5.5 3.5-8.5 8-8.5s8 3 8 8.5z" {...g} />
          <circle cx="22" cy="12" r="3.6" fill="none" stroke="currentColor" strokeWidth="2.2" />
          <path d="M22.5 19c3.5.3 6.5 2.8 6.5 8h-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </>
      )}
    </svg>
  );
}

/* Project icons (sit in the card's scoop). */

function ProjectIcon({ name }: { name: string }) {
  const line = { stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  if (name === "fin") {
    return (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="6" y="3.5" width="14" height="24.5" rx="1.5" fill="var(--lime)" {...line} />
        <path d="M20 12h6v16h-6" {...line} />
        <path d="M10 9h2M14 9h2M10 14h2M14 14h2M10 19h2M14 19h2M23 17h.5M23 21.5h.5" {...line} />
        <path d="M2.5 28h27" {...line} />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12.5" fill="var(--pink)" {...line} />
      <path d="M10.5 21.5v-4M16 21.5v-9M21.5 21.5v-6" {...line} strokeWidth={2.8} />
    </svg>
  );
}

/* Decorative shapes */

function Star({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <path
        d="M50 4 L61 36 L95 38 L68 58 L78 92 L50 72 L22 92 L32 58 L5 38 L39 36 Z"
        fill="currentColor" stroke="var(--line)" strokeWidth="3" strokeLinejoin="round"
      />
    </svg>
  );
}

function Squiggle({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 130 30" className={className} style={style} aria-hidden fill="none">
      <path
        d="M4 15 Q 20 -5 36 15 T 68 15 T 100 15 T 126 15"
        stroke="currentColor" strokeWidth="7" strokeLinecap="round"
      />
    </svg>
  );
}

function Blob({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <circle cx="50" cy="50" r="42" fill="currentColor" stroke="var(--line)" strokeWidth="3" />
    </svg>
  );
}
