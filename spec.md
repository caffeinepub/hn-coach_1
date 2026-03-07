# HN Coach

## Current State
- Single-page wellness assessment app with a merged form (personal details, body metrics, referral)
- Razorpay payment gate at Rs. 1 before PDF report download
- Referral link system: `?ref=<phone>` pre-fills "Who Invited You?" field (locked)
- PDF report with WHO/ICMR/IDA logos, wellness score, nutrition, health risks, referral section
- Backend is a minimal Motoko actor (ping only — no data storage)
- Language toggle (English/Hindi)

## Requested Changes (Diff)

### Add
- **Admin referral dashboard** — password-protected page (`/admin`) showing all referral data
  - Tree view: who referred whom (multi-level chain: A → B → C)
  - Table/list view with search by name, WhatsApp number, city
  - Downloadable CSV export of all referral data
  - Total count, referrer leaderboard
- **Backend referral tracking** — every time someone downloads a report, record: name, whatsapp, city, occupation, invitedBy (referrer), timestamp
- **Mission statement sentence** on the main page (visible section) and in the PDF referral section: "This is a Social Health Awareness Mission — Join us and make India aware about wellness."
- Backend: `recordDownload` and `getReferrals` and `getAllDownloads` canister calls

### Modify
- **Price**: increase from Rs. 1 (100 paise) to Rs. 10 (1000 paise) everywhere — page text, PDF, trust badges, Hindi translations
- **Referral section in PDF**: add the mission message prominently
- **Referral section on page**: add the mission message
- Backend: add stable storage for referral records

### Remove
- Nothing removed

## Implementation Plan
1. Update Motoko backend to store referral/download records (name, whatsapp, city, occupation, invitedBy, timestamp) with query functions to retrieve all records and build referral tree
2. Update frontend App.tsx:
   - Change all price references from Rs. 1 / ₹1 to Rs. 10 / ₹10 (including Razorpay amount 100 → 1000)
   - Add mission message to page referral section and PDF referral HTML
3. Add Admin page component with:
   - Simple password gate (hardcoded admin password)
   - Fetch all download records from backend
   - Search/filter by name or WhatsApp number
   - Tree view rendering (recursive parent-child by invitedBy field)
   - Table view toggle
   - CSV download button
4. Wire recordDownload call in the payment success handler (send name, whatsapp, city, occupation, invitedBy, timestamp to backend)
5. Add routing so `/admin` or `?admin=1` shows the admin panel
