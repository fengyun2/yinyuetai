import 'APlayer/dist/APlayer.min.css'
import APlayer from 'APlayer'
import { useEffect, useState, useRef } from 'react'
import songData, { Song } from './song'

const MusicPlayer = (): JSX.Element => {
  const [musics, setMusics] = useState(songData)
  const player = useRef<APlayer>()
  const ipcHandleScanMP3 = (): void => {
    window.electron.ipcRenderer.invoke('scanMP3').then((data: Song[]) => {
      console.log(data, 'receive scanMP3')
      setMusics([...musics, ...data])
      player.current.list.add(data)
    })
  }

  function initPlay(): void {
    const options = {
      element: document.querySelector('.music-player'),
      mini: false,
      autoplay: false,
      lrcType: 3,
      volume: 0.7,
      // order: 'random',
      // loop: 'all',
      mutex: true,
      preload: 'metadata',
      listFolded: false,
      listMaxHeight: 90,
      audio: musics
    }
    player.current = new APlayer(options)

    if (player.current) {
      player.current.on('play', () => {
        console.log('play')
      })
      player.current.on('pause', () => {
        console.log('pause')
      })
      player.current.on('ended', () => {
        console.log('ended')
      })
    }
  }
  useEffect(() => {
    initPlay()
  }, [])

  return (
    <div>
      <div className="music-player"></div>
      <button className="btn" onClick={ipcHandleScanMP3}>
        扫描歌曲
      </button>
    </div>
  )
}

export default MusicPlayer
