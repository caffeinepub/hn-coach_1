# HN Coach

## Current State
Single-page wellness assessment app. Users fill one form, pay Rs. 10 via Razorpay, and download a PDF wellness report. Features: 7 wellness metrics, sleep analysis, diet timetable, nutrition macros, ideal body measurements, health risk section, referral system, admin dashboard, Hindi/English toggle (English shows 🇬🇧 flag).

The dinner time is currently calculated as 5–6 hours after the breakfast start time (wrong — should be 5–6 hours after lunch time).

The language toggle shows 🇬🇧 for English.

There is no 10-minute FOMO countdown on the page.

There is no "reports generated" live counter bar.

The report has no Biological Age section.

The wellness score exists in the report but is not prominently shown/calculated based on the full report data comprehensively.

## Requested Changes (Diff)

### Add
- **10-minute FOMO countdown** on the page: A prominent countdown timer starting at 10:00 and ticking down to 0. Shows the offer price (Rs. 10 instead of Rs. 499). Resets when it reaches 0 (loops). Should appear above the form, inside a FOMO banner. Turns red in final 60 seconds.
- **Live "Reports Generated" counting bar**: A progress/counter bar on the page showing how many reports have been generated. Fetches the total download count from the backend (`getRecords` call) and displays it as a live animating number with a progress-style bar (e.g. "1,234 Wellness Reports Generated So Far!"). Updates on page load.
- **Biological Age section in the PDF report**: Calculate biological age based on BMI, sleep quality, physical activity, hydration, and metabolic health per trusted medical organization (WHO/Mayo Clinic methodology). Show it as a prominent section in the report after the Wellness Score section. Formula: biological age = chronological age + adjustment factors (BMI deviation, sleep deficiency, low activity penalty, dehydration). Show whether biological age is lower (good) or higher than chronological age, with a color-coded message.

### Modify
- **Dinner time calculation**: Fix the `computeDietTimetable` function. Dinner should be calculated as 5–6 hours **after lunch time** (not after breakfast start). Current bug: dinner is calculated as `bfFromH + 5` which is ~5 hours after breakfast, not after lunch.
- **English flag**: Change 🇬🇧 to 🇮🇳 in the English language toggle button.
- **Wellness Score**: Enhance the existing `computeWellnessScore` function to incorporate more report data — BMI score, sleep hours (from bedtime/wakeUpTime), hydration (water intake relative to body weight), BMR fitness, footsteps, exercise minutes. Make the score calculation more comprehensive and reflect the full report. Show score in the report with a better breakdown. Also show wellness score prominently on the page after form submission (not just in PDF).

### Remove
Nothing to remove.

## Implementation Plan

1. **Fix dinner time in `computeDietTimetable`**: Lunch starts at `bfFromH + 5` hours from wake-up. Dinner should start 5–6 hours after **lunch start** (`bfFromH + 5 + 5 = bfFromH + 10`), not `bfFromH + 5`. Fix the dinnerFrom/dinnerTo calculations.

2. **Change English flag**: In the language toggle in `App()`, change `🇬🇧 English` to `🇮🇳 English`.

3. **10-minute FOMO countdown**: Add a `FomoCountdown` component that:
   - Uses `useState` for seconds (600) and `useEffect` with `setInterval` for countdown
   - Resets to 600 when it reaches 0
   - Displays MM:SS format
   - Shows red styling when ≤ 60 seconds
   - Placed above the WellnessAssessment section, below the banner image
   - Shows "⏳ Offer expires in X:XX — Download at Rs. 10 before it's too late!"

4. **Live Reports Counter**: Add a `ReportsCounter` component that:
   - On mount, calls `createActorWithConfig().then(actor => actor.getRecords(null, null))` to get total count
   - Shows an animated number counter (starts from 0, counts up to real value over 1.5s)
   - Displays as a styled bar: "🏆 X,XXX Wellness Reports Generated!" with a green progress fill
   - Placed just above the FOMO countdown or below the tagline section

5. **Biological Age calculation**: Add `computeBiologicalAge(age, bmi, sleepHours, waterLitres, bodyWeight, activityLevel)` function:
   - Start from chronological age
   - BMI penalty: if BMI > 25, add (BMI - 25) * 0.5 years; if BMI < 18.5, add (18.5 - BMI) * 0.4 years
   - Sleep penalty: if sleep < 6h, add 2 years; if sleep < 7h, add 1 year; if > 9h, add 0.5 years
   - Activity penalty: sedentary adds 2 years; lightly_active adds 1 year; moderately_active or above, no penalty
   - Hydration bonus: if waterLitres >= weight/18, subtract 0.5 years
   - Round to 1 decimal
   - Add to PDF report after wellness score: show chronological age vs biological age, color-coded (green if bio < chrono, red if bio > chrono), with a message from WHO/Mayo Clinic methodology

6. **Enhanced Wellness Score**: Update `computeWellnessScore` to also take `sleepHours` and `waterIntake` and `activityLevel` as parameters, add sleep component (0–15 pts) and hydration component (0–10 pts), cap total at 100. Update all call sites to pass the new parameters. The score should factor: BMI (30pts), water (10pts), BMR fitness (20pts), steps (10pts), exercise (10pts), sleep (15pts), hydration adequacy (5pts).
