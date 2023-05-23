# Motivation

This is part 2 of multi-armed bandits. In this part, we rethink when and
how we can be sure a certain arm is better than another arm. In the
previous part, I introduced the Explore-First algorithm, which does the
job, but with a high regret from exploration. Can we do better? More
specifically, can we determine when to give up exploring a suboptimal
arm? Here, we introduce the first step - spreading out exploration over
time.

# Stochastic Bandits

Here is a quick reminder of the notation and setting of the stochastic
multi-armed bandit setting. In the stochastic setting, all rewards are
drawn iid from a distribution corresponding to the arm. Let us formalize
this problem with notation:

-   $K$ arms, $T$ rounds.

-   $r_{t}\sim\mathcal{D}_{a}$, the reward of arm $a_{t}$ chosen at
    round $t$ is iid from the distribution over arm $a$.

-   $\mu(a)=\mathbb{E}[\mathcal{D}_{a}]$ is the mean reward of arm $a$.

-   $\mu^{*}=\max_{a\in A}\mu(a)$ is the optimal mean reward.

-   $\Delta(a_{t})=\mu^{*}-\mu(a_{t})$ is the gap between mean reward of
    $a_{t}$ and the optimal mean reward.

The stochastic bandit problem is given by

-   $K$ arms, $T$ rounds.

-   For every round $t=1\ldots T$,

    -   Algorithm chooses an arm $a_{t}$.

    -   Algorithm observes the true reward $r(a_{t})$

The objective of this problem is to minimize regret (this definition is
also known as pseudo-regret), i.e.
$$R(T)=T\cdot\mu^{*}-\sum_{t=1}^{T}\mu(a_{t})$$

however, since the latter term is a random variable, we want to minimize
the expected regret.
$$\mathbb{E}[R(T)]=T\cdot\mu^{*}-\sum_{t=1}^{T}\mathbb{E}[\mu(a_{t})]$$

## $\epsilon-$greedy

One of the main problems in the Explore First algorithm was simply
because it spent all the time at the beginning exploring. A similar
algorithm, which spreads exploration over time, does better. This is the
$\epsilon$-greedy algorithm:

-   For every round $t=1,\ldots,T$:

    1.  With probability $\epsilon_{t}$, choose an arm uniformly at
        random. Otherwise, choose the arm with the highest realized mean
        reward.

Note that $\epsilon_{t}$ can depend on the round. This is important for
a good regret bound. To analyze this, we will fix a round $t$, then
think about the expected increase in regret $\mathbb{E}[\Delta(a)]$ at
round $t$.When calculating this expectation, we expect to see two
components: one part when the arm is chosen uniformly at random, and
another component when the arm is chosen with the highest mean reward.
Thus, $$\begin{aligned}
\mathbb{E}[\Delta(a)] & =Pr[\text{exploration}]\cdot R(\text{exploration at round t})+Pr[\text{exploitation}]\cdot R(\text{exploitation at round t})\\
 & \le\epsilon_{t}\cdot1+(1-\epsilon_{t})\cdot R(\text{exploitation at round t})
\end{aligned}$$

Before we can calculate that, however, we need to get a bound on how far
we expect the the mean of each arm at round $t$ is from the true mean of
each arm. For this, we need to set up a clean event. The clean event, as
a reminder, is the event where all the sampled means of our arms are
close to their true means, with some confidence radius we define. We can
use Hoeffding's inequality to get a strong probabilistic bound. However,
we need to be more careful, since the number of times each arm can be
played is a random variable itself, which means to preserve independence
between the random variables we will use in Hoeffding's inequality.

To set this up, imagine a world where we have $K$ number of $1\times T$
length reward tapes for each arm $D_{a}$, i.e. an array of length $T$
filled with $T$ draws of rewards from $D_{a}$. Whenever we pull an arm
$a$ for the $j$th time, we will get the reward determined at cell $j$ of
the reward tape of arm $a$. Let $\bar{v}_{j}(a)$ be the average of the
rewards we obtain from $j$ times of pulling arm $a$. Now, from
Hoeffding's, like we did in the Explore-First algorithm, at the $j$th
time we pull arm $a$, $$\begin{aligned}
Pr[|\bar{v}_{j}(a)-\mu(a)|\ge\eta] & \le2\exp(-\frac{2\eta^{2}}{\sum_{i=1}^{j}(b_{i}-a_{i})^{2}})\\
 & =2\exp(-\frac{2\eta^{2}}{\sum_{i=1}^{j}(\frac{1}{j}-0)^{2}})\\
 & =2\exp(-2\eta^{2}j)
\end{aligned}$$

Since $j$ is fixed in this case, we can pick
$\eta=\sqrt{\frac{2\log T}{j}}$ to yield
$$Pr[|\bar{v}_{j}(a)-\mu(a)|\ge\eta]\le\frac{2}{T^{4}}$$

We can union bound over all arms and all $j$ to yield
$$Pr[\mu_{t}(a)-\mu(a)\le\sqrt{\frac{2\log T}{n_{t}(a)}}]\ge1-\frac{2}{T^{2}}$$

with the assumption that $K\le T$. However, we still are missing
information about what $n_{t}(a)$ could be. We can argue that our bound
is at its worst when $n_{t}(a)$ is the smallest, i.e. when $a$ is only
being explored, but not exploited. Therefore, we can loosen our bound of
our clean event to be
$$Pr[\mu_{t}(a)-\mu(a)\le\sqrt{\frac{2\log T}{n_{t}(\text{explore }a)}}]\ge1-\frac{2}{T^{2}}$$

Now, we argue that $n_{t}(\text{explore }a)$ must be close to its
expected value, which would be $\frac{t\epsilon_{t}}{K}$. Under another
Hoeffding bound, we can show that $n_{t}(\text{explore }a)$ is less than
$\sqrt{\frac{\log T}{t}}$ away from $\frac{t\epsilon_{t}}{K}$ with
probability $1-\frac{2}{T^{4}}$. Thus, our clean event is the event that
$\mathcal{E}=\left\{ \mu_{t}(a)-\mu(a)\le\sqrt{\frac{2K\log T}{t\epsilon_{t}}}\text{and }|n_{t}(a)-\frac{t\epsilon_{t}}{K}|\le\sqrt{\frac{\log T}{t}}\right\}$.
$$Pr[\mu_{t}(a)-\mu(a)\le\sqrt{\frac{2K\log T}{t\epsilon_{t}}}\text{and }|n_{t}(a)-\frac{t\epsilon_{t}}{K}|\le\sqrt{\frac{\log T}{t}}]\ge1-(\frac{2}{T^{2}}+\frac{2}{T^{4}})$$

We can now wrap this all up. Regret accumulated during exploitation
becomes the same analysis as in Explore-First, i.e.
$$\mu(a^{*})-\sqrt{\frac{2K\log T}{t\epsilon_{t}}}\le\mu(a^{*})\le\mu(a')\le\mu(a')+\sqrt{\frac{2K\log T}{t\epsilon_{t}}}$$

and thus,
$$\mu(a^{*})-\mu(a')\le2\sqrt{\frac{2K\log T}{t\epsilon_{t}}}$$

Thus, using our expression from above for $\mathbb{E}[\Delta(a)]$, we
have
$$\mathbb{E}[\Delta(a)]\le\epsilon_{t}+(1-\epsilon_{t})\cdot2\sqrt{\frac{2K\log T}{t\epsilon_{t}}}\le\epsilon_{t}+2\sqrt{\frac{2K\log T}{t\epsilon_{t}}}$$

Setting the two sides, equal, we get
$\epsilon_{t}=t^{-1/3}(K\log t)^{1/3}$. Thus, the overall regret (only
considering the clean event) will be $$\begin{aligned}
\mathbb{E}[R(t)] & =\mathbb{E}[\sum_{t=1}^{T}\Delta(a)]\\
 & \le t\cdot\mathbb{E}[\Delta(a)]\\
 & \le t^{2/3}(K\log t)^{1/3}
\end{aligned}$$

So what's the difference - isn't this the same bound as we obtained for
Explore-First? Yes, but this bound holds for all rounds $t=1,\ldots,T$,
whereas for Explore-First the bound only held once we reached some $T$.
So we've made some progress, but not too much. In order to really
improve our bounds, we need to introduce a new technique - next time,
I'll introduce UCB-style algorithms.
