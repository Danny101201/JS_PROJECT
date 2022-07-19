import React, { Fragment } from 'react'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'

const fetchColor = ({ pageParam = 1 }) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}
export function InfiniteQuery() {
    const {
        data, error,
        isLoading, isError, isFetching, isFetchingNextPage,
        fetchNextPage, hasNextPage
    } = useInfiniteQuery(
        ['colors'],
        fetchColor,
        {
            getNextPageParam: (lastPage, allPages) => {
                if (allPages.length < 4) {
                    return allPages.length + 1
                } else {
                    return undefined
                }
            },
        }
    )
    if (isLoading) return <h1>Loading...</h1>
    if (isError) return <h1>{error.message}</h1>
    console.log(data.pages)
    return (
        <>
            <div>
                {data?.pages.map((group, i) => {
                    return (
                        <Fragment key={i}>
                            {group.data.map(color => {
                                return (
                                    <h2>{color.id} - {color.label}</h2>
                                )
                            })}
                        </Fragment>
                    )
                })}
            </div>
            <div>
                <button disabled={!hasNextPage} onClick={fetchNextPage}>
                    Load More
                </button>
            </div>
            <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
        </>
    )
}

