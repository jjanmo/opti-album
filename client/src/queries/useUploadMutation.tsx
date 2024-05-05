import { useMutation } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'

interface PostImagePayload {
  url: string
  data: FormData
  options?: AxiosRequestConfig
}

export const postImage = (payload: PostImagePayload) => {
  const { url, data, options } = payload
  return axios.post(url, data, { ...options })
}

export const usePostUploadImageMutation = () => {
  return useMutation({
    mutationFn: postImage,
    onSuccess: () => {
      console.log('Image uploaded successfully')
    },
  })
}
