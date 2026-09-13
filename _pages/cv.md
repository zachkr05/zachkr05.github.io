---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Education
======
* M.S. in Computer Science, University of Virginia, expected May 2028
  * Advisor: Prof. Yen-Ling Kuo
  * GPA: 4.00/4.00
* B.S. in Computer Science, University of Virginia, School of Engineering, May 2026
  * Major GPA: 3.72/4.00

Research experience
======
* **May 2026 – Aug. 2026: Research Assistant (AI)**, Air Force Research Laboratory (AFRL) — *internship*
  * Advisor: Dr. Oliver Nina
  * Authored the research proposal on multi-agent reinforcement learning and diffusion models, investigating diffusion models for uncertainty-aware MARL.
  * Proposed and built a novel decentralized cooperative MARL system coupling MAPPO with a diffusion-based uncertainty signal, trained CTDE in an asymmetric actor-critic framework (Python/PyTorch).
  * Built a low-dimensional test environment for the collaborative framework.
  * Improved value estimation by +5% and successful episodes per run by +8% over a baseline PPO policy.

* **Feb. 2026 – Present: Research Assistant (AI)**, University of Virginia — LIVE Lab — *part-time*
  * Advisor: Prof. Yen-Ling Kuo &middot; Charlottesville, VA
  * Built an end-to-end text-to-MuJoCo simulation generation pipeline, synthesizing and reconstructing 3D assets from natural-language scene specifications and automatically generating executable simulation environments (Python/PyTorch/C++).
  * Proposed and implemented a novel Markov-Chain-Monte-Carlo simulation generation process using a value function for the MDP.
  * Built a 100 Hz AR teleoperation system on Meta Quest 3, streaming bimanual controller poses to a mobile manipulator over low-latency sockets for scalable robot-demonstration collection (C#/Unity).
  * Collected 100+ demonstrations, 15 hours, and 1000+ trajectories.
  * Evaluated generated scenes across 100 prompts spanning 25 object classes, achieving 92% executable-scene success and reducing manual environment construction from 30 min to 4 min.
  * Built a cross-format scene-conversion pipeline exporting model directives to MuJoCo and Unity, plus a post-hoc critic-driven evaluation stage over frozen 3D scenes (Drake/MuJoCo).

* **Aug. 2024 – June 2026: Research Assistant (AI)**, University of Virginia — AMR Lab — *internship*
  * Advisor: Prof. Nicola Bezzo &middot; Charlottesville, VA
  * Led a cross-functional team developing an interactive AR interface in Unity for real-time UAV/UGV trajectory visualization and mission-plan editing (C++17/Python/C#).
  * Developed an LLM/VLM command-grounding service mapping ambiguous natural-language instructions into structured robot trajectory edits and goal specifications (Python/C++17).
  * Evaluated command grounding on 100 instructions, achieving 97.3% execution accuracy and reducing invalid plans by 99%.
  * Developed a conditional diffusion model for robot costmap and trajectory generation, using value-function-derived supervision from human trajectory edits to adapt future plans (Python/PyTorch).
  * Built a real-time TCP communication server with 100 Hz communication and length-prefixed framing, integrating a diffusion-model backend, Unity AR client, Vicon motion capture, and a ROSbot UGV into one closed-loop pipeline (C++/Python).

* **May 2024 – Aug. 2024: Research Assistant (AI)**, University of Virginia — LESS Lab — *full-time*
  * Advisor: Prof. Sebastian Elbaum; research assistant to Meriel Von Stein &middot; Charlottesville, VA
  * Mentored a cohort of two undergraduates in outdoor autonomous-navigation and data-collection workflows, guiding them to execute 3 km of collision-free field runs and contribute 1000+ labeled frames to the dataset.
  * Authored a Python data-augmentation toolkit that grew the LiDAR and image corpus 10&times; and lifted detection recall by 12%.
  * Reduced preprocessing time by 60% using optimized NumPy/Pandas scripts.
  * Implemented PyTorch models integrated with ROS 2, improving robot perception by 30%.
  * Code: [zachkr05/ROSbot_data_collection](https://github.com/zachkr05/ROSbot_data_collection) — ROS workspace for collecting human navigation data of a Husarion ROSbot 2.0.

Service and outreach
======
* **Nov. 2024 – July 2026: Judge**, *FIRST* LEGO League Challenge — *part-time*, Charlottesville, VA
  * Evaluated student teams (ages 9–14) on project innovation, core values, and robot design at regional FLL competitions.
  * Facilitated structured interviews and provided constructive feedback to encourage STEM learning and teamwork.
  * Collaborated with a panel of judges to deliberate and award recognitions based on *FIRST*'s judging rubrics and values.

Skills
======
* **Languages**: C++17/20, Python, Java, C#, JavaScript, SQL, Bash, HTML/CSS
* **Robotics & ML**: ROS 2, ROS 1, PyTorch, MuJoCo, Drake, NumPy, Pandas, OpenCV, Eigen, scikit-learn, Navigation2, Unity
* **Web & data**: Flask, Django, React, Tailwind, MongoDB Atlas
* **Tools & systems**: Linux/Unix, multithreading, STL, Boost (Asio/Beast), JSON/XML, Docker, OpenAI API, Gemini API

Publications
======
  <ul>{% for post in site.publications reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>

Research projects
======
  <ul>{% for post in site.portfolio reversed %}
    {% include archive-single-cv.html %}
  {% endfor %}</ul>
