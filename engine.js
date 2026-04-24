// engine.js
// Core backtesting engine for the Numöbius ablation and replay framework.
// This module provides functions to run sequential backtests over historical
// price data using multiple decision layers.  It orchestrates the iteration
// over a time series, applies decision functions, and computes performance
// metrics for each layer.

import * as metrics from './metrics.js';

/**
 * Run a backtest over a series of price data using one or more decision
 * functions.  Each decision function should accept a context object and
 * return an object with a `signal` property ('BUY', 'SELL', or 'WAIT') and
 * optionally a `confidence` property.  The context includes the current index,
 * a lookback window of prices, and any custom options.  The backtester
 * evaluates each decision function at every bar beyond the lookback period and
 * compares the resulting signals against the next period’s return.
 *
 * @param {number[]} prices Array of price values (closing or adjusted close)
 * @param {Object[]} layers Array of objects: { name: string, fn: function }
 * @param {number} lookback Number of bars required before generating signals
 * @param {Object} options Optional context passed through to each decision fn
 * @returns {Object} Results keyed by layer name containing signals, returns and metrics
 */
export function runBacktest(prices, layers, lookback = 20, options = {}) {
  // Compute returns once for all layers.  Returns array length = prices.length - 1.
  const returns = metrics.calculateReturns(prices);
  // Prepare result structure
  const results = {};
  layers.forEach(layer => {
    results[layer.name] = {
      signals: [],
      returns: [],
      metrics: {}
    };
  });
  // Iterate over each time step beyond lookback
  for (let idx = lookback; idx < prices.length - 1; idx++) {
    const window = prices.slice(idx - lookback, idx + 1);
    const ctx = {
      index: idx,
      prices: window,
      allPrices: prices,
      options
    };
    const nextReturn = returns[idx];
    // Evaluate each layer at this point
    layers.forEach(layer => {
      const decision = layer.fn(ctx);
      const signal = decision && decision.signal ? decision.signal : 'WAIT';
      results[layer.name].signals.push(signal);
      results[layer.name].returns.push(nextReturn);
    });
  }
  // Compute metrics for each layer
  Object.keys(results).forEach(name => {
    const layerRes = results[name];
    const sigs = layerRes.signals;
    const rets = layerRes.returns;
    const equity = metrics.computeEquityCurve(0, sigs, rets);
    layerRes.metrics = {
      winRate: metrics.computeWinRate(sigs, rets),
      profitFactor: metrics.computeProfitFactor(sigs, rets),
      maxDrawdown: metrics.computeMaxDrawdown(equity),
      sharpeRatio: metrics.computeSharpeRatio(rets),
      falseSignalRate: metrics.computeFalseSignalRate(sigs, rets)
    };
  });
  return results;
}

/**
 * Utility to wrap a simple decision function into a layer definition.  This
 * helper ensures a consistent signature for decision functions used in the
 * backtesting engine.  It accepts a name and a function that returns a signal
 * and optionally a confidence.  The returned object can be passed directly
 * into the `layers` array of `runBacktest`.
 *
 * @param {string} name Human‑readable identifier for the layer
 * @param {Function} fn Decision function that accepts a context object and
 *                      returns { signal: 'BUY'|'SELL'|'WAIT', confidence?: number }
 * @returns {Object} Layer definition object
 */
export function createLayer(name, fn) {
  return { name, fn };
}