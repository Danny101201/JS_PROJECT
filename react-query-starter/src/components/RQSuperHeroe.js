import React from 'react'
import { useParams } from 'react-router'
import { useCustomerQueryDetails } from '../Hook/useCustomerQueryDetails'
export function RQSuperHeroe() {
    const { id } = useParams()
    console.log(id)
    const { data, isLoading, isError, error, isFetching } = useCustomerQueryDetails(id)
    if (isLoading || isFetching) {
        return <h1>isLoading</h1>
    }
    if (isError) {
        return <h1>{error.message}</h1>
    }
    return (
        <div>
            {data?.data.name} - {data?.data.alterEgo}
        </div>
    )
}


