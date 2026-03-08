# HN Coach

## Current State
Single-page wellness assessment app with a unified form collecting personal details, body metrics, and referral info. On payment (Rs. 10 via Razorpay), generates a branded PDF report with: wellness score, personal details, wellness results (BMI, BMR, TDEE, water, steps, exercise), ideal body measurements, weight goal + timeline, health risk awareness, daily nutrition requirements, foods to avoid, 30-day guarantee, and referral section.

Form fields: Full Name, Age, City, WhatsApp, Occupation, Height (cm/ft toggle), Weight, Gender, Who Invited You.

## Requested Changes (Diff)

### Add
1. **Form — Sleep Fields (new section between Body Metrics and Referral)**:
   - "Your Present Bedtime" — time picker (step 4)
   - "Your Present Wake Up Time" — time picker
   - Labels in both English and Hindi translations

2. **Report — Sleep & Recovery Section** (placed above the Foods to Avoid section):
   - Calculate total sleep hours and minutes from bedtime and wake-up time (handle overnight spanning midnight correctly)
   - WHO sleep awareness message based on hours: <6h = severely insufficient warning, 6–7h = below recommended, 7–9h = optimal, >9h = excessive
   - Small sleep/rest icon image — male silhouette sleeping for male, female silhouette sleeping for female (generated image)
   - Styled section card with moon/star icon, sleep hours displayed prominently

3. **Report — Diet Timetable Section** (placed above Foods to Avoid section, below Sleep & Recovery):
   - Breakfast time = wake-up time + 2 to 3 hours (show range, e.g. "7:00 AM – 8:00 AM" if wake up is 5 AM)
   - Lunch time = breakfast start + 5 to 6 hours
   - Dinner time = lunch start + 5 to 6 hours
   - Small food/meal icon images for each meal (generated)
   - Professional layout with 3 meal cards showing time ranges and brief guidance

### Modify
- `UnifiedFormData` interface: add `bedtime: string` and `wakeUpTime: string` fields
- `EMPTY_FORM`: add default empty strings for new fields
- `allFilled` validation: include bedtime and wakeUpTime as required fields
- `generatePDF` function: accept bedtime and wakeUpTime params; add Sleep & Recovery and Diet Timetable sections in HTML
- All `generatePDF` call sites: pass new params
- Translation objects (en + hi): add labels for bedtime, wake-up time, sleep section

### Remove
- Nothing removed

## Implementation Plan
1. Generate sleep image (male sleeping, female sleeping combined or two variants)
2. Generate meal/food timetable icons (breakfast, lunch, dinner)
3. Add `bedtime` and `wakeUpTime` to `UnifiedFormData`, `EMPTY_FORM`, translations
4. Add Step 4 (Sleep Schedule) in the form UI between Body Metrics and Referral section
5. Update `allFilled` to require bedtime + wakeUpTime
6. Add `computeSleepData()` helper — calculates total sleep hours/mins and WHO message
7. Add `computeDietTimetable()` helper — calculates breakfast/lunch/dinner time ranges from wake-up
8. Update `generatePDF()` signature and HTML to include Sleep & Recovery section and Diet Timetable section (both placed above Foods to Avoid)
9. Update all `generatePDF` call sites (4 locations) to pass new params
10. Add CSS styles for the two new sections in the PDF HTML
