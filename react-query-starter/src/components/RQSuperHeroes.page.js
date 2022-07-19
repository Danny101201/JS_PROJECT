import { useState } from 'react';
import { useQuery } from 'react-query'
import { ToastContainer, toast } from 'react-toastify';
import { useCustomerQuery, useAddSuperHeroData } from '../Hook/useCustomerQuery'
import { Link } from 'react-router-dom'
export const RQSuperHeroesPage = () => {
  const [name, setName] = useState('')
  const [alterEgo, setAlertEgo] = useState('')

  const handleAddHero = () => {
    const hero = { name, alterEgo }
    addSuperHero(hero)
  }
  const onSuccess = function (data) {
    toast.success(`done`, {
      // autoClose: false,
      icon: "🚀"
    })
  }
  const onError = function (error) {
    toast(error.message)
  }
  const { isLoading, data, isError, error, isFetching, refetch } = useCustomerQuery(onSuccess, onError)

  const { mutate: addSuperHero, isLoading: postLoading } = useAddSuperHeroData()
  if (isLoading ) {
    return <h2>Loading...</h2>
  }
  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <h2>RQSuper Heroes Page</h2>
      <form onClick={e => e.preventDefault()}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        <input type="text" value={alterEgo} onChange={e => setAlertEgo(e.target.value)} />
        <button onClick={handleAddHero} disabled={postLoading}>Add Hero</button>
      </form>
      <button onClick={refetch} >reFetch Data</button>
      {data?.data.map(hero => {
        return (
          <div key={hero.id}>
            <Link style={{ textDecoration: 'none' }} to={`/rq-super-heroes/${hero.id}`}>
              {hero.name}
            </Link>
          </div>
        )
      })}

      {/* select data */}
      {/* {data && data.map(heroName => {
        return <div key={heroName}>{heroName}</div>
      })} */}
    </>
  )
}
