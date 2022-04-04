import { useEffect } from "react";
import HomeVM from "./HomeVM";
import styled from "styled-components";
import { CATEGORIES, LANGUAGES, TYPES } from "../../utils/constants";

const StyledContainer = styled.div`
  margin-top: 20px;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
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
  } = HomeVM();

  useEffect(() => {
    fetchRandomJoke();
  }, []);

  return (
    <StyledContainer>
      <StyledRow>{joke?.description}</StyledRow>
      <StyledRow>
        <StyledRCol>
          <button onClick={onClickLikeJoke} name="like">
            Like
          </button>{" "}
        </StyledRCol>

        <StyledRCol>
          <button onClick={onClickDeslikeJoke} name="deslike">
            Dislike
          </button>{" "}
        </StyledRCol>
        <StyledRCol></StyledRCol>
        <StyledRCol>
          <label htmlFor="categories">Categories</label>
          <select
            name="categories"
            id="categories"
            value={categories}
            multiple={true}
            onChange={(e) => {
              const selectedCategory = e.target.value;

              if (!selectedCategory) return;

              if (selectedCategory === "Any") {
                setCategories(["Any"]);
                return;
              }
              let newCategories = categories.filter(
                (category) => category !== "Any"
              );

              const choiceAlreadyFound = categories.find(
                (choice) => choice === e.target.value
              );

              if (choiceAlreadyFound) {
                newCategories = newCategories.filter(
                  (choice) => choice !== e.target.value
                );
              } else {
                newCategories.push(e.target.value);
              }

              setCategories(newCategories);
            }}
          >
            <option value="">-- Select ---</option>
            {CATEGORIES.map((categoryVal) => (
              <option value={categoryVal} key={categoryVal}>
                {categoryVal}
              </option>
            ))}
          </select>
        </StyledRCol>

        <StyledRCol>
          <label htmlFor="language">Language</label>
          <select
            name="language"
            id="language"
            value={language}
            onChange={(e) => {
              console.log({ value: e.target.value });
              if (e.target.value) setLanguage(e.target.value);
            }}
          >
            <option value="">-- Select --</option>
            {LANGUAGES.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
        </StyledRCol>

        <StyledRCol>
          <label htmlFor="types">Type</label>
          <select
            name="types"
            id="types"
            value={types}
            multiple={true}
            onChange={(e) => {
              const selectedType = e.target.value;

              if (!selectedType) return;

              const choiceAlreadyFound = types.find(
                (choice) => choice === e.target.value
              );
              let newTypes = [...types];

              if (choiceAlreadyFound) {
                newTypes = newTypes.filter(
                  (choice) => choice !== e.target.value
                );
              } else {
                newTypes.push(e.target.value);
              }

              SetTypes(newTypes);
            }}
          >
            <option value="">-- Select ---</option>
            {TYPES.map((categoryVal) => (
              <option value={categoryVal} key={categoryVal}>
                {categoryVal}
              </option>
            ))}
          </select>
        </StyledRCol>

        <StyledRCol>
          <label htmlFor="search">Search</label>
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </StyledRCol>

        <StyledRCol>
          <button onClick={onClickSearch} name="show-jokes">
            Search
          </button>{" "}
        </StyledRCol>
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
            <StyledRow key={joke.id}>
              <StyledRCol>{joke.description}</StyledRCol>
              <StyledRCol>
                <button onClick={() => deleteJoke(joke)} name="show-jokes">
                  Remove
                </button>{" "}
              </StyledRCol>
            </StyledRow>
          ))}
      </StyledRCol>
    </StyledContainer>
  );
}

export default Home;
