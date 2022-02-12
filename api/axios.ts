import a from 'axios'

const axios = a.create({
  baseURL: 'https://secure-lowlands-89584.herokuapp.com/api/',
  // baseURL: 'http://127.0.0.1:8000/api/',
})

export default axios
