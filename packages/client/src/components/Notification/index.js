import React from 'react';
import './Notifications.css';
import UncontrolledAlert from './UncontrolledAlert';

function Notification (props) {
    if (props.id === 'sign-in') {
        return (
            <UncontrolledAlert className="alert" color="danger">
                <span>
                  <b>Oh snap! -</b>
                  The combination of email and password is incorrect. Please try again.
                </span>
            </UncontrolledAlert>
        );
    } else if (props.id === 'email') {
        return (
            <UncontrolledAlert className="alert" color="danger">
                <span>
                  <b>Oh snap! -</b>
                  Please ensure that the email you have entered is in the correct form.
                </span>
            </UncontrolledAlert>
        );
    } else if (props.id === 'password') {
        return (
            <UncontrolledAlert className="alert" color="danger">
                <span>
                  <b>Oh snap! -</b>
                  Please ensure that the password has more than 5 characters.
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