# App Vision: The Move (MVP - Professional Polish)

**Context:**
We are building a mobile-first web app called "The Move" for Northwestern University students.
We are upgrading the UI to be sleek, modern, and professional (clean cards, soft shadows, rounded corners).

**Tech Stack:**
- React (Vite based)
- Tailwind CSS (Standard for styling)
- Lucide React (Icons)
- Firebase Firestore (or Local Mock Data - keep current logic)

**Key Data Structure:**
- A "Move" has:
  - `id`, `title`, `category`
  - `timeRange`, `status`, `participants`, `maxParticipants`
  - `notes` (displayed below title)
  - `isJoined`, `isSaved`, `isHost` (Boolean: true if created by user)
  - `location`, `exactMeetingSpot`

**User Scenario & Features:**

1. **Global Navigation (Bottom Tab Bar):**
   - **Container:** A fixed bottom navigation bar (White background with top border, or light gray).
   - **Layout:** 3 Main Sections distributed evenly:
     1. **Left:** "Events" Button (Icon + Text). Clicking this shows the main Explore Feed.
     2. **Center:** The **Purple Circular "+" Button**. (Floating slightly above the bar).
     3. **Right:** "My Move" Button (Icon + Text). Clicking this shows the User Profile/Events page.

2. **View A: "Events" (Main Feed):**
   - **Top Header:** Includes the "Search Icon", "Sort", and "Filter" logic as defined previously.
   - **Sub-Navigation:** Optional "Explore" vs "Saved" toggle if needed, or keep Saved filters.
   - **Card UI (Visual Upgrade):**
     - **Style:** White cards on a light gray background.
     - **Borders:** `rounded-2xl` (Very rounded corners).
     - **Shadows:** `shadow-sm` or `shadow-md` (Soft elevation).
     - **Spacing:** `p-4` (Generous padding inside cards).
     - **Typography:** Clean sans-serif. Title is Bold. Notes are smaller and gray.
   - **Card Logic:**
     - **Delete Action:** IF `isHost` is true, show a **Trash Can Icon** (red/gray) in the top-right corner. Clicking it deletes the event.

3. **View B: "My Move" (Profile Page):**
   - **Top Filter Toggle (Segmented Control):**
     - Two prominent buttons at the top: **"Hosting"** and **"Joined"**.
     - **Logic:**
       - Clicking **Hosting** shows only events where `isHost` is true.
       - Clicking **Joined** shows only events where `isJoined` is true.
   - **List:** Displays the cards filtered by the selection above.

4. **Creating a Move (Center Button):**
   - Clicking the center "+" button opens the Modal.
   - **Post Logic:** Newly created events must set `isHost: true` and `isJoined: true`.

**UI Requirements (Aesthetic):**
- **Modern Look:** Use "Glassmorphism" or clean "Card UI". Avoid boxy borders.
- **Colors:** Primary is Northwestern Purple (#4E2A84). Background should be off-white (`bg-gray-50`) to make white cards pop.
- **Feedback:** Buttons should have active states (change color when selected).