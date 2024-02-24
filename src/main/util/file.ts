import fs from 'fs'

export const copyFileToFoler = (saveFile: string, newSaveFolder: string) => {
  const readStream = fs.createReadStream(saveFile)
  const fileName = saveFile.substring(saveFile.lastIndexOf('\\') + 1)
  fs.writeFileSync(newSaveFolder + '\\' + fileName, '')
  const writeStream = fs.createWriteStream(newSaveFolder + '\\' + fileName)
  readStream.on('data', (chunk) => {
    writeStream.write(chunk)
  })
  readStream.on('end', () => {
    writeStream.end()
  })
  // 监听可写流的 'finish' 事件，表示写入完成
  writeStream.on('finish', () => {
    console.log('文件写入完成。')
  })

  // 监听可写流的 'error' 事件，处理写入错误
  writeStream.on('error', (err) => {
    console.error('写入文件时发生错误:', err)
  })

  // 监听读取流的 'error' 事件，处理读取错误
  readStream.on('error', (err) => {
    console.error('读取文件时发生错误:', err)
  })
}
