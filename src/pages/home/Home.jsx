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
  flex-direction: row;
`;

function Home() {
  const {
    joke,
    fetchRandomJoke,
    likedJokes,
    onClickLikeJoke,
    onClickDeslikeJoke,
  } = HomeVM();

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  return (
    <StyledContainer>
      <StyledRow>{joke?.description}</StyledRow>
      <StyledRow>
        <button onClick={onClickLikeJoke}>Like</button>{" "}
        <button onClick={onClickDeslikeJoke}>Dislike</button>{" "}
      </StyledRow>
    </StyledContainer>
  );
}

export default Home;
