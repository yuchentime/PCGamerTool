import fs from 'fs'

export const copyFileToFoler = (saveFile: string, newSaveFolder: string) => {
  console.log('file: ', saveFile)
  console.log('newSaveFolder: ', newSaveFolder)
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(saveFile) || !fs.existsSync(newSaveFolder)) {
      reject('File or directory is not exists')
    }
    fs.copyFile(saveFile, newSaveFolder, (err) => {
      if (err) {
        reject(err)
      } else {
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
        resolve('ok')
      }
    })
  })
}
