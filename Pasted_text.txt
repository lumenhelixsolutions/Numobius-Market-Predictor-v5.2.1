<!--
  This document accompanies the Numöbius Command Center repository and
  describes how to evaluate and validate the predictive engine via a
  lightweight backtesting and ablation framework.  The intention is to
  provide a reproducible workflow for measuring the contribution of each
  algorithmic layer to forecast accuracy and profitability.  It builds on
  the core idea expressed in the accompanying research paper: the value of
  a prediction system lies not only in novel math, but in the ability to
  isolate, replay and measure each component's effect on the final
  decision.  Readers should consult the technical summary for a high‑level
  overview of the architecture and the research paper for the broader
  theoretical context.
-->

# Ablation & Replay Engine Guide

The **Numöbius** framework is designed to be auditable and reproducible.  To
facilitate objective evaluation of its layers, this repository includes a
backtesting and ablation library in `src/js/backtest/`.  The modules allow
developers to run price series through progressively richer decision
functions and compare metrics such as win rate, profit factor, drawdown and
Sharpe ratio.  This guide explains the purpose of the ablation system and
demonstrates how to use it.

## Why ablation?

In research mode, it is tempting to add more mathematical transforms
(quaternions, sedenions, clocks, ladders and entropies) in the hope of
improving forecasts.  However, as the **replayable hypercomplex engine
paper** explains, symbolic layers accumulate faster than validation.  To
distinguish useful innovations from decorative ones, we must hold the
underlying data and solver state constant and measure the incremental
effect of each layer on the trading decision.  This process—known as
**ablation**—allows us to ask “which part of the system works?” rather
than “does the system work?”

## Backtesting engine overview

The file `src/js/backtest/engine.js` exports a `runBacktest` function that
orchestrates a sequential backtest.  It accepts an array of prices,
an array of **layers**, a lookback period and optional configuration.  Each
layer is an object with a `name` and a `fn`—a decision function that
returns `{ signal: 'BUY'|'SELL'|'WAIT', confidence?: number }` based on
recent prices.  The engine iterates over the time series, applies
each decision function after the lookback window and records the
subsequent return.  After the loop completes, it computes performance
metrics using helpers from `metrics.js`.

Key metrics include:

| Metric | Description |
|-------|-------------|
| **Win rate** | Proportion of BUY and SELL signals that correctly predicted the direction of the next return. |
| **Profit factor** | Ratio of total gross profit to total gross loss. Values > 1 indicate a net positive strategy. |
| **Max drawdown** | Largest peak‑to‑trough decline in the simulated equity curve. |
| **Sharpe ratio** | Mean excess return divided by its standard deviation (risk‑adjusted return). |
| **False signal rate** | Fraction of BUY/SELL signals that resulted in a loss. |

All calculations are deterministic; there are no random seeds or stochastic
elements in the provided sample layers.  This aligns with the requirement
for **replayable** experiments.

## Layers and ablation

The module `src/js/backtest/ablation.js` defines several simple decision
functions that progressively add logic on top of a baseline moving‑average
crossover.  The functions illustrate how to construct and combine layers:

* **baselineDecision** – returns BUY when a short‑term (5‑bar) average
  exceeds the long‑term (20‑bar) average, SELL when below and WAIT
  otherwise.
* **regimeDecision** – uses a crude trend vs chop classifier to suppress
  trades when the slope of recent prices is small relative to volatility.
* **cnltDecision** – adds an amplitude filter; if the price range over
  the lookback window is very small, it returns WAIT to mimic the idea of
  low forcing in the CNLT observer.
* **radixDecision** – demonstrates a simple modular arithmetic hack; the
  last price modulo 3 hints at momentum, neutrality or mean‑reversion and
  can invert or suppress signals.
* **clockDecision** – introduces a three‑phase 840‑tick cycle; depending
  on the current index modulo 840, it favours buys, holds or sells.

The exported `runAblation` function constructs these layers in sequence
(`Baseline`, `Regime`, `CNLT`, `Radix`, `Clock`), runs the backtest for
each and returns an object mapping layer names to their metrics.  By
comparing the results you can observe whether adding a layer improves or
degrades performance on your dataset.

## Example usage

To run an ablation test, you can execute the modules in a Node.js
environment.  Below is a minimal example:

```js
// example_backtest.js
import { runAblation } from './src/js/backtest/ablation.js';

// Generate a synthetic price series (e.g. random walk or real historical data).
const prices = [];
let price = 100;
for (let i = 0; i < 1000; i++) {
  // simple random walk
  const change = (Math.random() - 0.5) * 2;
  price += change;
  prices.push(price);
}

// Run the ablation backtest with a 20‑bar lookback
const results = runAblation(prices, 20);
console.log(results);

/*
The returned `results` object contains, for each layer, an array of
signals, an array of returns and a `metrics` object.  For example:
{
  Baseline: {
    signals: [...],
    returns: [...],
    metrics: {
      winRate: 0.54,
      profitFactor: 1.3,
      maxDrawdown: 12.5,
      sharpeRatio: 0.4,
      falseSignalRate: 0.46
    }
  },
  Regime: { ... },
  CNLT: { ... },
  Radix: { ... },
  Clock: { ... }
}
*/
```

This example uses a synthetic random walk.  For real evaluation, supply
historical closing prices (e.g. from a CSV).  You can then examine which
additional layers, if any, lead to a higher win rate or profit factor and
which layers increase false signals or drawdowns.

## Interpreting results

* **Baseline** serves as a benchmark.  If more complex layers cannot
  outperform the baseline on out‑of‑sample data, they may not add value.
* **Regime** should reduce trading during choppy periods; if it
  significantly lowers false signals without hurting win rate, it’s a
  keeper.
* **CNLT** aims to avoid trading when the system is flat.  Check whether
  it improves profit factor by skipping low‑energy periods.
* **Radix** and **Clock** represent simple transforms inspired by the
  multi‑radix analyser and 840‑clock.  These may or may not help; use
  empirical results to decide whether to keep them.

## Extending the framework

The decision functions in this repository are deliberately simple so
developers can modify or replace them.  To build your own layer, define a
function `myDecision(ctx)` that examines `ctx.prices`, `ctx.index`, and
`ctx.options`, then returns `{ signal: 'BUY'|'SELL'|'WAIT', confidence?: number }`.  Use
`createLayer(name, myDecision)` from `engine.js` to wrap your function and
include it in the `layers` array passed to `runBacktest`.

You can also log additional state or metrics for analysis.  Because
the backtester is deterministic, running the same inputs and layers will
always yield identical outputs, satisfying the replay requirement.  To
compare variants, generate price series from the same underlying data and
hold lookback and configuration constant.

## Conclusion

The ablation and replay engine helps separate genuine predictive signal from
mathematical artistry.  By running controlled experiments and inspecting
quantitative metrics, you can identify which layers improve accuracy and
which may be unnecessary.  This disciplined approach will guide future
development of the Numöbius predictor and ensure that novel mathematical
ideas translate into real trading edges.