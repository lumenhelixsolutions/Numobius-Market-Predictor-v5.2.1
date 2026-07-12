# Numöbius Command Center v5.2.1 Documentation

## Overview
The Numöbius Command Center is a browser-based market analysis dashboard delivered as a single HTML application in `command_center.html`. It combines charting, watchlist management, signal generation, multi-panel diagnostics, alerting, scheduled analysis, SMS/email notification setup, market sweeps, and an embedded help/guide experience.

This document explains the proper way to access, use, and interpret the interface and its major abilities.

## File and Hosting
- Primary application file: `command_center.html`
- Repository: `lumenhelixlab/Numobius-Market-Predictor-v5.2.1`
- Default branch: `main`

### Recommended ways to view the app
1. **GitHub Pages**
   - Best for full browser rendering.
   - Expected URL pattern:
     - `https://lumenhelixlab.github.io/Numobius-Market-Predictor-v5.2.1/command_center.html`
2. **CDN delivery**
   - Useful for direct rendering from repository content.
   - Example:
     - `https://cdn.jsdelivr.net/gh/lumenhelixlab/Numobius-Market-Predictor-v5.2.1@main/command_center.html`
3. **Raw file**
   - Best for source access, less reliable for fully hosted behavior.
   - Example:
     - `https://raw.githubusercontent.com/lumenhelixlab/Numobius-Market-Predictor-v5.2.1/main/command_center.html`

## External Dependencies
The application loads third-party browser libraries directly:
- Plotly.js for charting
- EmailJS browser SDK for alert sending
- Google Fonts for typography

Because it is a front-end-only page, behavior depends on the browser environment and any external endpoints or services the page expects.

## What the Command Center Does
The interface is organized as a command dashboard for market analysis. Its main abilities include:
- Ticker selection and watchlist-driven navigation
- Equity and crypto analysis modes
- Price chart visualization with multiple display modes
- Technical overlays such as SMA, EMA, Bollinger Bands, VWAP, and volume
- Signal generation with confidence, entry, stop, and targets
- Solver tuning controls for analysis behavior
- Engine diagnostics and convergence monitoring
- Phase/strategy interpretation via an 840-clock model
- Accuracy tracking and live-style scoring
- Alert feed management
- Email and SMS alert configuration
- Scheduled recurring analysis
- Market sweep ranking across tracked assets
- Embedded onboarding/help and version history

## Interface Layout
The application uses a three-zone layout:

### 1. Top Bar
The top bar provides:
- App identity and version badge
- Search box for ticker or company lookup
- Market mode toggle: **Equities** or **Crypto**
- Status indicators
- Sweep, Alerts, Export, Log, Help, and Analyze actions
- Version history access

### 2. Left Panel: Watchlist
The left panel is the watchlist. It is used to:
- View tracked instruments
- Select the active ticker
- Observe per-symbol status badges such as BUY, SELL, or WAIT
- Monitor live/stream state indicators where available

### 3. Center Panel
The center panel contains:
- Active asset header with symbol, price, daily change, open/high/low/volume
- KPI strip
- Chart toolbar
- Main chart
- Bottom strip for multi-timeframe output and energy trajectory

### 4. Right Panel: Tabs
The right panel contains the main operating tabs:
- Signal
- Solver
- Engine
- Strategy
- Accuracy
- Alerts
- SMS
- Sweep
- Schedule
- Log
- Guide

## Proper Use: Step-by-Step

### Step 1: Open the application in a browser
Use GitHub Pages or a CDN-hosted URL so the browser treats the file like a web page rather than a source document.

### Step 2: Choose market mode
Select one of the two modes from the top bar:
- **Equities**: intended for stock-style daily-bar workflows
- **Crypto**: intended for faster, shorter-horizon workflows

This mode changes assumptions such as time horizon, indicator behavior, and likely chart cadence.

### Step 3: Select a ticker
Use either:
- The search box in the top bar, or
- The watchlist on the left

After selecting a ticker, the center panel becomes the focal area for charting and KPI review.

### Step 4: Run analysis
Click **▶ Analyze**.

This is the main action that populates:
- Signal output
- Confidence and risk levels
- Forecast cards
- Diagnostic panels
- Strategy/phase interpretation
- Log and accuracy-related data depending on available scoring workflows

### Step 5: Read the signal first
The **Signal** tab is the primary decision panel. Start there before adjusting advanced controls.

### Step 6: Use chart and indicator controls
From the chart toolbar you can:
- Change time range: 5D, 1M, 3M, 6M, 1Y, 5Y
- Set custom date ranges
- Switch chart type: Candle, Line, Area
- Toggle overlays: SMA, EMA, BB, VWAP, Vol
- Adjust indicator period
- Adjust prediction horizon

### Step 7: Review advanced tabs only as needed
- Use **Solver** to tune analysis behavior
- Use **Engine** to validate solver health and stability
- Use **Strategy** to interpret phase context
- Use **Accuracy** to monitor historical or rolling performance
- Use **Schedule** for automation
- Use **Alerts** and **SMS** for notifications
- Use **Sweep** for broader scanning

## Feature Documentation

## Top-Level Controls and Their Abilities

### Search
The search box supports finding a symbol or company. Use it when you know what asset you want to inspect.

### Market Mode Toggle
The mode selector switches between:
- **Equities**
- **Crypto**

Use Equities for stock and ETF workflows.
Use Crypto for digital asset workflows and shorter prediction horizons.

### Sweep Button
The **🌪️ Sweep** button runs a broader market scan. This is intended for:
- Identifying notable movers
- Comparing multiple tracked or major symbols
- Surfacing opportunities or caution candidates

### Alerts Button
Opens the Email/SMS alert modal where EmailJS-based alert delivery can be configured.

### Export Button
Exports prediction log data for external review.

### Log Button
Used for log directory interaction or log handling as supported by the page logic.

### Help Button
Opens the embedded guide content for quick-start and conceptual explanations.

### Analyze Button
Runs the core analysis cycle on the selected asset.
This is the most important operating action in the interface.

## KPI Strip
The KPI strip displays high-level system outputs:

### Energy
Represents solver convergence energy.
General interpretation:
- Lower is better
- Lower suggests cleaner structural fit
- Higher suggests less stable or less converged structure

### Convergence
Represents how many solver instances reached a target minimum.
General interpretation:
- Higher means broader consensus
- Lower means weaker agreement across runs

### CNLT Forcing
Represents structured forcing or signal strength.
Higher values generally imply stronger pattern pressure in the model.

### 840-Clock
Shows the active timing/phase position in the model’s cyclic framework.

### Regime
Indicates detected market regime such as:
- Bull
- Bear
- Range
- Mean reversion

### Accuracy
Shows direction win-rate style scoring when prediction scoring data is available.

## Chart Toolbar

### Time Range Controls
Use preset buttons for quick range changes:
- 5D
- 1M
- 3M
- 6M
- 1Y
- 5Y

### Custom Date Filters
Use **From** and **To** fields when you want to isolate a specific historical segment.

### Chart Type
Available views:
- **Candle**: best for OHLC behavior
- **Line**: best for simplified trend reading
- **Area**: best for visual emphasis on broad direction

### Technical Overlays
Available toggles:
- **SMA**
- **EMA**
- **BB** (Bollinger Bands)
- **VWAP**
- **Vol**

### Indicator Period
Controls the lookback period for relevant overlays.
Smaller periods react faster; larger periods smooth more noise.

### Prediction Horizon
Controls how far the prediction engine projects.
Shorter horizons are generally more tactical; longer horizons are more speculative.

## Tab-by-Tab Documentation

## 1. Signal Tab
This is the primary interpretation tab.

### Main abilities
- Shows current directional output: **BUY**, **SELL**, or **WAIT**
- Displays confidence
- Provides trade structure:
  - Entry
  - Stop Loss
  - Target 1
  - Target 2
- Displays contextual attributes:
  - Phase
  - Regime
  - ATR(14)
  - CNLT Forcing

### Framework metrics block
The tab also exposes advanced conceptual metrics such as:
- Ladder Node
- Orientation
- Ladder Action
- Triality Synergy
- FoL Entropy
- Norm Stable
- Fusion Absorption
- Digital Root
- E8 Aligned
- 7-Crowd
- REOFFSET

These are part of the app’s internal modeling language and should be treated as interpretive diagnostics rather than standalone trading instructions.

### Forecast cards
The Signal tab contains:
- **Next Day Forecast**
  - Open
  - High
  - Low
  - Close
  - Range
  - Delta Change
  - Confidence
  - Volatility regime
- **Extended Forecast**
  - 7-Day
  - 14-Day
  - 30-Day
  - Decay

### Proper use
Start with:
1. Direction
2. Confidence
3. Regime
4. Stop/target structure
5. Forecast card

Only then move into deeper framework diagnostics if needed.

## 2. Solver Tab
The Solver tab lets you tune the analysis engine.

### Main abilities
- Set batch size
- Set max steps
- Set CNLT probes
- Set probe separation
- Set risk percentage
- Toggle auto-log
- Configure analysis window
- Configure convergence threshold
- Configure energy damping
- Choose gate sequence
- Adjust signal sensitivity
- Adjust ensemble runs
- Adjust momentum weight
- Adjust confidence floor
- Adjust prediction decay
- Adjust volatility scaling
- Adjust mean-revert pull
- Toggle EOD next-day forecast generation
- Use horizon preset buttons

### Proper use guidance
If you are new to the app:
- Leave defaults unchanged
- Run multiple analyses first
- Only tune one variable at a time

If you are testing signal behavior:
- Lower sensitivity may produce more signals
- Higher confidence floors may reduce weak outputs
- Larger batch size may improve stability but can feel slower

## 3. Engine Tab
This tab exposes system diagnostics.

### Main abilities
- Displays convergence rate
- Displays best energy
- Displays solve throughput
- Displays total runs
- Shows convergence history chart
- Shows energy trend chart
- Shows dimensional activation bars
- Shows the 64-cell state grid

### Proper use
Use this tab to answer:
- Did the solver converge well?
- Is the engine stable?
- Are results consistent or noisy?

If convergence is poor and energy is high, be more cautious with any trading interpretation.

## 4. Strategy Tab
This tab presents the 840-clock phase framework.

### Main abilities
- Shows current phase recommendation card
- Summarizes performance by phase
- Shows a phase transition timeline
- Displays the small phase clock

### Phase categories
- **V**: trend-focused phase
- **S+**: momentum-focused phase
- **S−**: reversal-focused phase

### Proper use
Use this tab to understand context.
A BUY or SELL signal should be interpreted alongside phase alignment, not in isolation.

## 5. Accuracy Tab
This tab tracks scored performance.

### Main abilities
- Direction win percentage
- Average error percentage
- Simulated P&L
- Rolling accuracy chart
- Signal hit rate
- Prediction counts
- Per-ticker win-rate breakdown

### Proper use
Use this tab after enough runs have been collected.
Do not treat early or low-sample data as statistically reliable.

## 6. Alerts Tab
This is the real-time alert feed.

### Main abilities
- Displays system-generated alerts
- Uses severity tiers such as:
  - Critical
  - High
  - Medium
  - Low

### Possible alert categories
- Energy shifts
- Regime changes
- New directional signals
- High forcing conditions

### Proper use
Use alerts as prompts for review, not automatic actions.
Always cross-check in the Signal and Chart areas.

## 7. SMS Tab
This tab is dedicated to Email-to-SMS configuration.

### Main abilities
- Turn SMS provider on or off
- Enter phone number
- Select carrier gateway
- Enter Gmail address
- Enter Gmail app password
- Select trigger conditions
- Send test SMS
- Save SMS configuration
- Review debug logging

### Required setup
1. Enable Gmail 2-factor authentication
2. Generate an app password
3. Enter:
   - phone number
   - carrier
   - Gmail address
   - app password
4. Choose triggers
5. Send a test SMS

### Trigger examples
- New signals
- Regime changes
- Forcing threshold alerts
- Entropy threshold alerts

### Proper use and cautions
- Use a dedicated Gmail app password
- Verify carrier gateway compatibility
- Test before relying on alerts
- Treat this as best-effort delivery, not guaranteed real-time infrastructure

## 8. Sweep Tab
This tab displays market sweep results.

### Main abilities
- Show ranked scan results
- Compare movers across tracked markets
- Present compact recommendation categories such as:
  - Consider
  - Caution
  - Avoid
- Surface special handling for Chinese market items

### Proper use
Use Sweep for discovery.
Then select promising symbols and run full analysis individually.

## 9. Schedule Tab
This tab automates recurring analysis.

### Main abilities
- Set interval
- Set run duration
- Enter multiple tickers
- Start and stop scheduler
- View live price section
- Review prediction tracker entries

### Proper workflow
1. Enter a clean ticker list
2. Choose a sensible interval
   - Faster for crypto
   - Slower for equities
3. Start the scheduler
4. Monitor live prices and tracker output
5. Review Accuracy tab after enough runs accumulate

### Good operational practice
- Avoid overly aggressive scheduling if browser resources are limited
- Use shorter lists during initial testing
- Confirm alerts and logging work before long unattended runs

## 10. Log Tab
This tab is for prediction history.

### Main abilities
- View prediction entries
- Review timestamps and outcomes
- Export data for analysis

### Proper use
Use the log for:
- audit trail
- tuning review
- comparing model settings over time
- external analysis or archiving

## 11. Guide Tab
The app includes an embedded guide already.

### Main abilities
- Quick start walkthrough
- Tab reference
- Signal-reading help
- Framework explanation
- 840-clock notes
- Scheduler setup
- SMS setup
- Sweep overview
- Chinese market notes
- Glossary access
- Changelog entry point

### Proper use
This is the fastest in-app reference for first-time operators.

## Alerts Configuration Modal
The Email & SMS Alerts modal supports EmailJS-based sending.

### Fields
- EmailJS Public Key
- Service ID
- Template ID
- Email
- SMS gateway address (optional)
- Trigger toggles for:
  - Signals
  - Regime changes
  - Energy
  - Accuracy

### Proper use
- Configure EmailJS correctly first
- Use a known-good template
- Test send before relying on it
- Keep in mind EmailJS free-tier limits

## Version History Modal
The version badge opens a version-history modal.

### Ability
- View release-style notes and historical changes

Use it when checking whether a behavior may be due to a recent version update.

## Recommended Operating Workflow
For most users, the best workflow is:
1. Open the app in a hosted browser context
2. Select **Equities** or **Crypto** mode
3. Choose a ticker
4. Run **Analyze**
5. Review the **Signal** tab first
6. Confirm context with chart overlays and regime
7. Use **Strategy** and **Engine** for deeper validation
8. If monitoring repeatedly, configure **Schedule**
9. If notifications matter, configure **Alerts** and **SMS**
10. Review **Accuracy** and **Log** over time

## Best Practices
- Start with default settings
- Use hosted viewing, not the GitHub blob page
- Change one solver setting at a time
- Treat forecasts as model outputs, not guarantees
- Use regime and phase context before acting on direction
- Validate alerts with manual review
- Build confidence only after enough scoring data exists
- Export logs for serious evaluation

## Common Mistakes to Avoid
- Running the file only inside the GitHub code viewer and expecting full app behavior
- Treating a single BUY or SELL as sufficient without checking regime, confidence, and chart context
- Over-tuning solver parameters too early
- Assuming SMS/email alerts are guaranteed instant delivery
- Over-interpreting low-sample accuracy numbers
- Using long prediction horizons with the same confidence as short ones

## Operational Notes
- The app is front-end centric and depends on the browser environment.
- Network policies, CORS rules, or third-party service availability can affect behavior.
- Some controls are clearly marked as **PRO** or **ENT**, indicating advanced or premium-style feature groupings in the UI.
- The in-app guide and tooltips are an important part of the experience and should be used alongside this document.

## Quick Reference

### Core actions
- Select ticker
- Choose market mode
- Click Analyze
- Read Signal
- Validate on Chart
- Monitor Accuracy
- Automate with Schedule
- Notify with Alerts/SMS

### Most important tabs for new users
1. Signal
2. Strategy
3. Accuracy
4. Schedule
5. Guide

## Disclaimer
This application presents analytical and forecasting outputs through a custom modeling framework. It should be used as an informational and exploratory tool. Any trading or investment decision should be independently validated and risk-managed.
