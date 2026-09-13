---
title: "Gold Rush: A Wild West Strategy Game With a Deep Q-Network Opponent"
excerpt: "A Catan-inspired Wild West strategy game where the NPC opponent is a Deep Q-Network that predicts and responds to player moves. Built at HooHacks 2026."
collection: projects
---

*HooHacks 2026, University of Virginia. Built with Rui Wang and Darius Khani.*

Gold Rush is a Wild West-themed strategy game inspired by Catan: the first player to earn $500 wins. Each turn you buy mines (high reward, but they can collapse), buy rivers (lower reward, stable), upgrade what you own, or skip. A full game runs five matches, and the first to take three wins outright.

The part I care about is the opponent. Rather than scripting NPC behavior, we trained a **Deep Q-Network** to play, and run it in the browser through ONNX. The network reads the board through three parallel input branches — a spatial CNN over the 20&times;20 grid, an MLP over the asset table, and a scalar context head for the rest of the game state — and selects from **61 discrete actions**: skip, buy any of 30 assets, or upgrade any of 30.

<div class="demo-grid">
  <figure class="demo">
    <div class="demo-embed">
      <iframe src="https://www.youtube.com/embed/sGLg-n__ps8"
              title="Gold Rush demo" loading="lazy" allowfullscreen
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
    <figcaption><strong>Gold Rush</strong> &mdash; gameplay against the DQN opponent.</figcaption>
  </figure>
</div>

**Stack:** Python (training), ONNX (inference), JavaScript, HTML/CSS &middot; MIT licensed

[Source on GitHub](https://github.com/wangrui04/hoohacks26)

<style>
.demo-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5em; margin: 1.5em 0; }
.demo-grid .demo { margin: 0; }
.demo-embed { position: relative; width: 100%; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 4px; background: #000; }
.demo-embed iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
.demo-grid figcaption { font-size: 0.8em; line-height: 1.4; margin-top: 0.5em; }
</style>
