import axios, { AxiosError, isAxiosError, type AxiosResponse } from 'axios'
import type { ApiResponse } from '../types/api'

export type Query = Record<string, string | boolean | number | undefined | null>

function onFulfilled<T>(response: AxiosResponse<T>): AxiosResponse<T> {
  return response
}

function onRejected(error: Error | AxiosError) {
  if (isAxiosError(error) && error.response) {
    const { response } = error
    const { status } = response

    if ([403, 401].includes(status)) {
      const currentPath = window.location.pathname
      
      if (!currentPath.includes('/auth/')) {
        
        window.location.href = '/auth/login'
        
        console.warn('Sessão expirada. Por favor, faça login novamente.')
      }
    }

    if (status >= 500) {
      console.error('Erro no servidor:', error.response?.data)
    }
  } else {
    console.error('Erro de conexão:', error.message)
  }

  return Promise.reject(error)
}


const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 30000, // 30s
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})


request.interceptors.request.use(
  async (config) => {

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(onFulfilled, onRejected)

export function unwrapApiResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
  if (!response.data.success) {
    throw new Error(response.data.error || 'Request failed')
  }
  return response.data.data as T
}

export default {
  get: request.get,
  delete: request.delete,
  post: request.post,
  put: request.put,
  patch: request.patch,

  postForm: request.postForm,
  patchForm: request.patchForm,

  getWithParams: <T>(url: string, params?: Query) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params || {}).filter(([_, v]) => v != null)
    )
    return request.get<T>(url, { params: cleanParams })
  },

  instance: request,
}