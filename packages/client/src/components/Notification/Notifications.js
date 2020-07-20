import React from "react";
import "./Notifications.css"
import UncontrolledAlert from "./UncontrolledAlert"

function Notifications (props) {
    if (props.id === "email") {
        return (
            <UncontrolledAlert className="alert" color="danger">
                {/*<span data-notify="icon" className="tim-icons icon-lifebuoy"/>*/}
                <span>
              <b>Oh snap! -</b>
              Please ensure that the email you have entered is in the correct form.
            </span>
            </UncontrolledAlert>
        );
    } else if (props.id === "password") {
        return (
            <UncontrolledAlert className="alert" color="danger">
                {/*<span data-notify="icon" className="tim-icons icon-lifebuoy"/>*/}
                <span>
              <b>Oh snap! -</b>
              Please ensure that the password you have entered is not too easy to guess.
            </span>
            </UncontrolledAlert>
        );
    } else {
        return (
            <br />
        )
    }
}

export default Notifications;