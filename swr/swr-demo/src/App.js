import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

function App() {
  const [id, setId] = useState(1);
  const { data, error, mutate, isValidating } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    fetcher,
    {
      revalidateOnFocus: false,
    }
  );

  return (
    <div>
      <h1>SWR</h1>

      <div>
        <button onClick={() => setId(1)}>1</button>
        <button onClick={() => setId(2)}>2</button>
        <button onClick={() => setId(3)}>3</button>
      </div>

      <div>
        {error ? "failed to load" : data ? JSON.stringify(data) : "loading..."}
      </div>

      <br />
      {/* <div>
        {error2
          ? "failed to load"
          : data2
          ? JSON.stringify(data2)
          : "loading..."}
      </div> */}

      <div>
        <button
          onClick={() => {
            mutate(
              () => {
                return fetch("https://jsonplaceholder.typicode.com/posts/1", {
                  method: "PUT",
                  body: JSON.stringify({
                    id: 1,
                    title: "foo",
                    body: "bar",
                    userId: 1,
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                  },
                }).then((response) => response.json());
              },
              {
                populateCache: false,
                // revalidate: false,
              }
            );
          }}
        >
          mutate {isValidating ? "..." : ""}
        </button>
      </div>
    </div>
  );
}

export default App;
