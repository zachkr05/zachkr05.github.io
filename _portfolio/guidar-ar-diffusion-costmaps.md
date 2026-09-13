---
title: "GuidAR: Diffusion Costmaps From Human AR Trajectory Edits"
excerpt: "A mixture-of-experts conditional diffusion model that learns robot costmaps from trajectory edits a person makes in augmented reality, so a single correction generalizes to future plans. Undergraduate senior thesis."
collection: portfolio
---

*University of Virginia, AMR Lab, August 2024 – June 2026. Advisor: Prof. Nicola Bezzo.*

A person correcting a robot's trajectory is telling you something about a cost function you never wrote down. GuidAR takes those corrections seriously as data: a conditional diffusion model over costmaps and trajectories is trained with **value-function-derived supervision** from human trajectory edits, so the robot adapts its future plans rather than treating each edit as a one-time override.

This package is multimodal. You can either use speech which handles ambiguous commands or point-click via Meta Quest 3 controllers. You can modify the trajectory at any point during execution. The general pipeline is suggest a target point, modify it, then next time we re-route we learn what your preference suggest a trajectory more inline with your preferences.

There are 4 separate HW parts of this: Unity, TCP server, LLM server, and MPCC. All commands route through the TCP server, it acts as the server that distributes the commands. This required hard multi-threading to handle multiple commands at once and for it to be fast enough to modify trajectories at run-time.

The Unity client is the human end of the loop, running on a Meta Quest 3. Trajectories are B-splines you reshape by grabbing and dragging control points, with spoken commands picked up through Meta's Voice SDK. It talks to the backend as a TCP client over length-prefixed frames (a flag byte, a big-endian length, then UTF-8 JSON) and marshals every reply back onto Unity's main thread before it touches the scene.

The LLM server is a Gemini-backed reasoning bridge between Unity and the control pipeline. An intent stage routes each utterance to either a new target point or an edit of the existing trajectory, and the output is a validated call rather than prose to parse. The scene is rendered to a 2D Plotly map and passed in as an image, grounding the reply in a picture of the space.

The costmap model is a mixture of experts, one lightweight time-conditioned U-Net per obstacle class, each a DDPM on a cosine schedule denoising that class's contribution to the map. A differentiable soft value-iteration planner rolls a path out of the generated costmap, so the gap between your edited path and the planned one backpropagates into the map itself. Only the LoRA adapters of the experts your edit touched are unfrozen, so a correction near a chair changes how chairs are costed without disturbing the rest of the scene.

This work became my undergraduate senior thesis; see [Publications]({{ site.baseurl }}/publications/).

**Stack:** C++17, Python, PyTorch, C#/Unity, ROS 1, Vicon

Demonstrations
======

<div class="demo-grid">

  <figure class="demo">
    <div class="demo-embed">
      <iframe src="https://www.youtube.com/embed/woLIxCITp2g?start=0&amp;rel=0"
              title="Point-click generation"
              loading="lazy" allowfullscreen
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
    <figcaption>
      <span class="demo-num">01</span>
      <span class="demo-label">Point-click generation</span>
      <span class="demo-ts">0:00</span>
    </figcaption>
  </figure>

  <figure class="demo">
    <div class="demo-embed">
      <iframe src="https://www.youtube.com/embed/woLIxCITp2g?start=19&amp;rel=0"
              title="Modification by point-click"
              loading="lazy" allowfullscreen
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
    <figcaption>
      <span class="demo-num">02</span>
      <span class="demo-label">Modification by point-click</span>
      <span class="demo-ts">0:19</span>
    </figcaption>
  </figure>

  <figure class="demo">
    <div class="demo-embed">
      <iframe src="https://www.youtube.com/embed/woLIxCITp2g?start=59&amp;rel=0"
              title="Modification at runtime"
              loading="lazy" allowfullscreen
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
    <figcaption>
      <span class="demo-num">03</span>
      <span class="demo-label">Modification at runtime</span>
      <span class="demo-ts">0:59</span>
    </figcaption>
  </figure>

  <figure class="demo">
    <div class="demo-embed">
      <iframe src="https://www.youtube.com/embed/woLIxCITp2g?start=93&amp;rel=0"
              title="Producing a trajectory via speech"
              loading="lazy" allowfullscreen
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
    <figcaption>
      <span class="demo-num">04</span>
      <span class="demo-label">Producing a trajectory via speech</span>
      <span class="demo-ts">1:33</span>
    </figcaption>
  </figure>

  <figure class="demo">
    <div class="demo-embed">
      <iframe src="https://www.youtube.com/embed/woLIxCITp2g?start=125&amp;rel=0"
              title="Producing a modification by speech"
              loading="lazy" allowfullscreen
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
    </div>
    <figcaption>
      <span class="demo-num">05</span>
      <span class="demo-label">Producing a modification by speech</span>
      <span class="demo-ts">2:05</span>
    </figcaption>
  </figure>

</div>

<style>
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  gap: 1.1rem;
  margin: 1.75em 0 2em;
}
.demo-grid .demo {
  margin: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--global-border-color);
  border-radius: 10px;
  overflow: hidden;
  background: var(--global-bg-color);
  transition: border-color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease;
}
.demo-grid .demo:hover {
  border-color: var(--global-link-color);
  transform: translateY(-2px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.12);
}
.demo-embed {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  background: #000;
}
.demo-embed iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
.demo-grid figcaption {
  display: flex;
  align-items: baseline;
  gap: 0.55rem;
  margin: 0;
  padding: 0.7rem 0.85rem 0.75rem;
  border-top: 1px solid var(--global-border-color);
  font-family: inherit;
  font-size: 0.82rem;
  line-height: 1.35;
  color: var(--global-text-color);
}
.demo-num {
  flex: none;
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: var(--global-link-color);
}
.demo-label {
  flex: 1 1 auto;
  font-weight: 600;
}
.demo-ts {
  flex: none;
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  color: var(--global-fig-caption-color);
  border: 1px solid var(--global-border-color);
  border-radius: 999px;
  padding: 0.1rem 0.45rem;
}
</style>
