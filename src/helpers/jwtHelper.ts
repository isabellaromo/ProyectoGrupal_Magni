import { jwtDecode } from 'jwt-decode'

export interface DecodedToken {
  sub: string
  nombreUsuario: string
  rol: string
  iat: number
  exp: number
}

export const decodeToken = (token: string): DecodedToken => {
  return jwtDecode(token)
}
