# HN Coach

## Current State
- Single unified wellness assessment form with all fields (personal, body metrics, diet prefs, goal)
- Generates and downloads a branded PDF report on submit
- FOMO banner with 10% discount offer (static text "expires at midnight tonight")
- PDF footer has a WhatsApp link "WhatsApp Your Personal Coach" with no pre-filled message
- Social icons (WhatsApp, Instagram, YouTube) fixed bottom-right
- Join Our Team section at the bottom

## Requested Changes (Diff)

### Add
- A live 5-minute countdown timer on the page attached to the FOMO offer banner, counting down MM:SS. When the user lands on the page, the 5-minute timer starts. When it hits 0:00, show "OFFER EXPIRED – Reload to restart" or reset.
- On the PDF report: the WhatsApp button should have a pre-filled message that references the report (name, weight, BMI, goal) and asks for a free consultation. The message should read something like: "Hi HN Coach! I just downloaded my Wellness Assessment Report. My name is [Name], weight [W]kg, BMI [BMI], goal: [Goal]. I'd love a FREE Consultation. Can you help me?"

### Modify
- The FOMO offer banner text should reference the countdown timer (e.g. "Hurry! Offer expires in: MM:SS")
- The WhatsApp link in the PDF footer should be a single clickable option with a pre-filled message as above (keep only one WhatsApp link, remove any duplicate)

### Remove
- Nothing to remove

## Implementation Plan
1. Add a `useCountdown` hook (5 min = 300 seconds) that ticks every second using `useEffect` + `setInterval`. Reset on mount.
2. Display the countdown prominently inside the FOMO offer banner, replacing the "expires at MIDNIGHT tonight" static text with a live "MM:SS" timer.
3. In `generatePDF`, build a `wa.me` link with a pre-filled URL-encoded message containing the person's name, weight, BMI, and goal, used as the single WhatsApp CTA in the report footer.
4. Remove any duplicate WhatsApp links from the PDF footer, keeping only the one with the pre-filled message.
