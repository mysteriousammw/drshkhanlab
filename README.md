# Animal Biotechnology Lab Website - Guide

## Overview

This is the source code for the **Animal Biotechnology Lab** website at the University of Agriculture Peshawar, Pakistan.

**Lab Principal Investigator:** Dr. Sher Hayat Khan

---

## Website Structure

```
drshkhanlab/
├── index.html              ← Homepage
├── css/
│   └── style.css           ← Main stylesheet
├── js/
│   └── main.js             ← JavaScript functions
├── images/                 ← Put all images here
│   ├── logo.png            ← Lab logo (optional)
│   ├── pi-placeholder.jpg  ← PI photo
│   ├── member-placeholder.jpg
│   └── gallery/            ← Gallery images
└── pages/
    ├── key-personnel.html  ← PI profile
    ├── members.html        ← All team members (Professors, PhD, MS students)
    ├── research-ongoing.html
    ├── research-completed.html
    ├── publications.html
    ├── inventory.html      ← Chemicals + Equipment sections
    ├── protocols.html
    ├── gallery.html
    ├── news.html
    └── contact.html
```

---

## How to Edit Content

### 1. Adding/Editing Team Members

**File:** `pages/members.html`

Find the section for the appropriate category and copy-paste:

```html
<div class="content-card" style="text-align: center;">
    <img src="../images/member-placeholder.jpg" alt="Student Name" ...>
    <h4>Student Name</h4>
    <p style="color: var(--accent); ...">PhD Scholar (Year 2)</p>
    <p style="...">Research topic: Your topic here</p>
</div>
```

### 2. Adding Publications

**File:** `pages/publications.html`

Copy-paste a publication block:

```html
<div class="publication-item">
    <span class="pub-year">2024</span>
    <div class="pub-content">
        <h4>Your Paper Title Here</h4>
        <p class="pub-authors">Author names with <strong>Khan SH</strong> highlighted</p>
        <p class="pub-journal">Journal Name, Volume, Pages</p>
        <a href="#" class="pub-link">Read More <i class="fas fa-external-link-alt"></i></a>
    </div>
</div>
```

### 3. Adding Research Projects

**File:** `pages/research-ongoing.html` or `pages/research-completed.html`

Copy-paste a research card:

```html
<div class="research-card">
    <span class="pub-year" style="...">2024-2026</span>
    <h3 style="margin-top: 16px;">Project Title</h3>
    <p>Description of the research project...</p>
    <div style="margin-top: 16px;">
        <span style="...">Tag 1</span>
        <span style="...">Tag 2</span>
    </div>
</div>
```

### 4. Adding News Items

**File:** `pages/news.html`

Copy-paste a news card:

```html
<div class="news-card">
    <span class="news-date">March 2026</span>
    <h3>News Title</h3>
    <p>News content here...</p>
</div>
```

### 5. Adding Inventory Items

**File:** `pages/inventory.html`

For **Chemicals**, copy in the Chemicals section:

```html
<div class="content-card">
    <div style="...">
        <div style="..."><i class="fas fa-flask" ...></i></div>
        <div><h4>Chemical Name</h4><p style="...">Details</p></div>
    </div>
    <p style="...">Description</p>
</div>
```

For **Equipment**, copy in the Equipment section following the same pattern.

### 6. Adding Photos

1. Save your photos to `images/gallery/` folder
2. Update `pages/gallery.html` with the correct image path

---

## Image Guidelines

| Image | Size | Location |
|-------|------|----------|
| PI Photo | 300x300 px | `images/pi-placeholder.jpg` |
| Team Photos | 200x200 px | `images/member-placeholder.jpg` |
| Lab Photos | Any size | `images/gallery/` |
| Logo | 200x200 px | `images/logo.png` |

---

## How to Preview Locally

1. Open the `drshkhanlab` folder
2. Double-click `index.html`
3. Website opens in your browser

---

## Publishing to GitHub Pages

1. Go to [github.com](https://github.com) and sign in
2. Click **New Repository** → Name it `drshkhanlab`
3. Upload all files from this folder
4. Go to **Settings** → **Pages**
5. Select **main** branch and click **Save**
6. Wait 2-3 minutes → Your site is live at: `yourusername.github.io/drshkhanlab`

---

## Search Feature

The website has a built-in search. To add more searchable items, edit `js/main.js`:

```javascript
{ title: 'New Item', category: 'Research', url: 'pages/research-ongoing.html', desc: 'Description' },
```

---

## Color Scheme

| Color | Hex | Usage |
|-------|-----|-------|
| Dark Blue | #0a2f3f | Backgrounds |
| Teal | #0d4a63 | Primary color |
| Cyan | #00b4d8 | Accents/links |
| White | #ffffff | Text |

---

## Need Help?

For technical issues with this website, contact the person who set it up.

---

*Built with Claude Code - AI Assistant*
