import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

const fetchUserByEmail = function ({ queryKey }) {
    const email = queryKey[1]
    return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = function ({ queryKey }) {
    const channelId = queryKey[1]
    return axios.get(`http://localhost:4000/channels/${channelId}`)
}
export function DependentQuery({ email }) {
    const { data: user } = useQuery(['user', email], fetchUserByEmail, {
        cacheTime: 2000
    })
    const channelId = user?.data.channelId
    const { data: channel } = useQuery(['channel', channelId], fetchCoursesByChannelId, {
        enabled: !!channelId
    })
    console.log(channel)
    return (
        <div>
            {channelId}
        </div>
    )
}


