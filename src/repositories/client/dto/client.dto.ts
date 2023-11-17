export type CreateClientDTO = {
  user_id: string
  full_name: string
  contact: string
  address: string
}

export type CreatedClientDTO = {
  id: string
  status: boolean
  created_at: Date
  updated_at: Date
  // user: CreatedUserDTO
  // orders: any[]
} & CreateClientDTO

export type GetClientsDTO = {
  skip?: number
  take?: number
}

export type GetClientDTO = {
  id: string
}

export type UpdateClientDTO = {
  full_name?: string
  contact?: string
  address?: string
}
