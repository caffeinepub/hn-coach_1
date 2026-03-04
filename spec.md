# HN Coach

## Current State
Single unified "Get Your Wellness Assessment - Free" page with:
- One form: weight, height, age, gender, activity level
- Results: Ideal Weight, BMI, BMR, TDEE, Water Intake, Footsteps, Exercise Duration
- Download PDF dialog (asks full name, age, city, height, weight, goal)
- Branded PDF output (teal header, personal details, 7 metrics, footer)
- Social buttons: YouTube, Instagram, WhatsApp (fixed bottom-right)
- Header with logo, banner image, tagline

## Requested Changes (Diff)

### Add
1. **Superset Exercise Calculator** — separate section/card below the main results:
   - Input: current weight, goal (lose/gain/maintain), fitness level (beginner/intermediate/advanced)
   - Output: a personalized superset workout plan targeting 30–60 mins total session time
   - Show exercise pairs (supersets), sets × reps, rest time, estimated duration per pair
   - Total estimated workout time shown prominently (must be between 30–60 mins)

2. **Ideal Weight Gap Highlight Banner** — shown in results after assessment:
   - If user is overweight: bold highlighted message "You need to LOSE X kg to reach your ideal weight"
   - If user is underweight: bold highlighted message "You need to GAIN X kg to reach your ideal weight"
   - If at ideal weight: positive message
   - Visually distinct (colored banner/alert, not just text)

3. **Health Risk Timeline** — shown in results after weight gap message:
   - Based on BMI category and weight gap, show a list of potential diseases/disorders
   - Include an estimated timeline for each risk (e.g. "In 6–12 months", "In 1–2 years", "In 3–5 years")
   - Diseases to include based on BMI: Type 2 Diabetes, Hypertension, Heart Disease, Sleep Apnea, Joint Pain/Arthritis, Fatty Liver, PCOS (for females), Metabolic Syndrome, etc.
   - For underweight: Anemia, Osteoporosis, Immune weakness, Hormonal imbalance
   - Show as a timeline/list with urgency indicators (color-coded by urgency)
   - Add disclaimer: "This is an educational estimate. Please consult a healthcare professional."

4. **Updated PDF** — include new sections in the downloadable report:
   - Weight gap message (lose/gain X kg)
   - Health risk timeline summary
   - Superset workout plan summary

### Modify
- Exercise minutes in existing results updated to reflect superset approach (30–60 min range)
- PDF to include health risk section and weight gap prominently

### Remove
- Nothing removed

## Implementation Plan
1. Add `computeWeightGap` helper — returns kg to lose/gain and direction
2. Add `getHealthRisks` helper — returns array of {disease, timeline, urgency} based on BMI, gender, weight gap
3. Add `computeSupersetPlan` helper — returns superset workout plan (array of {exercise1, exercise2, sets, reps, restSeconds, durationMins}) capped at 30–60 min total
4. Add `WeightGapBanner` component — highlighted alert showing lose/gain message
5. Add `HealthRiskTimeline` component — timeline list with color-coded urgency badges
6. Add `SupersetCalculator` component — standalone card with its own inputs and workout plan output
7. Update `WellnessAssessment` to render WeightGapBanner and HealthRiskTimeline in results section
8. Update `generatePDF` to include weight gap section and health risks summary
9. Ensure all new interactive elements have proper `data-ocid` markers
