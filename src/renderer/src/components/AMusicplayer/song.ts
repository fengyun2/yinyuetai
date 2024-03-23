export interface Song {
  name: string
  artist?: string
  url: string
  cover?: string
  lrc?: string
  theme?: string
}
const songs: Song[] = [
  {
    name: '云烟成雨',
    artist: '云烟成雨',
    url: './aplayer/云烟成雨-房东的猫.mp3',
    cover: './aplayer/云烟成雨-房东的猫.webp',
    lrc: './aplayer/云烟成雨-房东的猫.lrc',
    theme: '#ebd0c2'
  },
  {
    name: 'New Boy',
    artist: 'New Boy',
    url: './aplayer/New Boy-房东的猫.mp3',
    cover: './aplayer/New Boy-房东的猫.webp',
    lrc: './aplayer/New Boy-房东的猫.lrc',
    theme: '#ebd0c2'
  }
]

export default songs
