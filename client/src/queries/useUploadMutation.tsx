import { useMutation } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'

export interface PostImagePayload {
  data: FormData
  options?: AxiosRequestConfig
}

export const postImage = (payload: PostImagePayload) => {
  const { data, options } = payload
  return axios.post('/images', data, { ...options })
}

export const usePostUploadImageMutation = () => {
  return useMutation({
    mutationFn: postImage,
  })
}
