import React, { useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import SideDrawer from './sideNavigation';

import { useSelector, useDispatch } from 'react-redux';
import { clearNotifications } from '../../store/actions/index';
import { showToast } from '../../utils/tools';

const Header = (props) => {
    const notifications = useSelector(state => state.notifications)
    const dispatch = useDispatch();

    useEffect(() => {
        if(notifications && notifications.error){
            const msg = notifications.msg ? notifications.msg : 'Error';
            showToast('ERROR', msg)
            dispatch( clearNotifications() )
        }
        if (notifications && notifications.success) {
            const msg = notifications.msg ? notifications.msg : 'Success';
            showToast('SUCCESS', msg)
            dispatch( clearNotifications() )
        }
    },[notifications, dispatch])

    return(
        <>
            <nav className="navbar fixed-top">
                <Link style={{fontFamily:'Fredoka One'}} to='/'
                className="navbar-brand d-flex align-items-center"
                >
                    FlickBase
                </Link>
                <SideDrawer/>
            </nav>
        </>
    )
}

export default withRouter(Header);