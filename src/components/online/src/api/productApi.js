import client from './client'

export const getProducts = async () => {
  const { data } = await client.get('/products')
  return data
}

export const getProductById = async (id) => {
  const { data } = await client.get(`/products/${id}`)
  return data
}
