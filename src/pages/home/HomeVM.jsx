import { useState } from "react";
import { BASE_URL, BASE_URL_V2, LIKE } from "../../utils/constants";

function HomeVM() {
  const [error, setError] = useState(null);
  const [joke, setJoke] = useState({});
  const [likedJokes, setLikedJokes] = useState({});
  const [deslikedJokes, setDeslikedJokes] = useState({});
  const [numOdRetries, setNumOdRetries] = useState(0);
  const [showLikedJokes, setShowLikedJokes] = useState(false);
  const [categories, setCategories] = useState([]);
  const [language, setLanguage] = useState("");
  const [types, SetTypes] = useState([]);
  const [search, setSearch] = useState("");

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

  const getUrl = () => {
    let url = `${BASE_URL_V2}`;
    const safeMode = "safe-mode";

    // "https://v2.jokeapi.dev/joke/ Any?safe-mode"

    if (categories?.length > 0) {
      categories.forEach((category, index) => {
        const isLastItem = index === categories.length - 1;
        url += category;
        if (!isLastItem) {
          url += `,`;
        }
      });
    } else {
      url += `Any`;
    }

    if (language) {
      url += `?lang=${language}`;
    } else {
      url += `?lang=en`;
    }

    if (types.length === 1) {
      const onlyType = types[0];
      url += `&type=${onlyType}`;
    }

    if (search) {
      url += `&contains=${search}`;
    }

    if (language || search || types.length === 1) {
      url += `&${safeMode}`;
    } else {
      url += `?${safeMode}`;
    }

    console.log(url);
  };

  const onClickLikeJoke = async () => {
    if (joke?.id) {
      setLikedJokes({ ...likedJokes, [joke.id]: joke });
    }

    await fetchRandomJoke();

    const numberOfRetries = 5;

    for (let start = 0; start < numberOfRetries; start++) {
      if (!likedJokes[joke.id] || !deslikedJokes[joke.id]) break;
      await fetchRandomJoke();
    }
  };

  const onClickDeslikeJoke = async () => {
    if (joke?.id) {
      setDeslikedJokes({ ...deslikedJokes, [joke.id]: joke });
    }

    await fetchRandomJoke();
    const numberOfRetries = 5;

    for (let start = 0; start < numberOfRetries; start++) {
      if (!deslikedJokes[joke.id] || !likedJokes[joke.id]) break;
      await fetchRandomJoke();
    }
  };

  const onClickShowLikedJokes = () => {};

  const deleteJoke = (clickedJoke) => {
    const newJokes = { ...likedJokes };
    delete newJokes[clickedJoke.id];
    setLikedJokes(newJokes);
  };

  const onClickSearch = () => {
    const url = getUrl();
    // fetchRandomJoke()
  };

  return {
    fetchRandomJoke,
    joke,
    likedJokes,
    setLikedJokes,
    onClickLikeJoke,
    onClickDeslikeJoke,
    onClickShowLikedJokes,
    setShowLikedJokes,
    showLikedJokes,
    deleteJoke,
    categories,
    setCategories,
    onClickSearch,
    language,
    setLanguage,
    types,
    SetTypes,
    search,
    setSearch,
  };
}

export default HomeVM;
