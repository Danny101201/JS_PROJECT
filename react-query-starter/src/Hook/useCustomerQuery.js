import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { request } from '../api/axios_utils'
const fetchHero = function () {
    // return axios.get('http://localhost:4000/superheroes')
    return request({ url: '/superheroes' })

}

const addSuperHero = (hero) => {
    // return axios.post('http://localhost:4000/superheroes', hero)
    return request({ url: '/superheroes', method: 'post', data: { ...hero }})
}
export const useCustomerQuery = (onSuccess, onError) => {
    return useQuery('Super-Hero', fetchHero, {

        cacheTime: 3000,
        //in 3000s will not refetch
        staleTime: 3000,
        // refetchOnMount: false, //true (default) false always
        // refetchOnWindowFocus: true,//true(default) false always

        //refetch in 2s
        // refetchInterval: 2000,
        // enabled: false,
        // refetchIntervalInBackground: true,
        onSuccess,
        onError,
        // keepPreviousData: true,
        //transform Response
        // select: (data) => {
        //     const transformData = data.data.map(hero => hero.name)
        //     return transformData
        // }
    })
}


export const useAddSuperHeroData = () => {
    const queryClient = useQueryClient()
    return useMutation(addSuperHero, {
        // onSuccess: (data) => {
        //     console.log(data)
        //     //refetch in backGround
        //     queryClient.invalidateQueries('Super-Hero')
        //     queryClient.setQueriesData('Super-Hero', oldQueryData => {
        //         return {
        //             ...oldQueryData,
        //             data: [...oldQueryData.data,
        //             data.data]
        //         }
        //     })
        // }
        onMutate: async (newData) => {
            //取消當前query
            await queryClient.cancelQueries('Super-Hero')
            const previousHeroData = await queryClient.getQueryData('Super-Hero')
            queryClient.setQueriesData('Super-Hero', oldQueryData => {
                return {
                    ...oldQueryData,
                    data: [
                        ...oldQueryData.data,
                        {
                            id: oldQueryData?.data?.length + 1,
                            ...newData
                        }
                    ]
                }
            })
            return {
                previousHeroData
            }
        },
        onError: (error, data, context) => {
            queryClient.setQueryData('Super-Hero', context.previousHeroData)
        },
        onSettled: () => {
            //錯誤處理重新refetch
            queryClient.invalidateQueries('Super-Hero')
        }
    })
}