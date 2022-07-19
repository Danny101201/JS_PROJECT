import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_URL,
    headers: {
        Authorization: 'Bearer 2eeefa9f920ccf6f9ce5391567d5c3ee6ee1770d252c2f4aadeec1a77746efd1',
    }
})

export const fetchPosts = async ({ queryKey }) => {
    console.log(queryKey)
    try {
        const { data } = await api.get(`/users/21/posts?page=${queryKey[1]}`)
        return data
    } catch (error) {
        throw new Error("Unable to fetch Posts")
    }
}
export const fetchPostDetail = async ({ queryKey }) => {
    console.log(queryKey)
    try {
        const { data } = await api.get(`/posts/${queryKey[1]}`)
        return data
    } catch (error) {
        throw new Error("Unable to fetch Posts")
    }
}

export const addPost = async function ({ title, body }) {
    try {
        if (!title || !body) {
            console.log('plz enter title and body')
        }
        const { data } = await api.post(`/users/21/posts`, {
            title,
            body
        }, {
            headers: {
                Authorization: 'Bearer 2eeefa9f920ccf6f9ce5391567d5c3ee6ee1770d252c2f4aadeec1a77746efd1',
            }
        })
        return body
    } catch (error) {
        throw Error(error.response.statusText);
    }
}
export const updatePost = async function ({ title, body, id }) {
    try {
        if (!title || !body) {
            console.log('plz enter title and body')
        }
        const { data } = await api.patch(`/posts/${id}`, {
            title,
            body
        }, {
            headers: {
                Authorization: 'Bearer 2eeefa9f920ccf6f9ce5391567d5c3ee6ee1770d252c2f4aadeec1a77746efd1',
            }
        })
        return body
    } catch (error) {
        throw Error(error.response.statusText);
    }
}
export const deletePost = async function ({ id }) {
    try {
        const { data } = await api.delete(`/posts/${id}`, {
            headers: {
                Authorization: 'Bearer 2eeefa9f920ccf6f9ce5391567d5c3ee6ee1770d252c2f4aadeec1a77746efd1',
            }
        })
        return data
    } catch (error) {
        throw Error(error.response.statusText);
    }
}