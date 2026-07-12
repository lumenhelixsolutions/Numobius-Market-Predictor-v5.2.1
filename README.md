# Numobius-Market-Predictor-v5.2.1

<p align="center">
  <a href="https://lumenhelix.com">
    <img src="docs/assets/lumenhelix-logo.svg" alt="LumenHelix Solutions" width="180">
  </a>
</p>

<h3 align="center">Browser command center for the Numobius probabilistic market predictor</h3>

<p align="center">
  <a href="https://lumenhelixsolutions.github.io/Numobius-Market-Predictor-v5.2.1/">
    <img src="https://img.shields.io/badge/Launch_Page-Numobius-Market-Predictor-v5.2.1-00D4FF?style=flat-square&logo=githubpages&logoColor=white" alt="Launch Page">
  </a>
  <a href="https://lumenhelix.com">
    <img src="https://img.shields.io/badge/Built_by-LumenHelix-7C3AED?style=flat-square" alt="Built by LumenHelix">
  </a>
  <img src="https://img.shields.io/badge/license-CC0-1.0-8A95A8?style=flat-square" alt="License">
</p>

---

**Numobius-Market-Predictor-v5.2.1** is part of the [LumenHelix Solutions](https://lumenhelix.com) portfolio — applied symbolic dynamics & reversible computation for deterministic, traceable AI systems.

Numobius-Market-Predictor-v5.2.1 is the LumenHelix command center for the Numobius 64D market predictor. The front-end dashboard combines quaternion algebra, coupled observers, multi-radix decomposition, and a cyclic timing engine into a reversible, auditable signal interface.

## Why this exists

- **Trace every decision.** Explicit audit packets make the engine reversible and fully auditable.
- **Test before trusting.** Built-in backtesting and ablation harness measure win rate, profit factor, and drawdown per layer.
- **Run locally.** No build pipeline or external API required — your data never leaves the browser session.

## Quick start

Install and run Numobius-Market-Predictor-v5.2.1 in under two minutes.

### macOS / Linux

```bash
# Clone
git clone https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1.git
cd Numobius-Market-Predictor-v5.2.1

# Install & run
git clone https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1.git
cd Numobius-Market-Predictor-v5.2.1
python3 -m http.server 8000
```

### Windows (PowerShell)

```powershell
# Clone
git clone https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1.git
Set-Location Numobius-Market-Predictor-v5.2.1

# Install & run
git clone https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1.git
Set-Location Numobius-Market-Predictor-v5.2.1
python -m http.server 8000
```

### Windows (Git Bash / WSL)

```bash
git clone https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1.git
cd Numobius-Market-Predictor-v5.2.1
git clone https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1.git
cd Numobius-Market-Predictor-v5.2.1
python3 -m http.server 8000
```

> **Device note:** Numobius-Market-Predictor-v5.2.1 is tested on Windows 11, macOS Sonoma, Ubuntu 22.04/24.04, and modern mobile browsers.

## Full documentation

Visit the launch page for architecture, API reference, and deployment guides:  
**https://lumenhelixsolutions.github.io/Numobius-Market-Predictor-v5.2.1/**

## Features

| Feature | What it gives you |
|---------|-------------------|
| Live command center | HTML/CSS/vanilla-JavaScript dashboard with KPI strip, Plotly charts, scheduler, and BUY/SELL/WAIT controls. |
| Reversible audit packets | Every state transition is logged as (U_t, C_t, V_t, M_t, mu_t) for full traceability and rollback. |
| Backtest engine | Deterministic engine.js, metrics.js, and ablation.js let you evaluate layers and decision policies. |
| Zero build step | Open command_center.html in any modern browser — no bundler, server, or cloud dependency. |

## Architecture at a glance

```
Numobius-Market-Predictor-v5.2.1/
├── command_center.html       Browser UI and KPI dashboard
├── engine.js                 Core prediction orchestration
├── metrics.js                Performance metric computations
├── ablation.js               Layer ablation harness
└── docs/                     Technical summary and validation report
```

## Development

```bash
# Serve the dashboard locally
python3 -m http.server 8000

# Then open http://localhost:8000/command_center.html
```

## Roadmap

- [ ] Python backend integration for live data feeds
- [ ] Expanded ablation presets and regime detectors
- [ ] Exportable trade-journal and audit reports

## Support & consulting

Need deterministic AI systems with full traceability? LumenHelix builds reversible computation kernels, governance layers, and end-to-end AI integrations.

- **Website:** https://lumenhelix.com
- **Services:** AI diagnostics, B.Y.O. support packages, governance audits
- **Research:** TEN² kernel, R.U.B.I.C. boundary discipline, C.O.R.E. constraint lens

## License

Released under the CC0 1.0 Universal Public Domain Dedication.

---

<p align="center">
  <sub>Engineered by <a href="https://lumenhelix.com">LumenHelix Solutions</a> — Applied Symbolic Dynamics & Reversible Computation.</sub>
</p>
