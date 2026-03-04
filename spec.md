# HN Coach

## Current State
- Single unified wellness assessment form producing 7 metrics
- Download dialog asks: name, age, city, height, weight, goal, diet preference (veg/non-veg), raw fruits (yes/no), raw salad (yes/no), curd (yes/no), hunger capacity (3/4/5 hrs)
- Water intake formula: weight / 15 litres
- Footsteps: weight × 110
- PDF report includes logo, poster image, all metrics, weight goal banner, diet preferences, motivation message, footer
- Poster shown as full-width banner on page
- Tagline shown in gradient bar at top
- Social icons (WhatsApp, Instagram, YouTube) fixed bottom-right
- No FOMO/offer banner on page

## Requested Changes (Diff)

### Add
- "Get Your Free Wellness Assessment Report" label/badge text visible everywhere the CTA appears (button, section heading, dialog title) — emphasise "Free" and "Report"
- Diet preference questions in the download dialog: add "Did you add fruits today?" yes/no, "Did you add salad today?" yes/no, "Did you add curd today?" yes/no (alongside existing questions)
- WhatsApp icon in the PDF report, linked to wa.me/919155348866
- Highlighted FOMO offer banner on the page: "Enroll in our Personal Coaching Program TODAY and get 10% OFF — Offer valid till midnight tonight!" with urgency styling (countdown feel, red/orange highlight)
- Highlighted tagline in the center of the PDF report (bold, larger, gradient or accent box in center of header area)

### Modify
- Water intake formula: change from weight/15 to weight/18 (1 litre per 18 kg)
- PDF poster image: make it smaller (e.g., max-height ~160px or width ~55% instead of 100%)
- PDF tagline: move to a dedicated centered highlighted box below the header, make it more prominent (larger font, gradient background, centered)
- Download dialog: rename existing "Do you eat raw fruits?" to also include "Did you add fruits today?" framing; similarly for salad and curd — keep both as a combined question or add "today" qualifier

### Remove
- Nothing removed

## Implementation Plan
1. Update `computeResults()` — change waterIntake formula from `w / 15` to `w / 18`
2. Update water intake metric note on-screen from "1 litre per 15 kg" to "1 litre per 18 kg"
3. Update PDF water intake note from "1 litre per 15 kg" to "1 litre per 18 kg"
4. Update all CTA button labels and section headings to say "Get Your Free Wellness Assessment Report"
5. Add "today" qualifier to raw fruits, raw salad, curd questions in the download dialog
6. Add WhatsApp icon + link (wa.me/919155348866) to the PDF report footer
7. Make poster image smaller in PDF (add max-height and width constraints, center it)
8. Add highlighted tagline block centered in PDF (below header or in its own section)
9. Add FOMO offer banner on the page (between tagline bar and assessment form, or above the form) — eye-catching red/orange with "10% OFF", "midnight tonight", urgency language
