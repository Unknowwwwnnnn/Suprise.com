# Romantic Birthday Website

Plain HTML, CSS and JavaScript. No installs, works on GitHub Pages.

## What each file does
- `index.html` – page structure (Home, Message, Gallery, Countdown, Surprise, Final).
- `css/style.css` – colors, fonts, layout, animations, mobile design.
- `js/data.js` – **the only file you edit**: her name, date, messages, photos, music.
- `js/script.js` – all behavior (menu, typing, lightbox, countdown, envelope, music).
- `assets/images/` – your photos. `assets/music/` – your song.

## 1. Add her photos (`assets/images/`)
Copy your photos in, then match the names in `js/data.js`:
`main-photo.jpg` (Home), `memory-1.jpg`, `memory-2.jpg`, `memory-3.jpg` (Gallery).
Want more photos? Add another `{ src: "...", caption: "..." }` line to `gallery` in `data.js`.
Tip: resize photos to about 1200 px wide so the site loads fast. File names are case-sensitive on GitHub Pages (`Photo.JPG` is not `photo.jpg`).
Missing or misspelled photos show a pink "Add your photo" placeholder instead of a broken image.

## 2. Change her name and birthday (`js/data.js`)
Edit `name` and `birthdayDate`. Date format: `"YYYY-MM-DDTHH:MM:SS"`, e.g. `"2027-03-14T00:00:00"`.
Pick the exact year of her next birthday. After that moment, the countdown shows the birthday greeting.

## 3. Edit the letter and messages (`js/data.js`)
`greeting`, `intro`, `letterGreeting`, `letter`, `surpriseMessage`, `finalMessage`, `countdownDoneMessage`, and gallery `caption`s. Everything marked `[PLACEHOLDER]` is sample text to replace.

## 4. Add the music
Put an MP3 in `assets/music/` named `birthday-song.mp3` (or change `music` in `data.js`). Music never plays by itself; visitors press Play.

## 5. Preview locally
Double-click `index.html`, or run a local server (recommended):
```
cd birthday-website
python -m http.server 8000
```
Open http://localhost:8000 (in VS Code you can also use the Live Server extension).

## 6. Publish with GitHub Pages
1. Create a free GitHub account and click **New repository** (e.g. `birthday-website`, set to Public).
2. Click **uploading an existing file**, drag in the *contents* of the folder (`index.html`, `css`, `js`, `assets`, `README.md`), then **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch **main**, folder **/ (root)**, then **Save**.
4. Wait 1–2 minutes. Your link will be `https://YOUR-USERNAME.github.io/birthday-website/`. Send it to her.

Note: the link is public to anyone who has it. Avoid putting private details you wouldn't want shared.
