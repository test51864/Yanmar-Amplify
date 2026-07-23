# Yanmar Amplify

Yanmar Amplify is a static distributor marketing and sales-enablement prototype for YDG generators, YDP pumps and L-Series engines.

## Start file

Open `index.html` locally for a quick preview, or publish the complete folder with GitHub Pages. No npm install, build command or server-side framework is required.

## Clean release structure

- `index.html` — the only website entry point
- `app.css` — all active styling in the correct load order
- `app.js` — all active behaviour in the correct load order
- `assets/` — product images, campaign visuals and supporting media
- `.nojekyll` — prevents GitHub Pages from applying Jekyll processing

The earlier numbered CSS and JavaScript layers have been consolidated. They should not be uploaded alongside this release.

## Included functionality

The release contains the distributor workspace, product toolkits, content library, campaign visuals, content calendar, Website Growth Guide, Comparison Sheet Builder, TCO Calculator, support-request workflow, knowledge pages, English/Dutch/Arabic interface support, dark mode and the Yanmar Admin workspace.

## Prototype limitations

This is a static front-end prototype. Drafts, support requests, admin changes and other user-generated records are stored in the current browser through `localStorage`. They are not shared between browsers or devices. There is no production authentication, database, email delivery or Yanmar system integration.

All product facts, competitor inputs, prices, claims and local availability must be verified against current approved Yanmar and distributor sources before external publication.
