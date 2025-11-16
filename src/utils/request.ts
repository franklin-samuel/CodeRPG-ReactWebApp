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
      const isPublicRoute = currentPath.includes('/auth/') || currentPath === '/onboarding'
      
      if (!isPublicRoute) {
        console.warn('Sessão expirada. Redirecionando para login...')
        window.location.href = '/hello'
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
  baseURL: 'https://coderpg-backend.onrender.com/api',
  timeout: 30000,
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

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