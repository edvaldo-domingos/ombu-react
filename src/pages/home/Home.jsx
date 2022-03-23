import { useEffect } from "react";
import HomeVM from "./HomeVM";

function Home() {
  const { joke, fetchRandomJoke } = HomeVM();
  useEffect(() => {
    fetchRandomJoke();
  }, []);

  console.log(joke);
  return <div style={{ marginTop: "100px" }}></div>;
}

export default Home;
