import React from 'react'
import { useQueries } from 'react-query'
import axios from 'axios'
export function DynamicParallel({ heroIds }) {
    const fetchSuperheroes = (id) => {
        return axios.get(`http://localhost:4000/superheroes/${id}`)
    }
    const queryResult = useQueries(
        heroIds.map(heroId => {
            return {
                queryKey: ['SuperHero', heroId],
                queryFn: () => fetchSuperheroes(heroId),
                enabled: true
            }
        })
    )
    console.log(queryResult)
    return (
        <div>
            DynamicParallel
        </div>
    )
}


