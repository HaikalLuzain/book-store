import Axios from 'axios'

const url = 'http://localhost:5000'

export const API = Axios.create({
  baseURL: `${url}/api`,
  withCredentials: true,
})

API.interceptors.request.use(
  (config) => {
    const { origin } = new URL(config.url, url)
    const allowedOrigins = [url]
    const token = localStorage.getItem('token')

    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

API.interceptors.response.use(
  (succes) => succes,
  (err) => {
    if (err.response && err.response.data) {
      if (
        err.response.status === 401 &&
        document.location.pathname !== '/login'
      ) {
        localStorage.clear()
        document.location.pathname = '/login'
      }
      // eslint-disable-next-line
      throw { ...err.response.data, code: err.response.status }
    }
    throw err
  }
)

export const Api = () => {
  return API
}
