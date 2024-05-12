import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const getImages = async () => {
  const response = await axios.get('/images').then((res) => res.data)
  return response.data
}

export const useImagesQuery = () => {
  return useQuery({ queryKey: ['images'], queryFn: getImages })
}
