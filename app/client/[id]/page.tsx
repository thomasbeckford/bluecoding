'use client'

import useSWR from 'swr'

type Props = {
  params: {
    id: string
  }
}

const fetcher = (id: string) => {
  try {
    return fetch(`https://rickandmortyapi.com/api/character/${id}`).then(
      (res) => res.json()
    )
  } catch (e) {
    return new Error("Can't fetch data")
  }
}

const CharacterDetail = (props: Props) => {
  const { params } = props
  const detail = useSWR('api/detail', () => fetcher(params?.id))

  return (
    <div>
      <h1>User Detail</h1>

      <div>
        <p>{detail?.data?.name}</p>
      </div>
    </div>
  )
}

export default CharacterDetail
