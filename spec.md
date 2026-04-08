# HN Coach

## Current State
The app has an admin dashboard accessible via `?admin=1` URL parameter and password `hncoach2024`. There is no visible or hidden button on the main page that allows navigation to the admin panel.

## Requested Changes (Diff)

### Add
- A hidden admin access button/trigger on the main page that navigates to the admin panel when clicked (or activated via a secret interaction)

### Modify
- Nothing else changes on the page

### Remove
- Nothing

## Implementation Plan
1. Add a small, inconspicuous hidden admin button in the page footer or bottom-right corner — styled to look like part of the copyright text or a tiny invisible element
2. The button should be visually hidden (e.g., tiny text, zero opacity, or blended into the watermark footer) but clickable
3. Clicking it navigates to `?admin=1` or triggers the admin panel
4. It should not be obvious to regular users
