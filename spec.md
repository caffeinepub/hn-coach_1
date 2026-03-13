# HN Coach

## Current State
Full wellness assessment app with multi-step form, Razorpay payment (Rs. 10), inline PDF report, admin dashboard with referral tree and rewards counter table, ReportsCounter progress bar (targets 2000), page referral section with multiple messages, PDF referral section with multiple messages. No 'paid out' tracking on rewards. No 'Next Step' solution box in report.

## Requested Changes (Diff)

### Add
- Reward tracking: 'Paid Out' toggle/button per referrer row in admin panel. Shows 'Paid ✓' badge with date when marked paid. Stored in localStorage per referrer key.
- Download counter: When displayCount crosses 1500, automatically update price from Rs. 10 → Rs. 49 everywhere (Razorpay amount, banners, badges, CTA button). Progress bar should show progress toward 1500 (not 2000) with label: 'After 1500 reports price goes to ₹49'
- 'Your Next Step' solution box in PDF report: appears above the referral section in the PDF. Shows 4 beautiful cards with calculated values: Water Intake (e.g. '2.8L / day'), Daily Footsteps (e.g. '8,800 steps'), Exercise (e.g. '45 mins · 5 days/week'), Nutrition summary (Protein/Carbs/Fat/Fibre). Heading: 'Your Immediate Next Step' subheading: 'Start practicing these today'

### Modify
- Admin referral tree: collapsed nodes with count badge (e.g. '▶ Person B (2 referrals)'), expandable on click, unlimited depth
- Page referral section: remove ALL messages except 'Help your 2 friends to download this report and get a full refund.' Keep the referral link, WhatsApp share button, copy button.
- PDF referral section: same — remove all messages/earnings box/hashtags/mission statement, keep only 'Help your 2 friends to download this report and get a full refund.' plus referral link and share buttons.

### Remove
- All extra messages from page referral section (mission statement, earnings box examples, tag2Friends text, etc.)
- All extra messages from PDF referral section (mission statement, earnings box, hashtags, referralShareDesc, etc.)

## Implementation Plan
1. Update ReportsCounter: change progress bar target to 1500, add label about price increase, add logic: if displayCount >= 1500 set price to Rs. 49 (use React state `currentPrice` initialized from count check)
2. Thread `currentPrice` state through Razorpay payment amount and all price display strings
3. Update admin rewards table: add 'Paid Out' column with toggle button, persist paid-out status in localStorage keyed by referrer
4. Update admin referral tree: implement collapse/expand with count badges
5. Clean up page referral section: remove all messages except the refund line
6. Clean up PDF referral section: remove all messages except the refund line
7. Add 'Your Next Step' section in PDF report above referral section with 4 metric cards
