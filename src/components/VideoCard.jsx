import React from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";

const VideoCard = ({ video :{ previewImage, title, releaseDate }}) => {
   
  return (
    <>
      <Box className="video-tile" display="flex" flexDirection="column">
        <img src={previewImage} alt="thumbnail" class="video-img" />
        <Box marginTop="0.4rem">
          <Typography gutterBottom variant="body1" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle2" sx={{ opacity: "0.4" }}>
            {moment(releaseDate).fromNow()}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default VideoCard;