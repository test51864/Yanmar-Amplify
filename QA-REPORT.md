# QA Report — Yanmar Amplify GitHub-ready Release

Release: **2026-07-23.01**

## Result

The clean static release passed desktop and mobile browser smoke tests in Chromium with no uncaught JavaScript errors, no console errors, no failed initial file requests and no missing local assets.

## Tested and passed

- All visible distributor navigation routes open the correct page.
- YDG, YDP and L-Series toolkit routes render without page clipping.
- The Website Growth Guide renders in the content area and no longer injects content into the sidebar.
- The Comparison Sheet Builder opens from navigation and product-page shortcuts.
- Comparison category switching, competitor input, adding a competitor, local draft saving, CSV download and self-contained HTML download work.
- The TCO Calculator opens, validates required assumptions, calculates results and exports PNG.
- Support Request form layout renders correctly; a valid request is stored and appears in the Admin briefing inbox.
- Dark mode switches once, persists and no longer immediately switches back.
- Admin mode opens and returns to the previous distributor workspace.
- Admin navigation targets and shared Comparison/TCO tools open correctly.
- English, Dutch and Arabic core interface switching works, including right-to-left direction for Arabic.
- Mobile smoke tests at 390 px passed for YDG, Website Growth Guide, Comparison Sheet Builder, TCO Calculator and Support Request without page-level horizontal overflow.
- `app.js` passes Node.js syntax validation.
- `index.html` references only the consolidated `app.css` and `app.js` application files.

## Main repairs in this release

- Corrected the Website Growth Guide selector that previously mounted large content inside the navigation button.
- Corrected null local-storage reads that caused navigation tracking errors.
- Connected the final Comparison Sheet Builder to the active portal API and prevented the older builder from replacing it.
- Preserved active-page classes when mounting Comparison, TCO and Support tools.
- Removed the double event handling that made dark mode appear unchanged.
- Fixed hidden submenu rules, home-card width, support form columns, product comparison shortcut width and mobile comparison containment.
- Replaced the remote L-Series display image with a local asset.
- Removed visible technical build labels from the presentation interface.
- Consolidated the active versioned CSS/JavaScript layers into `app.css` and `app.js`.

## Known production limitations

The portal is a static demonstrator. Browser storage is used instead of a shared backend. Authentication, permissions, database synchronization, real email submission, centralized analytics and production Yanmar integrations are outside this release.
