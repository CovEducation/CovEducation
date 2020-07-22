import React from 'react';
import './Notifications.css';
import UncontrolledAlert from './UncontrolledAlert';

function Notification (props) {
    if (props.id === 'sign-in') {
        return (
            <UncontrolledAlert className="alert" color="danger">
                <span>
                  <b>Oh snap! -</b>
                  The email and/or password are in the wrong format. Please try again.
                </span>
            </UncontrolledAlert>
        );
    } else if (props.id === 'auth') {
        return (
            <UncontrolledAlert className="alert" color="danger">
                <span>
                  <b>Oh snap! -</b>
                  The email and password combination is incorrect. Please try again.
                </span>
            </UncontrolledAlert>
        );
    } else {
        return (
            <br />
        )
    }
}

export default Notification;