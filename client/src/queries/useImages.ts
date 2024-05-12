import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Response } from './types'

export interface Image {
  _id: string
  key: string
  type: string
  originalName: string
  size: number
  createdAt: string
  updatedAt: string
}

export const getImages = async () => {
  const response = await axios
    .get<Response<Image[]>>('/images')
    .then((res) => res.data)
  return response.data
}

export const useImagesQuery = () => {
  return useQuery({ queryKey: ['images'], queryFn: getImages })
}
