# MeTube — "Where silence finds its voice"

A modern, YouTube-inspired video hosting and education platform UI designed for sign language educational content, inspired by the short film ***"I Am Here"***.

---

## 🎨 Theme & Design System

- **Primary Colors (Sky Blue)**:
  - Light Sky Blue: `#87CEEB`
  - Medium Sky Blue: `#4FC3F7`
  - Deep Sky Blue: `#0288D1`
  - Navy Accent: `#01579B`
- **Secondary & Surface Colors**:
  - Pure White: `#FFFFFF`
  - Soothing Off-White: `#F5F9FF`
  - Light Sky Grey: `#E8F0FE`
  - Slate Grey: `#9E9E9E` / `#424242`
- **Accents**:
  - Film Heart Red: `#E74C3C` (likes & film connection)
  - Golden Creator Badge: `#FFD700`
- **Dark Mode**:
  - Background: `#1A1A2E`
  - Card Surfaces: `#242526`
  - Text: `#F5F0EB`

---

## ✨ Features

1. **Custom 16:9 Video Player Engine**:
   - Custom overlay controls with auto-hide on inactivity.
   - Interactive scrubber / seek bar with hover timestamp tooltip and buffered indicator.
   - Elapsed / Total time display.
   - Volume slider with mute toggle.
   - Playback speed switcher (0.5x, 0.75x, 1.0x, 1.25x, 1.5x, 2.0x).
   - Closed Captions [CC] with synchronized sign language gloss subtitles.
   - Fullscreen mode support (HTML5 Fullscreen API).
   - Keyboard shortcuts:
     - `Space` / `K` — Play / Pause
     - `J` / `L` — Skip 10s backward / forward
     - `Left` / `Right` Arrow — Skip 5s backward / forward
     - `Up` / `Down` Arrow — Adjust volume
     - `M` — Mute / Unmute
     - `F` — Fullscreen toggle
     - `C` — Subtitles / CC toggle

2. **Interactive 6-Lesson Sign Language Playlist**:
   - **Lesson 1**: The Language of Silence (1.2M views)
   - **Lesson 2**: Greetings Without Sound (980K views)
   - **Lesson 3**: Family in Fingertips (876K views)
   - **Lesson 4**: Emotions in Gestures (754K views)
   - **Lesson 5**: Daily Life in Signs (621K views)
   - **Lesson 6**: Advanced Conversations (543K views)
   - *Autoplay next lesson switch and dynamic metadata updating.*

3. **Rich Thematic Comments & Community**:
   - 50+ pre-populated poetic comments matching the story world (*SilentListener_42*, *VoiceWithin*, *SoulConnection*, *TheQuietOne*, etc.).
   - Post new comments in real-time as Reyansh.
   - Heart like counter toggles and expandable reply inputs.
   - Sort comments by Top / Newest.

4. **Search & Exploration**:
   - Real-time search with live dropdown suggestions for lessons and thematic channels.
   - Horizontal category filter pills (All, Beginner Level, 60 Sentences Series, Emotions, Film Official).

5. **Collapsible Sidebar Drawer & Thematic Channels**:
   - Hamburger button opens drawer with smooth animation and backdrop blur.
   - Channel list with live indicators (*The Silent Classroom*, *Words Unspoken*, *Beyond Silence*, *Gestures & Grace*, *The Deaf Collective*, *Echoes of Hope*, *Hear With Your Eyes*, *Silent Voices Academy*, *The Unheard Orchestra*, *Fingers That Speak*).

---

## 🚀 How to Launch & Configure Videos (Google Drive / GitHub)

### 1. Configure Video Links via `videos.json`:
Because large video files cannot be uploaded directly to GitHub, you can host your videos on **Google Drive**, **Dropbox**, **Cloudinary**, or any CDN, and simply paste their links into [`videos.json`](file:///e:/I%20Am%20Here%20-%20Short%20Film/MeTube/Raw/videos.json):

```json
{
  "mainVideo": {
    "title": "Sign Language Class — Lesson 1: Learn 60 Sentences",
    "videoUrl": "https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/view?usp=sharing",
    "poster": "assets/thumbnails/main_poster.jpg"
  },
  "playlist": [
    {
      "id": "lesson-1",
      "title": "Lesson 1: The Language of Silence",
      "videoUrl": "https://drive.google.com/file/d/YOUR_GOOGLE_DRIVE_FILE_ID/view?usp=sharing",
      "timestamp": 0,
      "thumbnail": "assets/thumbnails/thumb_lesson1.jpg"
    }
  ]
}
```

> **Note on Google Drive Links**:
> You can paste standard Google Drive sharing links directly (`https://drive.google.com/file/d/ID/view?usp=sharing`). Make sure the sharing permission is set to **"Anyone with the link can view"**. The app automatically formats it into a streaming URL!

### 2. Launch Local Server:
```bash
# Using python built-in server
python -m http.server 8080
```
Then visit `http://localhost:8080` in your browser.

