import React, { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
const fetChColor = function (page) {
    // return axios.get(`http://localhost:4000/colors?_limit=2&_page=${page}`)
    return axios.get(`http://localhost:4000/colors`, {
        params: {
            _limit: 2,
            _page: page
        }
    })
}
export function PaginatedQuery() {
    const [page, setPage] = useState(1)
    const { isLoading, isError, isFetching, error, data } = useQuery(['color', page], () => fetChColor(page), {
        keepPreviousData: true
    })

    if (isError) return <div>{error.message}</div>
    if (isLoading) return <h1>Loading</h1>
    return (
        <>
            <div>
                {data?.data.map(color => {
                    return (
                        <div key={color.id}>
                            <h2>
                                {color.id} - {color.label}
                            </h2>
                        </div>
                    )
                })}
            </div>
            <div>
                <button onClick={() => setPage(pre => pre - 1)} disabled={page === 1}>Prev Page</button>
                <button onClick={() => setPage(pre => pre + 1)} disabled={page === 5}> Next Page</button>
            </div>
            {isFetching && <p>isLoading</p>}
        </>
    )
}


