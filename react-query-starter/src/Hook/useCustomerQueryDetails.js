import { useQuery } from 'react-query'
import axios from 'axios'

const fetchHero = function ({ queryKey }) {
    console.log(queryKey)
    const dataId = queryKey[1]
    return axios.get(`http://localhost:4000/superheroes/${dataId}`)

}

export const useCustomerQueryDetails = (dataId) => {
    return useQuery(['SuperHero', dataId], fetchHero)
}