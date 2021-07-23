import { httpService } from './http.service'
import * as storageService  from './storage.service'

export const register = ({ username, email, password, role}) => {
  return httpService.post('auth/signup', {
    username, email, password, role
  })

}

export const logIn = ({ email, password }) => {
 return httpService.post('auth/signin', {
    email, password
 })
}

export const getUser = () => {
  return httpService.post('auth/get_user')

}
  
export const logOut = () => {
  return storageService.removeStorage('token')
}

export const passwordReset = () => {
  return httpService.put('users/password')
}

export const getCompany = ({ identify }) => {
  return httpService.post('auth/get_company', {identify})
}
