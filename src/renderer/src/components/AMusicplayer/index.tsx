import 'APlayer/dist/APlayer.min.css'
import APlayer from 'APlayer'
import { useEffect } from 'react'
import songData from './song'

const MusicPlayer = (): JSX.Element => {
  useEffect(() => {
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
      audio: songData
    }
    const player = new APlayer(options)

    player.on('play', () => {
      console.log('play')
    })
  }, [])

  return <div className="music-player"></div>
}

export default MusicPlayer
