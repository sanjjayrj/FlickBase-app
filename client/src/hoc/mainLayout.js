import React from 'react';
import { Container } from '@material-ui/core';

const MainLayout = (props) => {
    return(
        <Container className={`app_container mb-5`}>
            {props.children}
        </Container>
    )
}

export default MainLayout;