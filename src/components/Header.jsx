import { 
      Button,
    Stack,
    TextField,} from "@mui/material";
import UploadIcon from '@mui/icons-material/Upload';


import Box from "@mui/material/Box";
import React, { useState }  from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

import { SearchBar ,UploadForm} from "./";

const Header = ({  children,fetchVideos, genres, contentRatings}) => {
  
     const [isModalOpen, setIsModalOpen] = useState(false);

   const handleOpen = () => {
      setIsModalOpen(true);
    };
  
    const handleClose = () => {
      setIsModalOpen(false);
    };
  
  return (
    <>
    <Stack direction="row" alignItems="center" p={1} justifyContent="space-between"
           sx={{position:"sticky" , top: 0 , backgroundColor:"#202020"}}>

     <Link to="/" style={{ display: "flex" , color: "white" ,textDecoration: "none"}}>
       <h1><span style={{ color: "red" }}>X</span>Flix</h1>
      </Link> 

      {/* <SearchBar   searchClass="search-desktop" searchDevice="Serach...Desktop" debounceSearch={debounceSearch} /> */}
      
     <Box className="search-box" marginTop="1rem">
              {children}
           </Box>

         <Box className="header-action" marginTop="1rem">
              <Button  id="upload-btn" startIcon={<UploadIcon />} variant="contained"
                onClick={handleOpen}
                >
                  Upload
              </Button>
            </Box> 


       <Dialog   open={isModalOpen}   onClose={handleClose}   aria-labelledby="simple-dialog-title" >
           <Grid container className="dialog">
         
          <Box   display="flex"   justifyContent="space-between"   alignItems="center"   width="100%" >
            <h3 className="form-header">Upload Video</h3>

            <IconButton  aria-label="close"  className={"close-button"}  onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid item xs={12}>
            <UploadForm  onClose={handleClose}  fetchVideos={fetchVideos}  genres={genres}  contentRatings={contentRatings}/>
          </Grid>
        </Grid>
      </Dialog>
  
</Stack>

    {/* <Stack direction="row" alignItems="center" p={1} justifyContent="center"
           sx={{backgroundColor:"#202020"}}>
        <SearchBar   searchClass="search-mobile" searchDevice="Serach...Moblie"   />
    </Stack> */}

    </>
  )
}

export default Header