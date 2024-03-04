import { desktopCapturer, screen } from "electron"

export const getScreenshot = (): Promise<Buffer | null> => {
  return new Promise((resolve) => {
    desktopCapturer
      .getSources({ types: ["screen"], thumbnailSize: screen.getPrimaryDisplay().workAreaSize })
      .then((sources) => {
        resolve(sources[0].thumbnail.toPNG())
      }).catch(() => {
        resolve(null)
      })
  })
}
