// 声明空间的类型
declare global {
  export type SaveRecord = {
    id: string
    gameId: string
    filePath: string
    createdAt: number
    comment: string
  }
}

export {}