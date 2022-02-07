import { useUserStore } from '../../stores/userStore'
import { User } from '../../types'
import axios from '../axios'

const resource = 'users'

export interface LoginRequestBody {
  username: string
  password: string
}

export const login = (body: LoginRequestBody) =>
  axios
    .post<User>(`${resource}/login`, body)
    .then((res) => res.data)
    .then((user) => useUserStore.setState({ user }))

export interface SignupRequestBody {
  username: string
  password: string
  confirm_password: string
}

export const signup = (body: SignupRequestBody) =>
  axios.post<User>(`${resource}/signup`, body).then((res) => res.data)
