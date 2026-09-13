---
title: "Example Post"
excerpt: "A one- or two-sentence summary shown under the title on the Blog page. Leave it out and the first paragraph of the post is used instead."
tags:
  - example
---

This file is a draft: anything in `_drafts/` is left off the live site. To preview drafts locally, run `bundle exec jekyll serve --drafts`.

To publish, move the file into `_posts/` and put the date at the front of its name, for example `_posts/2026-09-20-example-post.md`. The date sets the order on the [Blog]({{ site.baseurl }}/blog/) page, and the rest of the name becomes the URL: `/blog/2026/example-post/`.

Writing a post
======

Posts are ordinary Markdown, so headings, links, lists, and code blocks all work:

```python
def returns(rewards, gamma=0.99):
    g, out = 0.0, []
    for r in reversed(rewards):
        g = r + gamma * g
        out.append(g)
    return out[::-1]
```

Math renders with MathJax, written between double dollar signs: $$J(\theta) = \mathbb{E}_{\tau \sim \pi_\theta}\left[\sum_t \gamma^t r_t\right]$$

Images go in `images/` and are referenced as `![description](/images/file.png)`.
