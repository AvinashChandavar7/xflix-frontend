import { Box, Stack } from "@mui/material";
import React from "react";

import "./ContentRatingList.css";


const ContentRatingList = ({allContentRatings ,selectedContentRatings,  handleContentRatingChange,}) => {
  return (
      <Box className="tool-bar" id="tool-barHeight" >
         <Stack direction="row" 
                alignItems="center" 
                justifyContent="center"   
                gap="20px"   
                sx={{ cursor: "pointer", flexWrap: "wrap"  }} >
         {
          allContentRatings.map((contentRating) => (
           <Box 
           key={contentRating.value}
           className={ 
            selectedContentRatings.includes(contentRating.value) 
            ? "content-rating-btn active-toolbar-button"
            : "content-rating-btn"}
          onClick={() => handleContentRatingChange(contentRating)}
           >
            {contentRating.label}
          </Box>
         ))
        }
        </Stack>
      </Box>
  )
}

export default ContentRatingList