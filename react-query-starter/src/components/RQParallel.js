import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
export function RQParallel() {
    const fetchSuperheroes = () => {
        return axios.get('http://localhost:4000/superheroes')
    }
    const fetchFriends = () => {
        return axios.get('http://localhost:4000/friends')
    }
    const { data: SuperHero } = useQuery('SuperHero', fetchSuperheroes, {
        cacheTime: 3000
    })
    const { data: friends } = useQuery('friends', fetchFriends)
    
    return (
        <div>
            RQParallel
        </div>
    )
}


