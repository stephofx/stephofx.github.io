---
layout: post
title: "Blackwell Approachability Theorem"
date: 2023-02-16 23:57:00 -0500
tags: game-theory
katex: True
---

## Vector-Valued Zero-Sum Games and Approachability

This covers David Blackwell's famous approachability theorem. It is an
extension of von Neumann's Minimax Theorem to the setting of
vector-valued payoffs. Blackwell's approachbility theorem is important
because it has very deep connections to online learning and regret
minimization. As Vohra states in a
[tutorial](https://www.youtube.com/live/i8j7fUN7_EU?feature=share) on Blackwell approachability, approachability implies Hannan
no-regret, which implies no internal regret, which implies calibration.

### A small example

To build intuition, consider the following example given by Vohra. Let
$$\left\{ X_{t}\right\}$$ be a bounded sequence of vectors that you pick
every round. Let $$A_{n}=\frac{\sum_{t\le n}X_{t}}{n}$$ be the average of
the vectors up to this round, and the restriction on the type of vector
you can pick is that $$A_{n}\cdot X_{t}\le0$$ every round. If we think of
the vectors as scalars, then it is clear that every round we must pick a
scalar that has opposite sign than the previous number we picked.
Ultimately, we can conclude that the distance of the average and the
zero vector approaches 0: $$d(A_{n},0)=||A_{n}||\to0$$. This intuitively
makes sense, and this is what approachability can be intuitively thought
of as, if we replace 0 with some arbitrary convex set $$T$$.

### Problem Setting and Approachability

Suppose we have two players Alpha and Zeta. Alpha and Zeta play a
repeated two-player zero-sum game where Alpha plays some $$a\in A$$, and
Zeta plays some $$z\in Z$$. Alpha's payoff is defined by
$$\ell(a,z)\in\mathbb{R}^{m}$$. We have a few conditions on these objects:

-   $$A,Z$$ are convex and compact sets

-   $$\ell(a,z)$$ is bilinear and
    $$||\ell(a,z)||\le\mathbb{R\quad}\forall a,z\in A,Z$$

-   All norms are Euclidean.

We are interested in the average loss after $$T$$ iterations, like before
in the example. We define this as

$$\bar{\ell}_{T}=\frac{1}{T}\sum_{t=1}^{T}\ell(a_{t},z_{t})$$

We also need to define the distance to a set $$S$$, which we define to be
the lower bound on the distance to any point in the set.

$$d(x,S)=\inf_{s\in S}||x-s||$$

Now we can define what approachability is: A set $$S$$ is **approachable**
if there exists a strategy $$a_{t}$$ such that
$$\lim_{n\to\infty}d(\bar{\ell}_{n},S)=0$$. A set is approachable if and
only if its closure is approachable, so we only need to consider closed
$$S$$.

### Halfspace Approachability

Consider halfspaces, which are defined by
$$H=\left\{  x\mid\langle c,x\rangle\le b\right\}$$.
In the scalar payoff case, by the Minimax theorem, we have that
$$(-\infty,p]$$ is approachable if and only if $$p\ge V$$, where $$V$$ is the
minimax value. We can define a auxilliary game with scalar losses
$$\ell_{1}(a,z)=\langle c,\ell(a,z)\rangle$$, then $$H$$ is approachable if
and only if $$(-\infty,p]$$ is approachable in the auxillary game. By
definition of minimax value, $$H$$ is thus approachable if and only if for
mixed strategy $$\sigma_{A}$$,

$$\max_{z\in Z}\bar{\ell}_{1}(\sigma_{A},z)=\max_{z\in Z}\langle c,\bar{\ell}(\sigma_{A},z)\rangle\le p$$

Thus we have that a halfspace
$$H=\left\{ x\mid\langle c,x\rangle\le b\right\}$$ with $$S\subset H$$ 
is approachable if and only if there exists a mixed strategy
$$\sigma_{A}$$ such that
$$\max_{z\in Z}\langle c,\bar{\ell}(\sigma_{A},z)\rangle\le b$$.

### Sion's Minimax Theorem

This is an optional section. We take von Neumann's minimax theorem one
step further, and extend it to Sion's minimax theorem, which states:

**Theorem 1**. *Let $$A,Z$$ be convex, compact spaces and
$$f:A\times Z\to\mathbb{R}$$. If $$f(a,\cdot)$$ is upper semicontinuous and
quasiconcave on $$Z,\forall a\in A$$ and $$f(\cdot,z)$$ is lower
semicontinuous and quasiconvex on $$A,\forall z\in Z$$, then
$$\inf_{a\in A}\sup_{z\in Z}f(a,z)=\sup_{z\in Z}\inf_{a\in A}f(a,z)$$*

We will not prove this in this article.

## Blackwell's Approachability Theorem

We present two characterizations of the theorem. The first one is given
by (Rigollet 2015):

**Theorem 2**. *Let $$S$$ be a closed convex set of $$\mathbb{R}^{2}$$ with
$$||x||\le R$$ for all $$x\in S$$. If $$\forall z\in Z,\exists a\in A$$ such
that $$\ell(a,z)\in S$$, then $$S$$ is approachable. Moreover there exists a
strategy such that $$d(\bar{l}_{T},S)\le\frac{2R}{\sqrt{T}}$$*

The second characterization is given by (Cesa-Bianchi, Lugosi 2006):

**Theorem 3**. *A closed convex set $$S$$ is approachable if and only if
every halfspace $$H$$ containing $$S$$ is approachable.*

and is equivalent to the previous one. We only prove the first.

*Proof.* Suppose we have a halfspace
$$H=\left\{ x\mid\langle c,x\rangle\le b\right\}$$ with $$S\subset H$$. By
assumption this means that
$$\forall z,\exists a\text{ s.t. }\ell(a,z)\in H$$, which implies that
$$\max_{z\in Z}\min_{a\in A}\langle c,\ell(a,z)\rangle\le b$$

We have by Sion's theorem or by halfspace approachability that
$$\min_{a\in A}\max_{z\in Z}\langle c,\ell(a,z)\rangle\le b$$

so $$\exists a_{H}^{*}$$ such that $$\forall z,\ell(a,z)\in H$$. This is
essentially a recap of the result of section (1.3). For this halfspace
$$H$$, we want to choose $$H_{t}$$ so that $$\ell(a_{t},z_{t})$$ moves the
average $$\bar{\ell}_{t}$$ closer to $$S$$ than $$\bar{l}_{t-1}$$. Likely the
easiest choice is to use the separating hyperplane $$W$$ between $$S$$ and
$$\bar{l}_{t-1}$$ to define the halfspace $$H_{t}$$. This is possible due to
convexity of $$S$$. Formally, let $$W$$ be the hyperplane through
$$\pi_{t}\in\text{argmin}_{\mu\in S}||\bar{\ell}_{t-1}-\mu||$$ with normal
vector $$\bar{\ell}_{t-1}-\pi_{t}$$. Thus,
$$H=\left\{ x\mid\langle x-\pi_{t},\bar{\ell}_{t-1}-\pi_{t}\rangle\le0\right\}$$

We can then use the $$a_{H}^{*}$$ defined by this halfspace and play it.
To prove the convergence bound, we must rewrite 

$$\begin{aligned}
\bar{\ell}_{t} & =\frac{t-1}{t}\bar{l}_{t-1}+\frac{1}{t}\ell_{t}\\
 & =\frac{t-1}{t}(\bar{l}_{t-1}-\pi_{t})+\frac{t-1}{t}\pi_{t}+\frac{1}{t}\ell_{t}
\end{aligned}$$

Now, 

$$\begin{aligned}
d(\bar{\ell}_{t},S) & =||\bar{\ell}_{t}-\pi_{t+1}||^{2}\\
 & \le||\bar{\ell}_{t}-\pi_{t}||^{2}\\
 & =||\frac{t-1}{t}(\bar{l}_{t-1}-\pi_{t})+\frac{1}{t}(\ell_{t}-\pi_{t})||^{2}\\
 & =(\frac{t-1}{t})^{2}d(\bar{\ell}_{t-1},\pi_{t})+\frac{||\ell_{t}-\pi_{t}||^{2}}{t^{2}}+2\frac{t-1}{t^{2}}\langle\ell_{t}-\pi_{t},\bar{\ell}_{t-1}-\pi_{t}\rangle
\end{aligned}$$

Since we play $$a_{H}^{*}$$, then $$\ell_{t}\in H$$, so the last term is
negative. Both $$\ell_{t}$$ and $$\pi_{t}$$ are bounded by $$O(R)$$, so the
middle term is bounded by $$\frac{4R^{2}}{t^{2}}$$. This can be done by
scaling of $$S$$ and the domain of $$\ell$$ without loss of generality - we
could alternatively scale everything to the unit ball and have $$R=1$$. We
can let $$K_{t}^{2}=t^{2}d(\bar{\ell}_{t},S)^{2}$$, and turn the last
equation into a recurrence relation: 

$$\begin{aligned}
K_{t}^{2} & \le K_{t-1}^{2}+4R^{2}\\
 & \implies K_{T}^{2}\le4TR^{2}
\end{aligned}$$

And thus
$$d(\bar{\ell}_{T},S)\le\frac{2R}{\sqrt{T}}=O(\sqrt{\frac{1}{T}})$$. ◻

Philippe Rigollet. (2015). BLACKWELL'S APPROACHABILITY. MIT
OpenCourseWare. Retrieved February 16, 2023, from
https://ocw.mit.edu/courses/18-657-mathematics-of-machine-learning-fall-2015/

Cesa-Bianchi, N., & Lugosi, G. (2006). Prediction, Learning, and Games.
Cambridge: Cambridge University Press. doi:10.1017/CBO9780511546921

Abernathy, J. (2013). Lecture 22: Blackwell's approachability theorem.
Retrieved February 17, 2023, from
https://web.eecs.umich.edu/\~jabernet/eecs598course/fall2013/web/notes/lec22_112013.pdf
