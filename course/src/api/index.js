import axios from "axios"
const api = axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    Authorization: 'Bearer 2eeefa9f920ccf6f9ce5391567d5c3ee6ee1770d252c2f4aadeec1a77746efd1'
  }
})
export const addNewPost = async ({ title, body }) => {
  try {
    const { data } = await api.post(
      'users/134/posts',
      { title, body },
    )
    return data
  } catch (err) {
    throw new Error(err.response.statusText)``
  }
}
export const updateNewPost = async ({ title, body, id }) => {
  try {
    const { data } = await api.patch(
      `/posts/${id}`,
      { title, body },
      {
        headers: {
          Authorization: 'Bearer 2eeefa9f920ccf6f9ce5391567d5c3ee6ee1770d252c2f4aadeec1a77746efd1'
        }
      }
    )
    return data
  } catch (err) {
    throw new Error(err.response.statusText)``
  }
}
export const deletePost = async ({ id }) => {
  try {
    const { data } = await api.delete(`posts/${id}`,
      {
        headers: {
          Authorization: 'Bearer 2eeefa9f920ccf6f9ce5391567d5c3ee6ee1770d252c2f4aadeec1a77746efd1'
        }
      }
    )
    return data
  } catch (err) {
    throw new Error("unable fetch Posts")
  }
}
export const fetchPosts = async (pageId) => {
  try {
    const { data } = await api.get(`posts?page=${pageId}`)
    return data
  } catch (err) {
    throw new Error("unable fetch Posts")
  }
}
export const fetchPost = async (pageId) => {
  try {
    const { data } = await api.get(`posts/${pageId}`)
    return data
  } catch (err) {
    throw new Error("unable fetch Posts")
  }
}