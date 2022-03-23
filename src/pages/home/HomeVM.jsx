import { useState } from "react";
import { BASE_URL } from "../../utils/constants";

function HomeVM() {
  const [error, setError] = useState(null);
  const [joke, setJoke] = useState({});
  const [likedJokes, setLikedJokes] = useState({});
  const [deslikedJokes, setDeslikedJokes] = useState({});
  const [numOdRetries, setNumOdRetries] = useState(0);

  //   category: "Spooky"
  //   delivery: "So they can keep their ghoulish figures."
  //   error: false
  //   flags: {nsfw: false, religious: false, political: false, racist: false, sexist: false, …}
  //   id: 295
  //   lang: "en"
  //   safe: true
  //   setup: "Why do ghosts go on diets?"
  //   type: "twopart"

  const mapJokeResponseFromApi = (joke) => {
    switch (joke.type) {
      case "twopart":
        setJoke({ ...joke, description: `${joke.setup}, ${joke.delivery}` });
        break;
      default:
        setJoke({ ...joke, description: joke.joke });
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

  const onClickLikeJoke = async () => {
    await fetchRandomJoke();

    while (numOdRetries < 5 && likedJokes[joke.id]) {
      setNumOdRetries(numOdRetries++);
      await fetchRandomJoke();
    }

    setNumOdRetries(0);
    setLikedJokes({ ...likedJokes, [joke.id]: joke.id });
  };

  const onClickDeslikeJoke = async () => {
    await fetchRandomJoke();

    while (numOdRetries < 5 && deslikedJokes[joke.id]) {
      setNumOdRetries(numOdRetries++);
      await fetchRandomJoke();
    }

    setNumOdRetries(0);
    setLikedJokes({ ...likedJokes, [joke.id]: joke.id });
  };

  return {
    fetchRandomJoke,
    joke,
    likedJokes,
    setLikedJokes,
    onClickLikeJoke,
    onClickDeslikeJoke,
  };
}

export default HomeVM;
