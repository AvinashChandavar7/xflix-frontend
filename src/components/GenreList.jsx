import React, { useState } from "react";
import axios from "axios";
import { config } from "../App";
import { useSnackbar } from "notistack";
import { Box,Stack} from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import "./LandingPage.css";


const GenreList = ({  allGenres,  selectedGenres,  handleGenreChange,  setVideos,}) => {
  const { enqueueSnackbar } = useSnackbar();

  // const sort = {   sortBy: "releaseDate", };

  const [option, setOption] = useState("releaseDate");

  const handleInput = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setOption({ ...option, [name]: value });
   
    let url = `${config.endpoint}/videos?sortBy=${value}`;
    
    if (value === "releaseDate") {
      url = `${config.endpoint}/videos`;
    }
    try {
      const response = await axios.get(url);
      const data = response.data.videos;

      setVideos(data);
    } catch (e) {
      if (e.response && e.response.data) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar(
          "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
          { variant: "error" }
        );
      }
    }
  };

  return (
    <div className="tool-bar">

      {allGenres.map((genre) => (
        <Box
        className={  
          selectedGenres.includes(genre.value) 
          ? "genre-btn active-toolbar-button" 
          : "genre-btn"}
        onClick={() => handleGenreChange(genre, selectedGenres)}
        key={genre.value}
        >
          {genre.value}
        </Box>
      ))}

      <Box className="sort-by active-toolbar-button">
        <Stack direction="row" spacing={2}>
          <CompareArrowsIcon />
          <select  className="sort-select"  name="sortBy"  value={option.sortBy}  onChange={handleInput}>
            <option  className="select-option"  id="release-date-option"  value="releaseDate"> Release Date </option>
            <option  className="select-option"  id="view-count-option"  value="viewCount"> View Count </option>
          </select>

        </Stack>
      </Box>

    </div>
  );
};

export default GenreList;
