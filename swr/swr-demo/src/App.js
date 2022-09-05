import { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

function App() {
  const [id, setId] = useState(1)
  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${id}`,
    fetcher
  )
  const { data: data2, error: error2 } = useSWR(() => {
    return data?.id
      ? `https://jsonplaceholder.typicode.com/users/${data?.id}/todos`
      : `https://jsonplaceholder1.typicode.com/todos`
  }, fetcher)

  // if (error) return <div>failed to load</div>
  // if (!data) return <div>loading...</div>
  console.log('error', error)
  return (
    <div>
      <h1>SWR</h1>

      <div>
        <button onClick={() => setId(1)}>1</button>
        <button onClick={() => setId(2)}>2</button>
        <button onClick={() => setId(3)}>3</button>
      </div>

      <div>
        {error ? 'failed to load' : data ? JSON.stringify(data) : 'loading...'}
      </div>

      <div>
        {error2
          ? 'failed to load'
          : data2
          ? JSON.stringify(data2)
          : 'loading...'}
      </div>
    </div>
  )
}

export default App
