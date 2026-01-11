# App Vision: The Move (MVP - Final Polish V6)

**Context:**
We are building a mobile-first web app called "The Move" for Northwestern University students.

**Tech Stack:**
- React (Vite based)
- Tailwind CSS (for styling)
- Lucide React (for icons)
- Mock Data (Use local state `useState` for all interactions)

**Key Data Structure (Mock Data):**
- A "Move" has:
  - `id`, `title`, `category`
  - `timeRange` (e.g., "18:00 - 20:00")
  - `status` ("Live Now" | "Upcoming" | "Past")
  - `participants` (number), `maxParticipants` (number | null)
  - `notes` (string)
  - `isJoined`, `isSaved`
  - `location`, `exactMeetingSpot`
  - `comments` (Array)

**User Scenario & Features:**

1. **Top Navigation (Tabs):**
   - **Explore**, **Saved**, **My Moves** tabs located at the **TOP**.

2. **The Explore Feed (Header & Filters):**
   - **Control Row Layout:**
     - Instead of a visible Search Bar, place a **Circular Search Button (Icon)** next to the Sort and Filter buttons.
     - **Interaction:** Clicking the Search Button toggles the visibility of the Search Input field (Expand/Collapse).
   - **Filter Dropdown:**
     - Label: **"Filter by..."**.
     - **Visuals (NEW):** Each option inside the dropdown must have a corresponding **Icon** next to the text (e.g., Clock icon for "Upcoming", Ball icon for "Sports").
     - Interaction: Multi-select. Click outside to close.

3. **The Explore Feed (Card UI):**
   - **Card Layout:**
     - **Top Left:** Category Icon (Circle bg).
     - **Right of Icon (Content Column):**
       1. **Title:** Bold, Clickable.
       2. **Notes:** Displayed **IMMEDIATELY BELOW** the Title.
          - **CRITICAL SPACING:** The vertical spacing (line-height/margin) between the Title and Notes must be **very tight/small**. The Notes should feel like a subtitle belonging to the Title.
          - Alignment: Must share the **SAME INDENTATION** as the Title.
       3. **Time & Location:** Displayed below the Notes.
     - **Participants:** "1/5" or "3/-".
   - **Action Buttons:** Save (Heart), Join/Unjoin.
   - **Discussion:** "Discussion (N)" toggle.

4. **Event Detail Modal (Logic Update):**
   - Trigger: Opens when clicking the Card Title.
   - **Privacy Logic:**
     - The `exactMeetingSpot` field must **ONLY** be visible if `isJoined` is true.
     - If not joined, show text like "Join to see exact location".

5. **Bottom Dock (Strict Style):**
   - **Container:** Gray Rectangular Bar (width matches app container).
   - **Floating "+" Button:**
     - Position: Horizontally centered.
     - **Height:** Gray Dock height is **4/5 (80%)** of the Purple Button's diameter.
     - **Effect:** Button overflows the top.
     - **Interaction:** Opens Create Modal.

6. **Creating a Move (Logic Update):**
   - **Inputs:** Title, Time, Location, Category, Max Participants, Notes.
   - **Post Logic (NEW):**
     - When the user clicks "Post", the new move is added to the global list.
     - **CRITICAL:** The new move must be automatically marked as **Joined** (`isJoined: true`).
     - **Result:** This ensures the new event immediately appears in the user's "My Moves" tab.

**UI Requirements:**
- Use Northwestern Purple (#4E2A84).
- Ensure Notes align with Title.
- Ensure Search is an icon button.
- Ensure newly created events appear in My Moves.