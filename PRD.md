# WishSync (Bucket List Social App) — Product Requirements Document (PRD V16.0)

**Document Version**: V16.0 6-Step Onboarding with Dedicated Nationality & Base Location Edition  
**Product Positioning**: A soul-aligned social platform based on Bucket Lists and AI vector compatibility  
**Core Slogan**: *Find someone to dream with.*  

---

## 1. 6-Step Progressive Onboarding Flow Specifications [V16.0]

1. **Architecture & Philosophy**:
   - Expands the onboarding experience from 5 to 6 deliberate steps, dedicating **Step 4** to global identity and travel synergy.
   - Preserves high conversion speed through 1-tap OAuth, smart preset buttons, quick city chips, and a persistent `Skip` escape hatch on optional identity steps.

2. **Detailed Step Matrix**:
   - **Step 1/6 (Welcome & Philosophy)**: Introduction to WishSync's anti-vanity, dream-centered social philosophy (`Start Wish Journey ➔`).
   - **Step 2/6 (Fast Social Auth)**: 1-Tap Google / Apple OAuth sign-in.
   - **Step 3/6 (Personal Identity & Basics)**:
     - 3-State Gender pills (`👩 Female`, `👨 Male`, `🌈 Non-binary`).
     - Birth Year (1970–2008) and Birth Month (1–12) selectors with live computed age and zodiac sign preview.
     - `Continue to Nationality ➔` navigates to Step 4.
   - **Step 4/6 (✨ Nationality Selection — Global Alphabetical List & Index Rail)**:
     - **Unskippable Flow**: Step cannot be skipped; every user selects their home nation to ensure meaningful cultural matching.
     - **Global List (100+ Nations, A–Z)**: Comprehensive alphabetically grouped list with sticky letter headers and inline selection indicators (`✓`), scroll position preserved on selection.
     - **Alphabetical Index Rail**: Right-side A–Z / # rail supporting quick jump via touch and tap to letter sections (`window.scrollToAlphabetLetter` and `window.handleAlphabetTouch`).
     - **Real-Time Search Bar**: Top search input filters nations instantly; clears to restore alphabet headers.
     - **Streamlined Layout**: Bottom result pill omitted to dedicate full viewport space to list browsing.
     - `Continue to Bucket List ➔` persists `nationality` into `MOCK_USER` and routes to Step 5.
   - **Step 5/6 (Seed Bucket Wishes)**: Select 2-3 starter bucket wish kits (`Generate My First Matches ⚡`).
   - **Step 6/6 (AI Vector Match)**: Companion match preview showing compatible age, zodiac, and **user's selected nationality synergy** (`Enter WishSync App 🚀`).

---

## 2. Full-Screen Edit Profile Page Specifications [V15.0]

1. **Page Architecture & Navigation**:
   - **Full-Screen Topology**: Transitions profile editing from a temporary modal sheet into a dedicated, focused full-page interface (`edit_profile`).
   - **Dual Entry Points**: Accessible directly from the Profile persona card via `[ ✏️ Edit Profile ]` button and from Settings > Account & Security > `👤 Edit Profile`.
   - **Tab Bar Auto-Hide**: `#app-tabbar` is suppressed while editing to maximize view space and eliminate navigation conflict.
   - **Native Header Actions**:
     - `← Back`: Safely returns to prior screen via navigation stack.
     - `Edit Profile`: Centered title.
     - `Save`: Aurora gradient action pill, validates name, updates `MOCK_USER`, triggers confirmation toast, and navigates back.

2. **Core Editing Modules**:
   - **Hero Avatar Customization**:
     - Clean 82px avatar preview with glowing purple border and VIP indicator.
     - Single integrated camera badge `📷` (and direct tap on avatar) to switch avatar photos. Streamlined by removing redundant text buttons and avatar-level country badge.
   - **Basic Persona Identity**:
     - Real-time Name input with validation (cannot be empty).
     - 3-State Gender buttons (`♀ Female`, `♂ Male`, `⚧ Non-binary`) with theme color highlights.
     - Birth Year (1970–2008) and Birth Month (1–12) dropdowns.
     - Reactive Age & Zodiac dynamic preview pill (`✨ Preview: ♂ 26 y/o · ♏ Scorpio`).
     - Nationality / Home Country dropdown selector with global country coverage.
     - Location input field (`📍 Location`).
   - **Soul Manifesto & Bio**:
     - Multi-line textarea for bucket list philosophy.
     - Real-time character counter (`X / 150`).
   - **Soul Archetype Tags**:
     - 8 curated life tags (`🌌 Stargazer`, `🚐 Nomad Traveler`, `💻 Indie Creator`, `🏄 Surfer & Diver`, `🍣 Food Explorer`, `🧘 Mindfulness & Yoga`, `🏔️ Alpinist`, `🎸 Indie Musician`).
     - Selection range constraint (minimum 1 tag, maximum 4 tags).

3. **Persona Card & Multi-Surface Dynamic Reflection**:
   - **Avatar Tripartite Badge Architecture**:
     - **Top-Right**: Direct `[ ✏️ ]` Edit Profile button directly on the user's avatar.
     - **Bottom-Left**: National flag/country icon badge (`${MOCK_USER.nationalityFlag}`) for cultural resonance identification.
     - **Bottom-Right**: Verification or VIP crown badge (`✓` or `👑`).
   - **Profile Capsule Badges**: Reflects Gender & Age, Zodiac Sign, Nationality (`${MOCK_USER.nationalityFlag} ${MOCK_USER.nationality}`), and Base Location.
   - Updates Profile persona card immediately upon saving.
   - Renders Soul Archetype Tags row directly below persona capsule badges.
   - Adapts displayed badges according to privacy toggle settings.

---

## 2. Native Settings Page Specifications [V14.6]

1. **Option A: iOS Grouped Inset Design System**:
   - Organized in rounded inset glass cards (`background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px;`) with uppercase section headers.
   - Smooth iOS toggle switches for boolean preferences.
2. **Top Inset Anchor: VIP Member Status**:
   - Reflects live user VIP status (`isVisitorsUnlocked`).
   - Non-VIP: Promotes VIP features with quick link to `vip_paywall`.
   - VIP Active: Shows active badge, renewal status, and management entry.
3. **WishSync Social Privacy Differentiators**:
   - **Incognito Browsing (隐身模式)**: Zero-footprint mode when viewing others' bucket lists.
   - **Wish Visibility**: 3-state cycling control (`Everyone` / `Mutual Resonators` / `Only You`).
   - **High-Compatibility Say Hi Filter**: AI compatibility filter (≥75%) to protect users from unsolicited greetings.
4. **Interactive Device & Account Operations**:
   - **Edit Profile Sheet**: Interactive slideup sheet modifying Name, Location, Bio with instant persistence.
   - **Cache Management**: Displays live cache size (`128.4 MB`) with one-click cleanup animation resetting to `0.0 MB`.
   - **Log Out Action Sheet**: Confirmation sheet protecting against accidental logouts, safely routing back to discovery feed.

---

## 2. Profile VIP Bar Visibility Logic [V14.3]

1. **Smart Conditional Display**:
   - **Non-VIP Users**: Shows the promotional upgrade bar in the Profile stats card (`👑 WishSync VIP · Unlock 3x Resonances & Visitors  Upgrade >`).
   - **VIP Users**: Completely hides this promotional bar once VIP is activated. Leo Zhang's VIP status is cleanly conveyed through the golden halo avatar aura, crown icon, and the clickable `👑 VIP` name badge.
2. **6 Core Exclusive Privileges**:
   - 👁️ **Unblur Visitors**: Reveal who viewed your wishes in real time.
   - 💖 **Resonance List**: Unblur dreamers who resonated with your bucket list.
   - 💬 **Direct "Say Hi"**: Skip matching queues to send direct greetings to admirers.
   - ⚡ **3x AI Boost**: High-priority vector matching algorithm for rare dreams.
   - 👑 **Gold Halo & Crown**: Prestigious avatar glow and verified badge.
   - ♾️ **Unlimited Dreams**: Remove quota caps; upload HD milestone photos.
3. **3-Tier Subscription Pricing Selector**:
   - `1 Month`: $9.99 / mo
   - `12 Months` (Best Value 🔥): $3.99 / mo ($47.88/yr, -60% Save) - Default selected
   - `3 Months` (Popular): $6.49 / mo ($19.47/3mo, -35% Save)
4. **Subscription Activation & Demo Re-lock**:
   - Single-tap trial activation with instantaneous reactive unlocking of visitor lists, resonance lists, and avatar gold glow.
   - Includes "Re-lock Demo" toggle for continuous prototype testing.
