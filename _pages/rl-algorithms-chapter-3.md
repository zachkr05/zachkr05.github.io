---
title: "Chapter 3: Finite Markov Decision Processes"
permalink: /projects/reinforcement-learning-sutton-barto/chapter-3/
author_profile: true
description: "Personal exercise notes on the reinforcement learning framework, agent-environment boundaries, reward design, and discounted returns."
---

[Back to the project]({{ '/projects/reinforcement-learning-sutton-barto/' | relative_url }}) · [Chapter 2 implementation]({{ '/projects/reinforcement-learning-sutton-barto/chapter-2/' | relative_url }})

*Draft study notes. These are my original exercise responses.*

## 1. Scope of the Reinforcement Learning Framework

**Is the reinforcement learning framework adequate to usefully represent all goal-directed learning tasks? Can you think of any clear exceptions?**

No, not all goal-directed learning tasks are applicable. Open-ended questions like scientific discovery can't be automated because not one framework will work for all tasks. Or for a surgical robot, you can't have it nick an artery, even if you add a penalty it can be closed off by a huge surplus of positive reward for a fast tumor removal.

## 2. The Agent-Environment Boundary

**Consider the problem of driving. You could define the actions in terms of the accelerator, steering wheel, and brake, that is, where your body meets the machine. Or you could define them farther out - say, where the rubber meets the road, considering your actions to be tire torques. Or you could define them farther in - say, where your brain meets your body, the actions being muscle twitches to control your limbs. Or you could go to a really high level and say that your actions are your choices of where to drive. What is the right level, the right place to draw the line between agent and environment? On what basis is one location of the line to be preferred over another? Is there any fundamental reason for preferring one location over another, or is it a free choice?**

The preference of which level to draw the line between the agent and the environment depends completely on what the goal of the system is. If we were to want the system to control the car manually (i.e. similar to a human) then we would want to capture the muscle twitches, but if our goal is just autonomous driving, that would be low-level. I argue ideally, you want the highest level of observation and action spaces as that removes a lot of the reward shaping. However, it is always a free choice of what your goal of the system is and how you would like it to behave.

## 3. Transition Probabilities in Episodic Tasks

**The equations in Section 3.1 are for the continuing case and need to be modified (very slightly) to apply to episodic tasks. Show that you know the modifications needed by giving the modified version of (3.3).**

Sum of all rewards and all states of

$$
\sum_{s'} \sum_r p(s', r \mid s, a) = 1,
\qquad S = \text{states} \cup \{\text{terminal}\}.
$$

## 4. Discounted Pole-Balancing

**Suppose you treated pole-balancing as an episodic task but also used discounting, with all rewards zero except for -1 upon failure. What then would the return be at each time? How does this return differ from that in the discounted, continuing formulation of this task?**

The sum over all timesteps leading up to K, of `-gamma^K-1`.

## 5. Exercise 3.7: Reward Design in a Maze

**Imagine that you are designing a robot to run a maze. You decide to give it a reward of +1 for escaping from the maze and a reward of zero at all other times. The task seems to break down naturally into episodes - the successive runs through the maze - so you decide to treat it as an episodic task, where the goal is to maximize expected total reward (3.7). After running the learning agent for a while, you find that it is showing no improvement in escaping from the maze. What is going wrong? Have you effectively communicated to the agent what you want it to achieve?**

You have effectively communicated nothing. What is going wrong is there is negative reward to say bashing into a wall or going the wrong path. You need to disincentivize the wrong paths as well for this task. Additionally, we have told it to escape efficiently, not effectively. You need to have it use a discounted reward that would communicate to it that the shortest path is always the best.

## 6. Computing Returns Backwards

**Suppose gamma = 0.5 and the following sequence of rewards is received: R1 = -1, R2 = 2, R3 = 6, R4 = 3, and R5 = 2, with T = 5. What are G0, G1, ..., G5? Hint: Work backwards.**

$$
\begin{aligned}
G_5 &= 0, \\
G_4 &= 2 + 0.5G_5 = 2, \\
G_3 &= 3 + 0.5G_4 = 4, \\
G_2 &= 6 + 0.5G_3 = 8, \\
G_1 &= 2 + 0.5G_2 = 6, \\
G_0 &= -1 + 0.5G_1 = 2.
\end{aligned}
$$

## 7. Exercise 3.9: An Infinite Reward Sequence

**Suppose gamma = 0.9 and the reward sequence is R1 = 2 followed by an infinite sequence of 7s. What are G1 and G0?**

$$
G_1 = 7 + 63 = 70,
\qquad
G_0 = 2 + 70 \times 0.9 = 65.
$$

## 8. Exercise 3.10: The Geometric Series

**Prove the second inequality (3.10).**

Sum `gamma^k` where k goes to infinity:

$$
\begin{aligned}
S_n &= 1 + \gamma^1 + \gamma^2 + \cdots + \gamma^N, \\
\gamma S_n &= \gamma + \gamma^2 + \gamma^3 + \cdots + \gamma^{N+1}, \\
S_n - \gamma S_n &= 1 - \gamma^{N+1}, \\
S_n(1-\gamma) &= 1 - \gamma^{N+1}, \\
S_n &= \frac{1-\gamma^{N+1}}{1-\gamma}.
\end{aligned}
$$

Take the limit as gamma goes to infinity, which achieves

$$
\frac{1-0}{1-\gamma}.
$$

Therefore, the sum of `gamma^k` where k goes to infinity is

$$
\frac{1}{1-\gamma}.
$$

## 9. Expected Immediate Reward Under a Stochastic Policy

**If the current state is St, and actions are selected according to a stochastic policy, then what is the expectation of Rt+1 in terms of the policy and the four-argument function p (3.2)?**

$$
V_\pi(s_t) = \mathbb{E}\left[\sum_k \gamma r_{t+k+1} \mid s_t\right].
$$

**Textbook:** [Reinforcement Learning: An Introduction, second edition](https://mitpress.mit.edu/9780262039246/reinforcement-learning/).
