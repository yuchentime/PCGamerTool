import fs from 'fs'

export const copyFileToFoler = (saveFile: string, newSaveFolder: string, newFileName: string) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(saveFile)) {
      reject('file is not exists')
      return
    }
    if (!fs.existsSync(newSaveFolder)) {
      reject('folder is not exists')
      return
    }
    const readStream = fs.createReadStream(saveFile)
    fs.writeFileSync(newSaveFolder + '\\' + newFileName, '')
    const writeStream = fs.createWriteStream(newSaveFolder + '\\' + newFileName)
    readStream.on('data', (chunk) => {
      writeStream.write(chunk)
    })
    readStream.on('end', () => {
      writeStream.end()
    })
    // 监听可写流的 'finish' 事件，表示写入完成
    writeStream.on('finish', () => {
      resolve('ok')
    })

    // 监听可写流的 'error' 事件，处理写入错误
    writeStream.on('error', (err) => {
      console.error('写入文件时发生错误:', err)
      reject(err)
    })

    // 监听读取流的 'error' 事件，处理读取错误
    readStream.on('error', (err) => {
      console.error('读取文件时发生错误:', err)
      reject(err)
    })
  })
}

export const copyFileToFile = (originalFile: string, targetFile: string) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(originalFile)) {
      reject('file is not exists')
      return
    }
    if (!fs.existsSync(targetFile)) {
      reject('file is not exists')
      return
    }
    fs.copyFileSync(originalFile, targetFile)
    resolve('ok')
  })
}
