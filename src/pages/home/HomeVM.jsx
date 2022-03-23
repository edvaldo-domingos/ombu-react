import { useState } from "react";
import { BASE_URL } from "../../utils/constants";

function HomeVM() {
  const [error, setError] = useState(null);
  const [joke, setJoke] = useState(null);

  const mapJokeResponseFromApi = (joke) => {
    switch (joke.type) {
      case "twopart":
        setJoke(`${joke.setup}, ${joke.delivery}`);
        break;
      default:
        setJoke(`${joke.joke}`);
        break;
    }
  };

  const fetchRandomJoke = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      mapJokeResponseFromApi(data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    fetchRandomJoke,
    joke,
  };
}

export default HomeVM;
