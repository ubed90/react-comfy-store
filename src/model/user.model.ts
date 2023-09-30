export interface User {
  user: UserData | null
  theme: string
}

interface UserData {
  id: number
  username: string
  email: string
  token?: string
}
