import React from 'react';
import { Container } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = (props) => {
    return(
        <Container className={`app_container mb-5`}>
            {props.children}
            <ToastContainer/>
        </Container>
    )
}

export default MainLayout;