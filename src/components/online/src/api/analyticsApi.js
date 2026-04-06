import client from './client'

export const getAnalytics = async () => {
  const { data } = await client.get('/analytics')
  return data
}
