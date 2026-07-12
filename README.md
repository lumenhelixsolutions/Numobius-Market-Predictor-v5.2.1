# Numobius-Market-Predictor-v5.2.1

<p align="center">
  <img src="docs/assets/logo.svg" alt="Numobius-Market-Predictor-v5.2.1 logo" width="160">
</p>

<h3 align="center">Predict. Audit. Decide.</h3>

<p align="center">Browser command center for the Numobius probabilistic market predictor.</p>

<p align="center">
  <a href="https://lumenhelixsolutions.github.io/Numobius-Market-Predictor-v5.2.1/">Launch Page</a>
  <span> · </span>
  <a href="https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1">GitHub</a>
  <span> · </span>
  <a href="https://lumenhelix.com">LumenHelix</a>
</p>

---

Numobius-Market-Predictor-v5.2.1 is the command center for the Numobius 64D market predictor. The front-end dashboard combines quaternion algebra, coupled observers, multi-radix decomposition, and a cyclic timing engine into a reversible, auditable signal interface.

## Why Numobius-Market-Predictor-v5.2.1

- **Trace every decision.** Explicit audit packets make the engine reversible and fully auditable.
- **Test before trusting.** Built-in backtesting and ablation harness measure win rate, profit factor, and drawdown per layer.
- **Run locally.** No build pipeline or external API required — your data never leaves the browser session.

## Quick start

### macOS / Linux

```bash
git clone https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1.git
cd Numobius-Market-Predictor-v5.2.1
git clone https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1.git
cd Numobius-Market-Predictor-v5.2.1
python3 -m http.server 8000
```

### Windows (PowerShell)

```powershell
git clone https://github.com/lumenhelixsolutions/Numobius-Market-Predictor-v5.2.1.git
Set-Location Numobius-Market-Predictor-v5.2.1
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

> Tested on Windows 11, macOS Sonoma, Ubuntu 22.04/24.04, and modern mobile browsers.

## Features

| Feature | What it gives you |
|---------|-------------------|
| Live command center | HTML/CSS/vanilla-JavaScript dashboard with KPI strip, Plotly charts, scheduler, and BUY/SELL/WAIT controls. |
| Reversible audit packets | Every state transition is logged as (U_t, C_t, V_t, M_t, mu_t) for full traceability and rollback. |
| Backtest engine | Deterministic engine.js, metrics.js, and ablation.js let you evaluate layers and decision policies. |
| Zero build step | Open command_center.html in any modern browser — no bundler, server, or cloud dependency. |

## Architecture

```
command_center.html
  ->  engine.js  ->  metrics.js  ->  ablation.js
  ->  quaternion observers
  ->  cyclic timing engine
  ->  BUY / SELL / WAIT signals + audit packet
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

## License

Released under the CC0 1.0 Universal Public Domain Dedication.

---

<p align="center">
  <sub>Numobius-Market-Predictor-v5.2.1 is a <a href="https://lumenhelix.com">LumenHelix</a> project — Applied Symbolic Dynamics & Reversible Computation.</sub>
</p>
