const image = document.querySelector('img')
const music = document.querySelector('audio')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

const songs = [
    {
        name: 'artist-1',
        displayName: 'Track 1',
        artist: 'Artist 1',
    },
    {
        name: 'artist-2',
        displayName: 'Track 2',
        artist: 'Artist 2',
    },
    {
        name: 'artist-3',
        displayName: 'Track 3',
        artist: 'Artist 3',
    },
    {
        name: 'artist-4',
        displayName: 'Track 4',
        artist: 'Artist 4',
    },
    {
        name: 'artist-5',
        displayName: 'Track 5',
        artist: 'Artist 5',
    },
    {
        name: 'artist-6',
        displayName: 'Track 6',
        artist: 'Artist 6',
    },
    {
        name: 'artist-7',
        displayName: 'Track 7',
        artist: 'Artist 7',
    },
]

let isPlaying = false

const playSong = () => {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

const pauseSong = () => {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}    

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

const loadSong = (song) => {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `sounds/${song.name}.mp3`
    image.src =`img/${song.name}.jpg`
}

let songIndex = 0

const prevSong = () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

const nextSong = () => {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

loadSong((songs[songIndex]))

const updateProgressBar = (e) => {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

const setProgressBar = (e) => {
    const width = this.clientWidth
    const clickX = e.offsetX
    const { duration } = music
    music.currentTime = (clickX / width) * duration
}

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
music.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)