---
title: "Chapter 2: Multi-armed Bandits"
permalink: /projects/reinforcement-learning-sutton-barto/chapter-2/
author_profile: true
description: "A Python implementation of Exercise 2.5 from Sutton and Barto: sample-average and constant-step-size updates for a nonstationary bandit."
---

[Back to the project]({{ '/projects/reinforcement-learning-sutton-barto/' | relative_url }})

## Exercise 2.5: A Nonstationary 10-Armed Bandit

This experiment compares two action-value update rules in a bandit whose true action values change over time. Both agents use epsilon-greedy action selection: with probability 0.1 they explore, and otherwise they choose the action with the highest estimated value.

- **Sample-average updates** use the average of the rewards observed for each action.
- **Constant-step-size updates** use a fixed learning rate of 0.1, giving recent observations more weight.

| Parameter | Notebook setting |
| --- | --- |
| Arms | 10 |
| Steps | 10,000 |
| Exploration probability | 0.1 |
| Constant step size | 0.1 |
| Initial true action values | 100 for every arm |
| Initial value estimates | 10 for every arm |
| Reward distribution | Gaussian with the arm's current value as its mean and standard deviation 1 |
| Drift per step | Independent Gaussian increments with mean 0 and standard deviation 0.01 |

<a href="{{ '/files/reinforcement-learning/chapter-2.ipynb' | relative_url }}" class="btn btn--primary" download>Download Chapter 2 notebook</a>

## Implementation

The source below is reproduced from my notebook. Run the cells in order in a Python environment with PyTorch, NumPy, and Matplotlib installed.

### Bandit experiment

```python
# Exercise 2.5

import random
from torch.distributions import Normal
import torch

"""

Exercise 2.5 (programming) Design and conduct an experiment to demonstrate the difficulties that sample-average methods have for nonstationary problems.
Use a modified version of the 10-armed testbed in which all the q⇤(a) start out equal and then take independent random walks
(say by adding a normally distributed increment with mean 0 and standard deviation 0.01 to all the q⇤(a) on each step).
Prepare plots like Figure 2.2 for an action-value method using sample averages, incrementally computed, and another action-value method using a constant step-size parameter,
alpha=0.1. Use epsilon=0.1 and longer runs, say of 10,000 steps.

"""

arms = arms = torch.full((10,), 100.0)
print(arms)
q_value = [10] * 10
q_non = [10] * 10

print(q_value)

NUM_STEPS = 10000
EPSILON = 0.1
ALPHA = 0.1

action_history = []
norm = [0] * 10
norm_non = norm
total_reward = 0
total_reward_non = 0
action = 0

log_stationary = []
log_non_stationary = []

#Simple bandit
for i in range(NUM_STEPS):

  rand = random.random()

  if(EPSILON > rand):
    action = random.randint(0,9)
    action_non = action
  else:
    action = max(enumerate(q_value), key=lambda x: x[1])[0]
    action_non = max(enumerate(q_non), key=lambda x: x[1])[0]

  #Stationary Assumption:
  rew = Normal(loc=arms[action], scale = 1).sample()
  total_reward += rew.item()
  action_history.append((action, q_value, rew))
  norm[action] += 1

  q_value[action] = q_value[action] + (rew.item() - q_value[action])/norm[action]

  #Non-Stationary Assumption:
  rew_non = Normal(loc=arms[action_non], scale = 1).sample()
  total_reward_non += rew_non.item()
  action_history.append((action_non, q_non, rew_non))
  #norm_non[action] += 1

  q_non[action_non] += ALPHA*(rew_non.item() - q_non[action_non])

  #Log for plotting
  log_stationary.append((action, q_value, rew, i, total_reward, arms))
  log_non_stationary.append((action_non, q_non, rew_non, i, total_reward_non, arms))

  #Move the arms
  means = torch.zeros(10)
  std_devs = torch.full((10, ), 0.01)
  walk_dist = Normal(loc=means, scale=std_devs)
  noise = walk_dist.sample()
  #print(arms)
  #break
  arms = arms + noise
  #print(arms)
  #break


print(arms)
print(q_value)
print(q_non)
```

### Plotting the running average reward

```python
#plot
import matplotlib.pyplot as plt
import numpy as np

from matplotlib.collections import EventCollection

fig = plt.figure()
ax = fig.add_subplot(1, 1, 1)

x_stationary = [row[3] for row in log_stationary]
y_stationary = [row[4]/(row[3]+1) for row in log_stationary]


x_non_stationary = [row[3] for row in log_non_stationary]
y_non_stationary = [row[4]/(row[3]+1) for row in log_non_stationary]



ax.plot(x_stationary, y_stationary, color='tab:blue')
ax.plot(x_non_stationary, y_non_stationary, color='tab:orange')
```

The plotting cell compares cumulative average reward over time: blue is the sample-average method and orange is the constant-step-size method.

[Continue to Chapter 3]({{ '/projects/reinforcement-learning-sutton-barto/chapter-3/' | relative_url }})
