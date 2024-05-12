export interface Response<T> {
  status: 'success' | 'failure' | 'error'
  data: T
}
