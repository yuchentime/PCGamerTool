/**
 * Don't show repetitive notification less than 10 seconds
 * @param key
 * @param callback
 */
export const useSlicenceHook = (key: string, callback: () => void) => {
  const lastNotificationTime = localStorage.getItem(key)
  if (!lastNotificationTime || Date.now() - Number(lastNotificationTime) > 10_000) {
    callback()
    localStorage.setItem(key, String(Date.now()))
  }
}
