import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import useSWR from "swr";

// import { initialize } from "./generated";
import axios from "axios";

// Can even import the generated Typescript Types if needed

const config = initialize(axios);

import { initialize } from "./generated-swr";

const { useListPets, useListPetPhotos, useShowPetById } = config.queries;

const MyComponent = () => {
  const { data, error, mutate } = useListPets(10, {
    onSuccess(data, key, config) {},
  });

  const {} = useListPetPhotos("12");
  const {} = useShowPetById("1");

  const { data: data2, mutate: mutate2 } = useSWR<string>("hi");

  return (
    <ul>
      {data?.map((pet) => (
        <li key={pet.id}>{pet.name}</li>
      ))}
      <div
        onClick={() => {
          mutate(undefined, {
            populateCache(result, currentData) {
              return result;
            },
          });
          mutate2(undefined, {});
        }}
      ></div>
    </ul>
  );
};

function App() {
  const [count, setCount] = useState(0);

  const {} = useSWR("key", fetch, {
    onSuccess: (data, key) => {},
  });

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <MyComponent />
    </div>
  );
}

export default App;
