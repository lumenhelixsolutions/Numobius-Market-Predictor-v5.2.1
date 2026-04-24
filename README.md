Numöbius Market Predictor — Command Center v5.2.1
This repository packages the Numöbius 64D Command Center (version 5.2.1) along with its supporting research and documentation.  The Command Center is the front‑end of the Numöbius Market Predictor, a multi‑layer dynamical system that combines quaternion algebra, coupled observers, multi‑radix decomposition and a cyclic timing engine to generate probabilistic trade signals.  All state transitions are logged via an explicit audit packet format, making the engine reversible and fully auditable.
Repository structure
```
numobius_v5_2_1_repo/
├── command_center.html                # Browser UI for the predictor
├── README.md                          # This overview document
├── docs/
│   ├── Pasted_text.txt                # Original research summary provided by the user
│   ├── technical_summary_v5.2.1.md    # Integrated technical summary and research (v5.2.1)
│   └── validation_report.md           # Guide to backtesting and ablation engine
├── src/
│   └── js/
│       └── backtest/                  # Backtesting and ablation library
│           ├── engine.js              # Core backtest orchestration
│           ├── metrics.js             # Performance metric computations
│           └── ablation.js            # Sample decision layers and ablation harness
```
command_center.html
The `command_center.html` file implements the Numöbius dashboard using HTML, CSS and vanilla JavaScript.  It renders the KPI strip, charts via Plotly.js, scheduler controls, and logging/alert systems.  The interface exposes the key indicators computed by the predictor and allows an operator to monitor and orchestrate trading signals in real time.
docs/Pasted_text.txt
This file contains the original technical notes and code snippets provided by the user.  It outlines the architecture, algorithms and performance figures for an earlier version of the system.
docs/technical_summary_v5.2.1.md
An updated and unified technical summary for version 5.2.1.  It details the three‑layer architecture, the formal novelty claim, the audit packet definition, core algorithms, forcing equations, signal generation logic, risk management and performance statistics.  Additional sections explain how the Command Center fetches and processes data (including the non‑orientable ladder and k‑probe harness) and summarise reported accuracy claims from other trading systems.  The document concludes with innovations, limitations, future directions and a bottom‑line overview.
Getting started
Open `command_center.html` in a modern web browser (e.g. Chrome or Firefox).  The dashboard will display a series of KPIs (energy, convergence, forcing, clock phase, regime, accuracy), live tick data and controls for signal orchestration (BUY/SELL/WAIT).  While this repository only contains the front‑end, the included documentation explains how the predictor’s backend algorithms operate and how to integrate them with a Python engine.
Documentation
Refer to `docs/technical_summary_v5.2.1.md` for a full description of the system.  It explains the three‑layer stack (presentation, analysis and algebraic core), defines the audit packet format `(U_t, C_t, V_t, M_t, μ⃗_t)`, derives the forcing equation used by the CNLT observer, describes the multi‑radix analyser and 840‑clock, and provides empirical performance statistics.  The document also lists key innovations, limitations, and suggested future work.
If you wish to evaluate the predictive value of the system’s layers or test new ideas, consult `docs/validation_report.md`.  It introduces a lightweight backtesting and ablation framework located in `src/js/backtest/` and demonstrates how to run deterministic experiments that measure win rate, profit factor, drawdown and other metrics for each decision layer.
