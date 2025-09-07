
function secondsToMinutesSeconds(seconds){
    const m=Math.floor(seconds/60)
    const rs=Math.floor(seconds%60)
    const fm=String(m).padStart(2,'0')
    const fs=String(rs).padStart(2,'0')
    return `${fm}:${fs}`;
}




async function getSongs() {
    
    let a = await fetch(`http://127.0.0.1:3000/songs/`)
    let response = await a.text();

    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = [];
    for (let i = 0; i < as.length; i++) {
        const href = as[i].getAttribute("href");
        if (href.endsWith(".mp3")) {
            songs.push(href);
        }
    }

    return songs
}
let currentSong;


function playMusic(songTitle, songs) {
    let match = songs.find(s => {
        let fileName = decodeURIComponent(s)
            .replace(/\\?songs\\?/gi, "")
            .replace(".mp3", "")
            .trim()
            .toLowerCase();

        return fileName.startsWith(songTitle.toLowerCase());
    });

    if (match) {
        if (currentSong) currentSong.pause();
        currentSong = new Audio("/songs/" + match.replace(/\\?songs\\?/gi, "").trim());
        currentSong.play();

        // Show song name
        const songInfo = document.querySelector(".songinfo");
        songInfo.innerText = match.replace(/\\?songs\\?/gi, "").replace(".mp3", "").replaceAll("%20", " ").trim();

        // Update play icon
        const play = document.getElementById("playme");
        play.src = "pause.svg";

        // Time update for progress and duration
        currentSong.addEventListener("timeupdate", () => {
            document.querySelector(".songtime").innerHTML =
                `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;

            document.querySelector(".circle").style.left =
                (currentSong.currentTime / currentSong.duration) * 100 + "%";
        });

// DISCO effect on songinfo and songtime
if (window.discoInterval) clearInterval(window.discoInterval); // clear previous interval

window.discoInterval = setInterval(() => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");

    document.querySelector(".songinfo").style.backgroundColor = randomColor;
    document.querySelector(".songtime").style.backgroundColor = randomColor;
}, 500);
currentSong.onended = () => {
    play.src = "play.svg";

    // Stop disco on end
    clearInterval(window.discoInterval);
    document.querySelector(".songinfo").style.backgroundColor = "";
    document.querySelector(".songtime").style.backgroundColor = "";
};

        
const volumeSlider = document.getElementById("volumeSlider");

// Initialize volume on load or when song changes
volumeSlider.value = 0.5; // default volume 50%

volumeSlider.addEventListener("input", () => {
    if (currentSong) {
        currentSong.volume = volumeSlider.value;
    }
});




        
        // Reset icon when ended
        currentSong.onended = () => {
            play.src = "play.svg";
        };

        console.log("✅ Now Playing:", match);
    } else {
        console.warn("❌ Song not found for title:", songTitle);
    }
}

async function main() {

   


    let songs = await getSongs("songs/happy-hits");
    console.log(songs);
    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs.slice(0, 20)) {

        let cleanName = song.replace(/\\?songs\\?/gi, "").replace(".mp3", "").replaceAll("%20", " ").trim();

        let [songTitle, songArtist] = cleanName.split("-").map(s => s.trim());

        songUL.innerHTML += `
        <li>
            <img class="invert" src="music.svg" alt="">
            <div class="info">
                <div class="songname">${songTitle || "Unknown Song"}</div>
                <div class="songmovie">${songArtist || "Unknown Artist"}</div>
            </div>
            <span id="playnow">Play</span>
            <img class="invert" src="play.svg" alt="">
        </li>`;



        
    }

document.querySelectorAll(".songList li").forEach(e => {
  e.addEventListener("click", () => {
    let songName = e.querySelector(".info .songname").innerText.trim();
    playMusic(songName,songs);
  });
});


const play = document.getElementById("playme");
play.addEventListener("click", () => {
    if (!currentSong) return; 
    if (currentSong.paused) {
        currentSong.play();
        play.src = "pause.svg";
    } else {
        currentSong.pause();
        play.src = "play.svg";
    }
});
 
 document.querySelector(".seekbar").addEventListener("click",e=>{
    let percent=e.offsetX/e.target.getBoundingClientRect().width*100 
document.querySelector(".circle").style.left = percent+ "%";
currentSong.currentTime=((currentSong.duration)*percent)/100
 })


    //  previous
 previous.addEventListener("click", () => {
    if (currentSong) currentSong.pause();
    
    const currentFile = decodeURIComponent(currentSong.src.split("/").pop());
    const index = songs.findIndex(s => decodeURIComponent(s).endsWith(currentFile));

    if (index > 0) {
        const prevTitle = decodeURIComponent(songs[index - 1])
            .replace(/\\?songs\\?/gi, "")
            .replace(".mp3", "")
            .trim();
        playMusic(prevTitle, songs);
    }
});

next.addEventListener("click", () => {
    if (currentSong) currentSong.pause();

    const currentFile = decodeURIComponent(currentSong.src.split("/").pop());
    const index = songs.findIndex(s => decodeURIComponent(s).endsWith(currentFile));

    if (index < songs.length - 1 && index !== -1) {
        const nextTitle = decodeURIComponent(songs[index + 1])
            .replace(/\\?songs\\?/gi, "")
            .replace(".mp3", "")
            .trim();
        playMusic(nextTitle, songs);
    }
});




}
main();