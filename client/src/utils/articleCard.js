import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button
} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';

const ArticleCard = () => {
    return (
        <Card>
            <CardMedia
                style={{ height: 0, paddingTop: '56.25%' }}
                image="https://picsum.photos/200"
                title="something"
            />
            <CardContent>
                <Typography variant="h5">
                    something
                </Typography>
                <Typography variant="body" component="p">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                    enim ad minim veniam, quis nostrud exercitation ullamco laboris
                    nisi ut aliquip ex ea commodo consequat.
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton>
                    <FavoriteIcon />
                    <Button size="small" color="primary" component={RouterLink}
                        to={`article/id`}>
                        View article
                    </Button>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ArticleCard;