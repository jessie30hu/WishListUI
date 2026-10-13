# WishSync App Information Architecture Specification (V16.0)

## 📌 Document Overview
- **Product Name**: WishSync (Bucket List Social Platform)
- **Version**: V16.0 (6-Step Onboarding with Dedicated Nationality & Global Location Edition)
- **Status**: Live Mobile Interactive Prototype (`index.html` & `mobile.html`)

---

## 🌍 6-Step Progressive Onboarding Flow Architecture (V16.0)

### 1. Step-by-Step Topology & Routing
- **Step 1/6 (Welcome & Social Philosophy)**:
  - Header: `Onboarding Step 1/6`
  - Purpose: Anti-vanity social manifesto introducing bucket-list-first connection (`Start Wish Journey ➔`).
- **Step 2/6 (Fast Social Authentication)**:
  - Header: `Onboarding Step 2/6`
  - Purpose: 1-Tap Google / Apple OAuth sign-in routing directly to Step 3.
- **Step 3/6 (Personal Identity & Basics)**:
  - Header: `Onboarding Step 3/6`
  - Inputs: 3-State Gender buttons (`Female`, `Male`, `Non-binary`) + Birth Year & Month pickers.
  - Reactive preview: `✨ Result: 26 y/o · ♏ Scorpio · 👨 Male`.
- **Step 4/6 (✨ Nationality Selection — Global Alphabetical List & Index Rail)**:
  - Header: `Onboarding Step 4/6` (Unskippable — `Skip` button removed to ensure every user establishes cultural identity).
  - Title: `Your Nationality`
  - Subtitle: `Select your home country or region to discover cultural resonance and find global bucket list companions.`
  - **Search & Filter**: Real-time search bar (`Search country or region...`) supporting instantaneous filtering across all nations.
  - **Comprehensive Global List (100+ Nations, A–Z)**: Scrollable list grouped by letter headers (sticky headers with aurora glass styling), covering global countries from Afghanistan to Zimbabwe plus Other/Global.
  - **Alphabetical Index Rail**: Right-side touch/click letter sidebar (A–Z, #) with smooth scroll positioning (`window.scrollToAlphabetLetter` and `window.handleAlphabetTouch`) matching native mobile contacts/picker ergonomics.
  - **No Result Pill**: Bottom summary capsule removed to maximize vertical list viewport and avoid repetitive information.
  - **Actions**: Bottom `Continue to Bucket List ➔` persists `nationality` and `nationalityFlag` into `MOCK_USER` and advances to Step 5.
- **Step 5/6 (Seed Bucket Wishes)**:
  - Header: `Onboarding Step 5/6`
  - Purpose: Pick starter wish kits (`Generate My First Matches ⚡`) routing to Step 6.
- **Step 6/6 (AI Vector Soul Companion Match)**:
  - Header: `Onboarding Step 6/6 · AI Vector Match`
  - Purpose: Displays 96% AI companion match enriched with age, zodiac, and **the user's newly selected nationality & base location** (`Enter WishSync App 🚀`).

---

## 👤 Full-Screen Edit Profile Page Architecture (V15.0)

### 1. Navigation & Screen Topology
- **Entry Points**:
  - **Profile Persona Card**: Direct quick-action button `[ ✏️ Edit Profile ]` situated alongside the Visitors pill.
  - **Settings Menu**: Group 1 Account row (`👤 Edit Profile`) displaying current avatar and name.
- **Routing & State Management**:
  - Invokes `window.openEditProfilePage()`, pushing `'edit_profile'` onto `navStack`.
  - `#app-tabbar` is automatically hidden to provide maximum vertical canvas and focus on profile editing.
- **Native Header Architecture**:
  - **Left Action**: `← Back` button calling `window.goBack()` (returns to prior screen).
  - **Center Title**: Crisp, bold `Edit Profile` heading.
  - **Right Action**: Distinctive `Save` gradient button calling `window.saveProfileEdits()` (validates name, persists all fields to `MOCK_USER`, triggers toast notification, and navigates back).

### 2. Functional Modules & Editing Capabilities
1. **Hero Avatar Customization**:
   - Clean, centered 82px avatar display with glowing purple ring and VIP halo indicator.
   - Streamlined photo switch via bottom-right camera button `📷` (or clicking the avatar directly to cycle presets). Removed redundant text action buttons and country badge from the edit avatar.
2. **Basic Persona Identity**:
   - **Name Field**: Text input with non-empty validation.
   - **Gender Selection**: 3 distinct segmented buttons (`♀ Female`, `♂ Male`, `⚧ Non-binary`) with theme color feedback.
   - **Birth Year & Month Dropdowns**: Quick year (1970–2008) and month (1–12) selectors.
   - **Real-Time Preview Capsule**: Dynamically computes and displays calculated age, zodiac sign, and gender icon on change (`✨ Preview: ♂ 26 y/o · ♏ Scorpio`).
   - **Nationality / Home Country**: Native dropdown selector with flags covering global nations.
   - **Location Input**: Location field with destination pin icon (`📍`).
3. **Soul Manifesto & Bio**:
   - Multi-line textarea for bucket list philosophy and companion preferences.
   - Reactive live character counter (`X / 150`) updating on every keystroke.
4. **Soul Archetype Tags Matrix**:
   - Curated grid of soul tags (`🌌 Stargazer`, `🚐 Nomad Traveler`, `💻 Indie Creator`, `🏄 Surfer & Diver`, `🍣 Food Explorer`, `🧘 Mindfulness & Yoga`, `🏔️ Alpinist`, `🎸 Indie Musician`).
   - Interactive multi-selection with smart boundary enforcement (minimum 1 tag, maximum 4 tags).

### 3. Multi-Surface Persona Card & Badge Reflection
- **Profile Persona Card & Avatar Architecture**:
  - **Avatar Tripartite Badges**:
    - **Top-Right Corner**: Dedicated circular `[ ✏️ ]` Edit Profile button calling `window.openEditProfilePage()`.
    - **Bottom-Left Corner**: Dedicated circular nationality/country flag badge (`${MOCK_USER.nationalityFlag || '🇨🇳'}`) providing clear cultural identity at a glance.
    - **Bottom-Right Corner**: Status indicator displaying `👑` (VIP member) or `✓` (verified dreamer).
  - **Info Capsule Row**: Displays Gender & Age, Zodiac Sign, Nationality (`${MOCK_USER.nationalityFlag} ${MOCK_USER.nationality}`), and Base Location (`📍 ${MOCK_USER.location}`).
  - Dynamically reflects edited name, avatar, bio, nationality, location, and tags.
  - Honors `showAge` and `showZodiac` privacy preferences.
  - Renders the selected Soul Archetype Tags in a sleek glass row underneath info capsules.
- **Peer Profile**:
  - Displays companion avatar with bottom-left nationality icon and bottom-right verification check.
  - Respects companion privacy settings and displays companion soul archetype tags.

---

## ⚙️ Settings Page Architecture (V14.6 [Option A: iOS Grouped Inset Stream])

### 1. Navigation & Ergonomics
- **Entry Point**: Profile header `⚙️` gear icon triggers `window.openSettingsPage()`, pushing `'settings'` onto `navStack`.
- **Top Navigation Bar**: Native-style `← Back` button (`window.goBack()`) with centered `Settings` title.
- **Auto-Hiding Tab Bar**: Bottom tab bar (`#app-tabbar`) is hidden on the Settings page to optimize vertical scrolling for options and actions.

### 2. Functional Modules & Grouped Inset Layout
1. **VIP Member Inset Card (Top Anchor)**:
   - Dynamic gold-gradient card reflecting user VIP status (`isVisitorsUnlocked`).
   - Non-VIP: Promotes `👑 Upgrade to WishSync VIP [3X BOOST]`, tapping leads directly to `vip_paywall`.
   - VIP Active: Displays `👑 WishSync VIP Active [ACTIVE]`, Renews Oct 2026, tapping allows membership management.
2. **Account & Security (Group 1)**:
   - 👤 **Edit Profile**: Interactive slideup sheet allowing live edits of Name, Location, Bio with instant persistence to `MOCK_USER`.
   - 🔐 **Account Security**: Apple ID Linked status with 2FA protection alert.
3. **Privacy & Social Discovery (Group 2 — WishSync Core)**:
   - 🕵️ **Incognito Browsing**: Interactive iOS toggle switch. When ON, user views others' bucket lists without leaving visitor logs.
   - 🌐 **Wish Visibility**: Interactive badge cycling through `Everyone` ➔ `Mutual Resonators` ➔ `Only You`.
   - 🛡️ **High-Compatibility Filter**: Interactive iOS toggle restricting "Say Hi" greetings to matches with ≥ 75% AI compatibility.
   - 🚫 **Blocked Users**: Block list inspection (`0 users`).
4. **Notifications (Group 3)**:
   - 🔔 Push Notifications (Master toggle), 💖 Wish Resonances toggle, 👁️ Visitor Alerts toggle, 💬 Direct Chat Messages toggle.
5. **Preferences & Storage (Group 4)**:
   - 🌙 Dark Glassmorphism Theme status, 🌐 English (US) Language status.
   - 🧹 **Clear Cache**: Dynamic calculation (`128.4 MB`), one-tap clearing resets to `0.0 MB` with toast.
6. **Support & About (Group 5)**:
   - Help Center & FAQ, Community Guidelines, Privacy & Terms, Version `v1.4.6 (Build 2026)`.
7. **Danger Zone & Actions (Group 6)**:
   - 🚨 **Log Out**: Red action button opening an iOS-style Confirmation Sheet (`Log Out` / `Cancel`), resetting session to discovery feed.
   - 🗑️ **Delete Account**: Account deletion request guidance.

---

## 👑 Profile VIP Entry & Status Logic (V14.3)

### 1. Smart Conditional Visibility in Profile Card
- **Non-VIP State (`!isVisitorsUnlocked`)**:
  - Renders the promotional VIP upgrade bar below the analytics row:  
    `👑 WishSync VIP · Unlock 3x Resonances & Visitors  [Upgrade >]`
  - Tapping opens the full-screen VIP Subscription Center (`window.openVipPaywallPage()`).
- **VIP Active State (`isVisitorsUnlocked`)**:
  - **Promotional VIP bar is completely hidden** from the stats card to maintain maximum data purity and clean aesthetics.
  - Active VIP identity is represented via the **Golden Halo avatar aura**, crown badge, and the clickable `👑 VIP` name badge.
- **Profile VIP Bar Linkage**: Tapping the embedded VIP bar in Profile smoothly loads this dedicated one-screen paywall (`window.openVipPaywallPage()`).
- **Contextual Interceptions**: Tapping "Say Hi" to a blurred visitor or accessing unblurred profiles in Visitor/Resonance screens opens the quick bottom sheet (`openPremiumSheet()`), which now includes a direct link to view all 6 privileges in the full-screen VIP page.
- **Header Navigation**: Features `✕ Close` (`window.goBack()`) and `Restore` purchase action.

### 2. Page Hierarchy & Modules
1. **Hero Header**: 3D crown emblem with radial aurora-gold light halo, bold gradient typography, and inspirational value proposition.
2. **6-Feature Privileges Matrix (2x3 Glassmorphic Grid)**:
   - 👁️ **Unblur Visitors**: Reveal real identities of admirers checking your bucket list.
   - 💖 **Resonance List**: Full profiles of dreamers who resonated with your wishes.
   - 💬 **Direct "Say Hi"**: Instant chat icebreaker without waiting for mutual swipe.
   - ⚡ **3x AI Boost**: High-priority vector matching for rare & ambitious dreams.
   - 👑 **Gold Halo & Crown**: Prestigious avatar aura and verified VIP badge across the app.
   - ♾️ **Unlimited Dreams**: Unlimited active wishes and HD milestone photo uploads.
3. **3-Tier Subscription Selector**:
   - **1 Month**: `$9.99 / mo`
   - **12 Months (Best Value)**: `$3.99 / mo` (`$47.88/yr`, `-60% Save`, featured with glowing golden border & ribbon)
   - **3 Months (Popular)**: `$6.49 / mo` (`$19.47/3mo`, `-35% Save`)
4. **Primary Conversion Action**:
   - High-contrast Aurora/Gold gradient button (`Start 3-Day Free Trial & Unlock VIP`).
   - Tapping activates VIP status, equips Leo Zhang with the golden halo avatar, and reveals all visitor/resonance identities.
5. **Trust & Compliance Footer**:
   - Transparent billing microcopy, Terms of Use, Privacy Policy, and 256-bit encryption assurance.

---

## 📄 Deliverable Documentation & Prototype Index

* 📲 **Latest App Prototype (V14.0)**: [index.html](file:///Users/white/AndroidStudioProjects/WishListUI/index.html) or [mobile.html](file:///Users/white/AndroidStudioProjects/WishListUI/mobile.html)
* 📄 **Product PRD Document (V14.0)**: [PRD.md](file:///Users/white/AndroidStudioProjects/WishListUI/PRD.md)
* 📄 **Walkthrough Summary (V14.0)**: [walkthrough.md](file:///Users/white/.gemini/antigravity/brain/53ba0167-f215-44a1-9ee5-cc2670a2897f/walkthrough.md)
