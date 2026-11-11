# Sher Wine Shop: deployment and analytics guide

## 1. Files
index.html, products.html, about.html, contact.html, style.css, script.js and the images/ folder. Keep them in one folder with exactly this structure. All paths are relative, so it works on GitHub Pages.

## 2. Deploy on GitHub Pages
1. Sign up or log in at https://github.com.
2. Click **+ > New repository**. Name it (for example `sher-wine-shop`), choose **Public**, then **Create repository**.
3. Click **uploading an existing file**. Drag in all the files AND the `images` folder, then **Commit changes**. The HTML files must be at the top level, not inside another folder.
4. Open **Settings > Pages**.
5. Under **Build and deployment**, set Source to **Deploy from a branch**, Branch to **main**, folder to **/ (root)**, then **Save**.
6. Wait 1 to 3 minutes and refresh. Your URL appears at the top: `https://YOUR-USERNAME.github.io/sher-wine-shop/`
7. Open all four pages from the navigation bar and confirm they load.

## 3. Set up Google Analytics 4
1. Go to https://analytics.google.com and sign in.
2. **Admin (gear icon) > Create > Property**. Name it "Sher Wine Shop", pick your time zone and currency.
3. Choose **Web** as the platform. Enter your GitHub Pages URL and a stream name, then **Create stream**.
4. Copy the **Measurement ID** (looks like `G-AB12CD34EF`). It is at the top right of the stream details page (Admin > Data streams > your stream).
5. In every HTML file, find `G-XXXXXXXXXX`. It appears three times in each file. Replace all of them with your ID. Use Find and Replace in your editor, or edit on GitHub with the pencil icon.
6. Commit the changes and wait a minute for GitHub Pages to redeploy.

The Google tag in each `<head>` sends a `page_view` on every page load, so page navigation is measured automatically.

## 4. Custom events
| Action | Event | Notes |
|---|---|---|
| View details button on a wine | `select_item` | Includes wine name, ID, category and price |
| Contact form passes validation | `demo_form_submit` | `form_name = contact` |
| Newsletter form passes validation | `demo_form_submit` | `form_name = newsletter` |
| Hero/banner buttons | `cta_click` | `cta_name` says which one |
| Social links | `social_click` | `network` says which one |

The forms are demos, so they send `demo_form_submit`. If you ever connect a real form service that confirms delivery, set `DEMO_MODE = false` at the top of `script.js`. Then the contact form sends `generate_lead` and the newsletter sends `sign_up`.

## 5. Check that tracking works
**Realtime:** Reports > Realtime. Open your site in another tab and click around. You should see 1 active user, page views by page, and event names.

**DebugView:** install the "Google Analytics Debugger" Chrome extension, turn it on, reload your site, then open Admin > DebugView. Events appear as you click.

**Custom parameters:** to use `form_name` or `cta_name` in reports, go to Admin > Custom definitions > Create custom dimension, scope Event, and enter the parameter name. Data appears after about 24 hours.

If nothing shows: disable ad blockers (they block Google tag), confirm the ID has no typos, and wait a few minutes.

## 6. Test checklist
- [ ] All four pages open on the live URL
- [ ] Every nav link and logo link works
- [ ] Wine images, hero and cellar images load
- [ ] Layout works on phone width (menu button appears, cards stack)
- [ ] Age gate appears once per visit; Yes dismisses it
- [ ] Category filters show and hide wines
- [ ] View details opens a pop-up with the correct wine
- [ ] Forms show errors on empty or invalid input, and a demo message on valid input
- [ ] `G-XXXXXXXXXX` is gone from all four files
- [ ] Your visit appears in GA4 Realtime
- [ ] `select_item` and `demo_form_submit` show in Realtime events after you click and submit

## 7. Class submission
GitHub repo URL, GitHub Pages URL, screenshots of the homepage, Realtime report and Events report, combined into one PDF.

## 8. Analytics to explore (Task 4)
Realtime (active users), Reports > Engagement > Pages and screens (page views, most visited), Tech > Overview (device category), Acquisition > Traffic acquisition (sources), Engagement > Events.
