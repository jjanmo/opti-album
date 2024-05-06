import { useMutation } from '@tanstack/react-query'
import axios, { AxiosRequestConfig } from 'axios'
import { toast } from 'react-toastify'

export interface PostImagePayload {
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
      toast.success('Image upload successful 🎉')
      // TODO : add invalidateQueries to fetch images
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
}
