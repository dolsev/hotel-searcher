import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function HotelCard({name,image}) {

    return (
        <Card sx={{ width: 360 }}>
            <CardMedia
                component="img"
                height="194"
                image={image}
                alt={name}
            />
            <CardContent>
                <Typography variant="body1" color="text.primary">
                    {name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    5000$ for room
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>

        </Card>
    );
}
