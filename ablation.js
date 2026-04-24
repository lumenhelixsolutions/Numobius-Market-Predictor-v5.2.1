// ablation.js
// Provides a simple ablation framework for the Numöbius predictor.  The goal is
// to measure the marginal contribution of each decision layer by running
// identical historical data through increasing combinations of logic.  This
// module defines baseline and augmented decision functions and runs them via
// the backtest engine.  The resulting metrics can be compared to determine
// which layers add value and which may be extraneous.

import { runBacktest, createLayer } from './engine.js';

// Baseline decision: simple moving average crossover on the most recent 20
// bars.  When the short term (5 bar) average is above the long term (20 bar)
// average, the function returns 'BUY'; when below, 'SELL'; otherwise 'WAIT'.
function baselineDecision(ctx) {
  const prices = ctx.prices;
  if (prices.length < 5) return { signal: 'WAIT' };
  const recent = prices.slice(-5);
  const longTerm = prices;
  const mean = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
  const shortMA = mean(recent);
  const longMA = mean(longTerm);
  if (shortMA > longMA * 1.001) {
    return { signal: 'BUY', confidence: Math.min(1, (shortMA - longMA) / longMA) };
  }
  if (shortMA < longMA * 0.999) {
    return { signal: 'SELL', confidence: Math.min(1, (longMA - shortMA) / longMA) };
  }
  return { signal: 'WAIT', confidence: 0 };
}

// Determine a crude market regime by comparing volatility to trend strength.
// We calculate the absolute slope of the last 5 bars relative to their mean;
// high slope and low volatility indicate a trending market, while low slope
// relative to volatility indicates a choppy regime.  The threshold defines
// when to treat the market as choppy.
function detectRegime(ctx) {
  const prices = ctx.prices;
  if (prices.length < 5) return 'UNKNOWN';
  const recent = prices.slice(-5);
  const mean = recent.reduce((a, b) => a + b, 0) / recent.length;
  const slope = (recent[recent.length - 1] - recent[0]) / recent.length;
  const squaredDiffs = recent.map(p => Math.pow(p - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / recent.length;
  const volatility = Math.sqrt(variance);
  const ratio = Math.abs(slope) / (volatility + 1e-9);
  // ratio > 0.5 indicates trending; else choppy
  return ratio > 0.5 ? 'TREND' : 'CHOP';
}

// Regime‑filtered decision: calls the baseline decision and overrides the
// signal to WAIT if the regime is choppy.  This prevents trades during low
// signal‑to‑noise periods.
function regimeDecision(ctx) {
  const base = baselineDecision(ctx);
  const regime = detectRegime(ctx);
  if (regime === 'CHOP') {
    return { signal: 'WAIT', confidence: 0 };
  }
  return base;
}

// CNLT‑inspired filter: using the same baseline/regime logic, we suppress
// trades when the price amplitude (difference between max and min in the
// window) is very small relative to the mean.  This is a proxy for the idea
// that forcing is low when the system state is flat.  The threshold can be
// tuned experimentally.
function cnltDecision(ctx) {
  const base = regimeDecision(ctx);
  // If baseline already decides to WAIT, respect it.
  if (base.signal === 'WAIT') return base;
  const window = ctx.prices;
  const max = Math.max(...window);
  const min = Math.min(...window);
  const mean = window.reduce((a, b) => a + b, 0) / window.length;
  const amplitude = max - min;
  // If amplitude is less than 1% of the mean, treat as low forcing and wait
  if (amplitude / (Math.abs(mean) + 1e-9) < 0.01) {
    return { signal: 'WAIT', confidence: 0 };
  }
  return base;
}

// Radix‑style modulation: incorporate a simple modulo mapping of the price
// series to adjust signals.  We compute the current price modulo 3 and
// interpret the remainder as a hint: 0 → momentum, 1 → neutrality, 2 → reversion.
function radixDecision(ctx) {
  const base = cnltDecision(ctx);
  if (base.signal === 'WAIT') return base;
  const price = ctx.prices[ctx.prices.length - 1];
  const remainder = Math.floor(price) % 3;
  if (remainder === 1) {
    // Neutral channel – avoid trading
    return { signal: 'WAIT', confidence: 0 };
  }
  if (remainder === 2 && base.signal === 'BUY') {
    // Reversion hint – invert BUY to SELL
    return { signal: 'SELL', confidence: base.confidence };
  }
  if (remainder === 2 && base.signal === 'SELL') {
    // Reversion hint – invert SELL to BUY
    return { signal: 'BUY', confidence: base.confidence };
  }
  // remainder === 0 – keep momentum
  return base;
}

// Clock‑phase adjustment: apply a simple 840‑tick clock.  The phase is
// determined by the bar index modulo 840.  We divide the cycle into
// three equal phases: 0–279 (Phase V), 280–559 (Phase S+), 560–839 (Phase S‑).
// In Phase V we favor buys, in Phase S+ we hold, and in Phase S‑ we favor sells.
function clockDecision(ctx) {
  const base = radixDecision(ctx);
  const idx = ctx.index;
  const phase = idx % 840;
  // If phase in middle region, override to WAIT to avoid trades during churn
  if (phase >= 280 && phase < 560) {
    return { signal: 'WAIT', confidence: 0 };
  }
  // If in Phase S‑ and baseline wanted to BUY, flip to SELL
  if (phase >= 560 && base.signal === 'BUY') {
    return { signal: 'SELL', confidence: base.confidence };
  }
  // If in Phase V and baseline wanted to SELL, flip to BUY
  if (phase < 280 && base.signal === 'SELL') {
    return { signal: 'BUY', confidence: base.confidence };
  }
  return base;
}

/**
 * Run the ablation experiments on a series of price data.  The ablation
 * experiment produces a set of decision layers, each adding one more piece of
 * logic to the baseline.  The function returns the backtest results for
 * comparison.  Users can examine win rate, profit factor, drawdown, Sharpe
 * ratio, and false signal rate for each layer to determine which logic adds
 * predictive value.
 *
 * @param {number[]} prices Array of price values
 * @param {number} lookback Minimum number of bars before signals are generated
 * @returns {Object} Backtest results keyed by layer name
 */
export function runAblation(prices, lookback = 20) {
  const layers = [
    createLayer('Baseline', baselineDecision),
    createLayer('Regime', regimeDecision),
    createLayer('CNLT', cnltDecision),
    createLayer('Radix', radixDecision),
    createLayer('Clock', clockDecision)
  ];
  return runBacktest(prices, layers, lookback);
}

// Provide named exports for individual decision functions to allow custom
// compositions in user code or future experiments.
export {
  baselineDecision,
  regimeDecision,
  cnltDecision,
  radixDecision,
  clockDecision
};