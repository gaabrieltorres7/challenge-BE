export type CreateUserDTO = {
  name: string
  email: string
  password_hash: string
}

export type CreatedUserDTO = {
  id: string
  created_at: Date
  updated_at: Date
  type: 'ADMIN' | 'CLIENT'
  is_confirmed: boolean
} & CreateUserDTO

export type UserLoginDTO = {
  email: string
  password: string
}
