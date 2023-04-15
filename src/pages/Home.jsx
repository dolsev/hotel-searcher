import React from 'react';
import HotelCard from "../ui/HotelCard";
import { useSelector } from 'react-redux';
import {selectSearchResults} from "../redux/initialState";
import Box from '@mui/material/Box';


function Home() {
    const searchData = useSelector(selectSearchResults);
    return (
        <Box
            sx={{
                    maxWidth: 1440,
                    display:'flex',
                    flexWrap:'wrap',
                    gap:2}}
        >
                {searchData?.map((hotel)=>{
                    return <HotelCard key={hotel.id} name={hotel.name} image={hotel.propertyImage?.image?.url} />
                })}
        </Box>

    );
}

export default Home;