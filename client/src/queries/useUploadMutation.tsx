import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: postImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] })
    },
  })
}
