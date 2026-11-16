# Logo, photos, social links and details — quick editing guide

**Logo**: Replace `public/branding/logo.png` with your approved logo image, keeping the name `logo.png`. The header and footer both use this file. The starting logo is original temporary artwork, not an asserted original business logo.

**Favicon**: Replace `public/branding/favicon.png` with a square PNG, keeping its filename.

**Illustrations and photographs**: Edit `src/config/media.json`. Each media slot has a `src` and an `alt` description:

| Slot | Where used |
| --- | --- |
| `hero` | Homepage large illustrated hero |
| `chapterInfants` | Infant feature section |
| `chapterToddlers` | Toddler feature section |
| `chapterPreschool` | Preschool feature section |
| `feature` | Homepage story section |
| `about` | About page |
| `logo` | Brand icon |

To use your own photo, add it to `public/photos/` (create folder if needed), then change the corresponding `src` to `/photos/your-photo.jpg` (or .png). Update `alt` to truthfully describe the image. Only use facility/children photos with appropriate rights and consent.

**Contact, hours, social profiles**: Edit `src/config/site.json`. `socialLinks` is deliberately empty: no verified official Facebook/Instagram page was provided. If you confirm a business page, add it as `{ "label": "Facebook", "href": "https://www.facebook.com/your-real-page" }` inside `socialLinks`. Approved social links will then appear in the footer. Do **not** use another Little Cats organization's page.

**SEO domain**: Set `domain` to the actual production website URL in `src/config/site.json`, and run `npm run build` to regenerate sitemap. Do not enter a guessed URL.

After ANY content or media change, run:
```
npm run build
npm run check
```

All site pages will receive centralized changes automatically.
