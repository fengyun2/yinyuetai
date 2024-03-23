import { dialog } from 'electron'
import * as fs from 'node:fs'
import * as path from 'node:path'
import glob from 'fast-glob'
import * as jsmediatags from 'jsmediatags'

interface Song {
  name: string
  artist?: string
  url: string
  cover?: string
  lrc?: string
  theme?: string
}

const FILTER_FILE_EXTS = ['mp3']
// const FILTER_FILE_EXTS = ['mp3', 'flac']
// properties: ['openFile', 'openDirectory', 'multiSelections']
/**
 * 打开指定文件夹的mp3文件
 * @returns string[]
 */
export async function handleFileOpen(): Promise<Song[]> {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: 'music', extensions: FILTER_FILE_EXTS }],
    properties: ['openFile', 'multiSelections']
  })
  // console.log(filePaths, ' handleFileOpen ====>')
  if (canceled) {
    return []
  } else {
    return getMP3Files(filePaths)
    // return filePaths
  }
}

async function getMP3Files(filePaths: string[]): Promise<Song[]> {
  const mp3Files = []
  filePaths.forEach((filePath) => {
    try {
      const stats = fs.statSync(filePath)
      if (stats.isDirectory()) {
        const files = fs.readdirSync(filePath)
        files.forEach((file) => {
          // const fileExt = path.extname(file)
          if (file.endsWith('.mp3')) {
            mp3Files.push(filePath + '/' + file)
          }
        })
      } else if (stats.isFile()) {
        if (filePath.endsWith('.mp3')) {
          mp3Files.push(filePath)
        }
      }
    } catch (error) {
      console.error(error, '遍历文件夹报错')
    }
  })
  console.warn(mp3Files, ' mp3Files =====>')
  for (const file of mp3Files) {
    new jsmediatags.Reader(file).read({
      onSuccess: function (tag) {
        console.warn(tag, 'tag')
      },
      onError: function (error) {
        console.error(error, '读取mp3文件报错')
      }
    })
  }
  return mp3Files?.map((file) => ({
    name: path.basename(file),
    artist: path.basename(file),
    url: file,
    theme: '#ebd0c2'
  }))
}
