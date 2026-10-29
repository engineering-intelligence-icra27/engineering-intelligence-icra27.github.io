# Engineering Intelligence — ICRA 2027

A portable static website for the proposed workshop **Engineering Intelligence: AI for Design, Manufacturing and Robotics**. No build tool, package installation, or backend is required.

## Preview

Open `index.html` in a browser with an internet connection. The accompanying `Engineering_Intelligence_Website.html` is a single-file review copy with the same content and styling.

The website contains six confirmed invited speakers and three confirmed organizers from the current proposal. It clearly marks workshop acceptance, the assigned date, and contribution deadlines as pending. Mark Fuge is available on May 28 only. Talk titles remain tentative. The order of speaker cards does not assign speakers to particular sessions or talk times.

## Recommended hosting: GitHub Pages

Use a dedicated workshop organization so multiple organizers can maintain the site and future editions can retain the same home. One possible address is `engineering-intelligence.github.io`; availability has not been checked or reserved.

1. Create the chosen GitHub organization/account and its public `<owner>.github.io` repository. For the example address, the repository name must be exactly `engineering-intelligence.github.io` under the matching organization.
2. Put the contents of this folder in the repository root. Keep `index.html`, `styles.css`, `script.js`, and `assets/` together.
3. In the repository's **Settings → Pages**, choose **Deploy from a branch**, then `main` and `/ (root)`.
4. Wait for GitHub Pages to build the site and use the published URL shown in Settings. Check the live page on a phone and desktop, including the speaker images and biography buttons.
5. Give co-organizers repository access. Edits pushed to `main` will update the site automatically.

An ordinary project repository is also supported: its default address is `<owner>.github.io/<repository>/`. All site asset paths are relative. A custom domain can be connected later. GitHub Pages is available for public repositories on GitHub Free.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

Cloudflare Pages is another static hosting option, including Git integration or a dashboard upload. GitHub Pages is the simpler default for an academic workshop maintained by several researchers.

Nothing has been published, no repository has been created, and no domain has been reserved as part of this draft.

## Editing

- **Content:** `index.html` contains the complete text, schedule, speaker cards, organizer cards, and speaker biography dialogs. Change a speaker's card and their matching dialog together. `people.json` records the current people and portrait sources; it is a source manifest, not a runtime database.
- **Visual design:** `styles.css` contains colors, typography, responsive layouts, print styling, and reduced-motion support.
- **Interactions:** `script.js` handles the mobile menu, engineering-loop captions, program filters, and accessible native dialogs.
- **Graphics:** The engineering wireframe is original inline SVG in `index.html`. It is an illustration, not a simulation result. The icon is in `assets/`.

When acceptance is announced, update the hero, date/status strip, footer, contribution notice, page title, and metadata. Replace the tentative contribution dates and add the real submission link once available. Do not imply that workshop proposal submission dates are participant paper deadlines. Keep Mark's availability note until the assigned day is known.

## Portraits

All nine portraits use verified image URLs from public institutional or personal profiles. Images load from those external websites, so the review copy requires an internet connection to show the portraits. Each image has a stable initials fallback if its host is unavailable. Source profile links and Ken Goldberg's Chris Michel photo credit appear in the site's **Portrait credits** dialog.

For a more durable public deployment, use locally hosted speaker-approved image files. `download_portraits.py` is an optional standard-library Python helper that downloads the current public portraits and updates image paths in `index.html` to local files. It never changes the source images. Run it from a machine with internet access:

```sh
python3 download_portraits.py
```

It saves portraits under `assets/portraits/` and only rewrites paths for successful downloads. Image rights remain with their owners. Check framing and acknowledgments against the images supplied by the speakers before public launch.

## Design and accessibility

Warm ivory, forest green, and terracotta; an original engineering geometry illustration; restrained grayscale portraits that reveal color on hover/focus. Mobile layout, visible keyboard focus, skip link, semantic headings, image alternatives, native dialog keyboard behavior, reduced-motion support, and a print stylesheet are included. Navigation, profile links, and panel questions work without JavaScript; dialogs and filters are progressive enhancements.

No analytics, cookies, forms, tracking scripts, remote JavaScript, or network-loaded fonts are included. Portrait requests go directly to the listed source sites. Contact links open the visitor's email client.

## Review checks

JavaScript syntax, HTML structure, internal anchors, dialog targets, local assets, people counts, and program times were checked. A full browser visual check could not run in the build environment because a browser executable was unavailable and its download was blocked. Review the page in a browser before publishing, including portrait crops at mobile and desktop widths.
