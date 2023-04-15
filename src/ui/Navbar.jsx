import * as React from 'react';
import {useState} from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreIcon from '@mui/icons-material/MoreVert';
import {useSelector, useDispatch} from "react-redux";
import {updateSearchQuery} from "../redux/actions";
import Button from '@mui/material/Button'
import {setSearchResults} from "../redux/actions";
import axios from "axios";
import {selectSearchQuery} from "../redux/initialState";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Navbar () {
    const dispatch = useDispatch();
    const searchQuery = useSelector(selectSearchQuery);
    const [inputValue, setInputValue] = useState(searchQuery);
    const handleInputChange = (event) => {
        dispatch(updateSearchQuery(inputValue));
        setInputValue(event.target.value);
        console.log(inputValue)
    }
    const handleSearch = (query) => {
        const locationsOptions = {
            method: 'GET',
            url: 'https://hotels4.p.rapidapi.com/locations/v3/search',
            params: { q: query, locale: 'en_US', langid: '1033', siteid: '300000001'},
            headers: {
                'X-RapidAPI-Key': '66e46256d1msh900e19d9a481f21p14395ajsn075ef403964f',
                'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
            }
        };

        axios.request(locationsOptions)
            .then(function (response) {
                console.log(response.data)
                const propertiesOptions = {
                    method: 'POST',
                    url: 'https://hotels4.p.rapidapi.com/properties/v2/list',
                    headers: {
                        'content-type': 'application/json',
                        'X-RapidAPI-Key': '66e46256d1msh900e19d9a481f21p14395ajsn075ef403964f',
                        'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
                    },
                    data: `{
                        "currency": "USD",
                        "locale": "en_US",
                        "destination":{"regionId":"${response.data.sr[0]?.gaiaId}"},
                        "checkInDate":{"day":20,"month":6,"year":2023},
                        "checkOutDate":{"day":21,"month":6,"year":2023},
                        "rooms":[{"adults":2}],
                        "resultsStartingIndex":0,
                        "resultsSize":20,
                        "sort":"PRICE_LOW_TO_HIGH"
                      }`
                };
                axios.request(propertiesOptions)
                    .then(function (response2) {
                        dispatch(setSearchResults(response2.data.data.propertySearch.properties));
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            })
            .catch(function (error) {
                console.error(error);
            });
    };


    const favouritesCount=useSelector(state=>state.favouritesCount)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="favorites" color="inherit">
                    <Badge badgeContent={favouritesCount} color="error">
                        <FavoriteIcon />
                    </Badge>
                </IconButton>
                <p>Favorite</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        HotelSearcher
                    </Typography>
                    <Box sx={{ display: 'flex'}}>
                        <Search sx={{ marginRight: '0',border:'1px solid white',borderRadius:0}}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Your destination (city) ..."
                                inputProps={{ 'aria-label': 'search' }}
                                value={inputValue}
                                onChange={handleInputChange}
                            />
                        </Search>
                        <Button variant="contained"
                                onClick={handleSearch}
                                sx={{ color: 'white',border:'1px solid white',borderRadius:0}}
                        >SEARCH</Button>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large" aria-label="show favorites" color="inherit">
                            <Badge badgeContent={favouritesCount} color="error">
                                <FavoriteIcon />
                            </Badge>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
