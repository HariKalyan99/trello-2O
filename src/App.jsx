import { useEffect } from 'react';
import './App.css'
import { useState } from 'react';
import axios from 'axios';

let APIKey = import.meta.env.VITE_APIKEY;
let APIToken = import.meta.env.VITE_APITOKEN;

function App() {
  const [getData, setData] = useState([]);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    const fetchBoards = async () => {
      try {
        const { data } = await axios.get(
          `https://api.trello.com/1/members/me/boards?key=${APIKey}&token=${APIToken}`,
          {
            signal,
          }
        );
        console.log(data);
        setData(data);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.warn(error);
        }
      }
    };

    fetchBoards();

    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>
      {getData.map((data, _) => <h1 key={data.id}>{data.name}</h1>)}
    </div>
  )
}

export default App
