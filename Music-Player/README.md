# Spotube Music Player Website

## Overview

This music player allows users to browse and play songs from different folders (albums) organized inside a `songs` directory on the server. It displays song lists dynamically and provides playback controls with song info and progress.

---

## Features

### 1. Folder-Based Song Browsing

- Click on a music album card (e.g., **Happy Hits**) to load the list of songs from that folder.
- The folder name corresponds to a subdirectory inside the `songs` folder on the server.
- Songs are fetched dynamically from the server directory and displayed in the **Your Library** section.

### 2. Dynamic Song List Display

- Songs from the selected folder are displayed as a list with:
  - Song title
  - Artist name (extracted from the filename)
  - Play button for each song
- Only `.mp3` files from the folder are considered.

### 3. Audio Playback

- Clicking a song in the list plays it instantly.
- Playback uses the HTML Audio API.
- Current playing song information is displayed in the player bar.
- Shows current time and duration of the playing song, updated in real-time.
- Play/pause toggle with icons.

### 4. Progress Bar & Seeking

- A seek bar shows the current playback progress.
- Users can click on the seek bar to jump to any position in the song.

### 5. Volume Control

- Volume slider lets users adjust playback volume on the fly.

### 6. Previous/Next Controls

- Buttons to navigate to previous and next songs in the current playlist.

### 7. Visual Enhancements

- A "disco" effect changes the background color of song info and time dynamically during playback.

---

## Setup & Usage

1. Make sure your music files are organized in folders under the `/songs` directory on your server.

2. Run a local server on `http://127.0.0.1:3000/` (or update URLs accordingly).

3. Open `index.html` in a modern browser.

4. Click on any album card to load songs.

5. Click on any song to play it.

---

## Future Improvements

- **Responsiveness:** Add media queries to make the layout adapt smoothly on different screen sizes (mobile, tablet, desktop).
- **Playlist Management:** Allow creating, saving, and managing custom playlists.
- **Search Functionality:** Add a search bar to filter songs and albums.
- **Better UI/UX:** Add animations, loading indicators, and improved icons.
- **Error Handling:** Gracefully handle missing or corrupted audio files.
- **Download Support:** Cache songs for offline playback.


---


## 🖼️ Screenshots
<img width="1916" height="927" alt="Screenshot 2025-07-28 152941" src="https://github.com/user-attachments/assets/efb8d615-0f5b-4b28-bf49-9a7bd31a3f24" />

<img width="1392" height="830" alt="Screenshot 2025-07-28 152951" src="https://github.com/user-attachments/assets/e7acdae1-f010-4aae-a858-7a21dbdb97bf" />

<img width="1439" height="96" alt="Screenshot 2025-07-28 153012" src="https://github.com/user-attachments/assets/7f9295ca-498a-49f2-aaee-2a5cc3e4f289" />
<img width="422" height="927" alt="Screenshot 2025-07-28 153025" src="https://github.com/user-attachments/assets/bc1b630b-78f7-4e09-a9a7-79ee8795ef3b" />
