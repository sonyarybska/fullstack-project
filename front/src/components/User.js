import {Link} from "react-router-dom";

import "./user.css"

export function User({oneUser}) {
    const {username, first_name, last_name, email, user_type} = oneUser;
    return (
        <Link to={{pathname: '/update', state: oneUser._id}}>
            <div className='user'>
                <div>{username}</div>
                <div>{first_name}</div>
                <div>{last_name}</div>
                <div>{email}</div>
                <div>{user_type}</div>
            </div>
        </Link>
    )
}