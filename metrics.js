// metrics.js
// Utility functions for computing performance metrics during backtests.
// These functions operate on arrays of primitive values (e.g. prices, returns, signals)
// and return simple statistics such as win rate, profit factor and drawdown.

// Calculate simple returns from an array of prices.  The return is defined as the
// difference between the current price and the next price (i.e. price[i+1] - price[i]).
// The length of the returned array will be one less than the length of the input prices.
export function calculateReturns(prices) {
  const returns = [];
  for (let i = 0; i < prices.length - 1; i++) {
    returns.push(prices[i + 1] - prices[i]);
  }
  return returns;
}

// Compute the win rate of a set of trading signals.  A BUY signal is considered a
// success when the subsequent return is positive, a SELL signal succeeds when
// the return is negative, and WAIT signals are ignored.  Returns is an array of
// numeric values corresponding to the price change following each signal.
export function computeWinRate(signals, returns) {
  let wins = 0;
  let total = 0;
  for (let i = 0; i < signals.length; i++) {
    const sig = signals[i];
    const r = returns[i];
    if (sig === 'BUY') {
      total++;
      if (r > 0) wins++;
    } else if (sig === 'SELL') {
      total++;
      if (r < 0) wins++;
    }
  }
  return total === 0 ? 0 : wins / total;
}

// Compute the profit factor of a series of trades.  Profit factor is defined as
// total gross profit divided by total gross loss.  A profit factor greater than
// one indicates that profitable trades outweigh losing trades.  Signals that are
// WAIT are ignored.
export function computeProfitFactor(signals, returns) {
  let grossProfit = 0;
  let grossLoss = 0;
  for (let i = 0; i < signals.length; i++) {
    const sig = signals[i];
    const r = returns[i];
    if (sig === 'BUY') {
      if (r > 0) grossProfit += r;
      else grossLoss -= r;
    } else if (sig === 'SELL') {
      if (r < 0) grossProfit += -r;
      else grossLoss += r;
    }
  }
  return grossLoss === 0 ? Infinity : grossProfit / grossLoss;
}

// Compute the equity curve given an initial balance and arrays of signals and returns.
// Each BUY/SELL signal trades a single unit at the current price difference.  WAIT
// signals leave the balance unchanged.  Returns a new array representing the
// running balance after each trade.
export function computeEquityCurve(initialBalance, signals, returns) {
  const equity = [initialBalance];
  let balance = initialBalance;
  for (let i = 0; i < signals.length; i++) {
    const sig = signals[i];
    const r = returns[i];
    if (sig === 'BUY') {
      balance += r;
    } else if (sig === 'SELL') {
      balance -= r;
    }
    equity.push(balance);
  }
  return equity;
}

// Compute the maximum drawdown of an equity curve.  Drawdown is the decline from
// a peak to a trough.  The maximum drawdown is the largest such decline expressed
// as a positive number.  The equity curve should be an array of balances.
export function computeMaxDrawdown(equity) {
  let peak = equity[0];
  let maxDrawdown = 0;
  for (let i = 1; i < equity.length; i++) {
    const value = equity[i];
    if (value > peak) {
      peak = value;
    }
    const drawdown = peak - value;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }
  return maxDrawdown;
}

// Compute the Sharpe ratio of a series of returns.  The Sharpe ratio is defined as
// the mean return minus the risk‐free rate divided by the standard deviation of
// returns.  The riskFree parameter defaults to 0.  The function returns 0 when
// the standard deviation is zero to avoid division by zero.
export function computeSharpeRatio(returns, riskFree = 0) {
  if (returns.length === 0) return 0;
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const excess = returns.map(r => r - riskFree);
  const meanExcess = excess.reduce((a, b) => a + b, 0) / returns.length;
  const variance = excess.reduce((sum, r) => sum + Math.pow(r - meanExcess, 2), 0) / returns.length;
  const stdDev = Math.sqrt(variance);
  return stdDev === 0 ? 0 : meanExcess / stdDev;
}

// Compute the false signal rate.  This metric counts the proportion of BUY/SELL
// signals that resulted in a loss.  WAIT signals are ignored.  A lower value
// indicates that fewer signals were incorrect.
export function computeFalseSignalRate(signals, returns) {
  let falseCount = 0;
  let total = 0;
  for (let i = 0; i < signals.length; i++) {
    const sig = signals[i];
    const r = returns[i];
    if (sig === 'BUY') {
      total++;
      if (r <= 0) falseCount++;
    } else if (sig === 'SELL') {
      total++;
      if (r >= 0) falseCount++;
    }
  }
  return total === 0 ? 0 : falseCount / total;
}