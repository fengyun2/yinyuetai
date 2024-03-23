import { useEffect, useState } from 'react'
import { Howl, Howler } from 'howler'
import './style.css'
import songsData from './songs'

interface Song {
  id: string
  title: string
  artist?: string
  url: string
  duration?: string
  cover?: string // 假设后端 API 返回歌曲封面 URL
}

const MusicPlayer = (): JSX.Element => {
  const [music, setMusic] = useState<Howl | null>(null)
  const [songs, setSongs] = useState<Song[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const fetchSongs = async (): Promise<void> => {
    try {
      // const response = await fetch('http://localhost:3000/songs')
      // const { data }: { data: Song[] } = await response.json()
      const data = songsData
      setSongs(data)
    } catch (error) {
      console.error('Error fetching songs: ', error)
    }
  }

  function playSong(songIndex: number): void {
    setCurrentSongIndex(songIndex)
    setCurrentSong(songs[songIndex])
    const sound = new Howl({
      src: [songs[songIndex].url],
      volume: volume
      // loop: true
    })
    sound.play()
    setMusic(sound)
    updateProgress()
  }

  function togglePlay(): void {
    if (music.playing()) {
      music.pause()
      setIsPlaying(false)
    } else {
      music.play()
      setIsPlaying(true)
    }
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    Howler.volume(newVolume)
  }

  function updateProgress(): void {
    // setCurrentTime(music.seek())
    // setDuration(music.duration())
    // if (music.playing()) {
    //   setTimeout(updateProgress, 1000)
    // }
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  return (
    <div className="music-player">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul className="song-list">
        {songs.map((song, index) => (
          <li
            key={song.id || index}
            onClick={() => playSong(index)}
            className={index === currentSongIndex ? 'active' : ''}
          >
            {song.title} - {song.artist}
          </li>
        ))}
      </ul>
      <div className="player-controls">
        <button onClick={togglePlay}>{isPlaying ? 'Pause' : 'Play'}</button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <div className="progress-bar">
          <div style={{ width: `${(currentTime / duration) * 100}%` }}></div>
        </div>
      </div>
      {currentSong && (
        <div className="current-song">
          <img src={currentSong.cover} alt={currentSong.title} />
          <div className="song-info">
            {currentSong.title} - {currentSong.artist}
          </div>
        </div>
      )}
    </div>
  )
}

export default MusicPlayer
