import { Box, TextField ,InputAdornment} from '@mui/material'
import { Search } from "@mui/icons-material";
import React from 'react'

const SearchBar = ({searchClass ,searchDevice,debounceSearch}) => {
  return (
    <Box>
    <TextField
      className={searchClass}
      onChange={debounceSearch}
      placeholder={searchDevice}
      size="small " 
      inputProps={{ style: { fontFamily: "Arial", color: "white" } }}
      InputProps={{   className: "search",   endAdornment: (     <InputAdornment position="end">       <Search color="primary" />     </InputAdornment>   ), }}
      name="search"
    />
    </Box>
  )
}

export default SearchBar