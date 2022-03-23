import { useEffect } from "react";
import HomeVM from "./HomeVM";
import styled from "styled-components";

const StyledContainer = styled.div`
  margin-top: 20px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledRCol = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  const {
    joke,
    fetchRandomJoke,
    likedJokes,
    onClickLikeJoke,
    onClickDeslikeJoke,
    onClickShowLikedJokes,
    showLikedJokes,
    setShowLikedJokes,
  } = HomeVM();

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  Object.values(likedJokes).map((joke) => {
    console.log(joke);
    return joke;
  });

  return (
    <StyledContainer>
      <StyledRow>{joke?.description}</StyledRow>
      <StyledRow>
        <button onClick={onClickLikeJoke} name="like">
          Like
        </button>{" "}
        <button onClick={onClickDeslikeJoke} name="deslike">
          Dislike
        </button>{" "}
      </StyledRow>
      <StyledRow>
        <button
          onClick={() => setShowLikedJokes(!showLikedJokes)}
          name="show-jokes"
        >
          {showLikedJokes ? "Hide liked jokes" : " Show liked jokes"}
        </button>{" "}
      </StyledRow>
      <StyledRCol>
        {showLikedJokes &&
          Object.values(likedJokes).map((joke) => (
            <StyledRow key={joke.id}>{joke.description}</StyledRow>
          ))}
      </StyledRCol>
    </StyledContainer>
  );
}

export default Home;
