import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  CircularProgress,  Grid,  TextField,Typography,  InputAdornment,} from "@mui/material";
import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useSnackbar } from "notistack";
import { config } from "../App";
import axios from "axios";

import { Header ,GenreList,ContentRatingList ,VideoCard} from "./";
import "./LandingPage.css";

const allGenres = [
  { label: "All",    value: "All" },
  { label: "Education", value: "Education" },
  { label: "Sports", value: "Sports" },
  { label: "Comedy", value: "Comedy" },
  { label: "Lifestyle", value: "Lifestyle" },
];

const allContentRatings = [
  { label: "All Age Group", value: "Anyone" },
  { label: "7+", value: "7%2B" },
  { label: "12+", value: "12%2B" },
  { label: "16+", value: "16%2B" },
  { label: "18+", value: "18%2B" },
];

const LandingPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [searchValid, setIfSearchValid] = useState("true");
  const [videos, setVideos] = useState([]);
  const [genres, setGenres] = useState(["All"]);
  const [selectedContentRatings, setSelectedContentRatings] = useState("Anyone");

const performAPICall = async (URL) => {
  setLoading(true);
  try {
    const response = await axios.get(URL);
    console.log(response.data.videos);
    setVideos(response.data.videos);
  } catch (e) {
    const message = e.response?.data?.message ?? "Something went wrong";
    enqueueSnackbar(message, { variant: "error" });
  }
  setLoading(false);
};


const performSearch = async (value, genres, selectedContentRatings) => {
  let URL = `${config.endpoint}/videos`;
  
  if (value.length) {  URL += `?title=${value}`;}
  
  if (genres.length && !genres.includes("All")) {
    const param = genres.join(",");
    URL += URL.includes("?") 
      ? `&genres=${param}` : `?genres=${param}`;
  }
  
  if (selectedContentRatings.length && selectedContentRatings !== "Anyone") {
    URL += URL.includes("?") 
    ? `&contentRating=${selectedContentRatings}` 
    : `?contentRating=${selectedContentRatings}`;
  }
    performAPICall(URL);
};

const debounceSearch = (event, debounceTimeout) => {
  const value = event.target.value;

  if (timerId) {
    clearTimeout(timerId);
  }

  const timeoutId = setTimeout(() => {
    performSearch(value, genres, selectedContentRatings);
  }, debounceTimeout);

  setTimerId(timeoutId);
};

  useEffect(() => {
    const URL = `${config.endpoint}/videos`;
    performAPICall(URL);
  }, []);

  useEffect(() => {
    performSearch("", genres, selectedContentRatings);
  }, [genres, selectedContentRatings]);

const toggleValueInList = (array, value) => {
  return array.includes(value) ? array.filter(e => e !== value) : [...array, value];
};


const handleGenreChange = (genre) => {
  const all = "All";
  const newGenreValue = genre.value;

  if (newGenreValue === all) {
    setGenres([all]);
  } else {
    const genreWithoutAll = genres.filter(item => item !== all);
    const nextGenres = toggleValueInList(genreWithoutAll, newGenreValue);
    setGenres(nextGenres.length === 0 ? [all] : nextGenres);
  }
};

  const handleContentRatingChange = (contentRating) => {
    setSelectedContentRatings(contentRating.value);
  };

  return (
  <>
      <Box className="header-box" >
        <Header
          fetchVideos={performAPICall}
          genres={allGenres}
          contentRatings={allContentRatings}   
        >
   {/* Search view for desktop */}
          <TextField
            className="search-desktop"
            size="small"
            inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
            InputProps={{  className: "search",  endAdornment: (    <InputAdornment position="end">      <Search color="primary" />    </InputAdornment>  ),}}
            placeholder="Search"
            name="search"
        
            onChange={(event) => debounceSearch(event, 500)}
          />

        </Header>
    
      </Box>


       <TextField
        className="search-mobile"
        size="small"
        fullWidth
        inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
        InputProps={{  endAdornment: (    <InputAdornment position="end">      <Search color="primary" />    </InputAdornment>  ),}}
        onChange={(event) => debounceSearch(event, 500)}
        placeholder="Search"
        name="search"
  
      />

      <GenreList
        allGenres={allGenres}
        selectedGenres={genres}
        handleGenreChange={handleGenreChange}
        setVideos={setVideos}
      />

        <ContentRatingList
        allContentRatings={allContentRatings}
        selectedContentRatings={selectedContentRatings}
        handleContentRatingChange={handleContentRatingChange}
      />

   {searchValid ? (
        <Grid  container  paddingY="1rem"  marginTop="0.6rem"  paddingX="2rem"  spacing={3}>
          {!isLoading ? (
            videos.map((video) => (
              <Grid item xs={12} sm={6} md={3} key={video._id}>
                <Link  to={`/video/${video._id}`}  className="video-tile-link"  style={{ textDecoration: "none", color: "white" }}>
                  <VideoCard video={video} />
                </Link>
              </Grid>
            ))
          ) : (
            <Box  display="flex"  flexDirection="column"  justifyContent="center"  alignItems="center"  sx={{ height: "75vh", width: "100%" }}>
              <Box>
                <CircularProgress />
              </Box>
            </Box>
          )}
        </Grid>
      ) : (
        <Box className="loading">
          <SentimentDissatisfied />
          <p>No videos found</p>
        </Box>
      )}
      
  </>
  );
}

export default LandingPage