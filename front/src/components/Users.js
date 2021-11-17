import {useEffect, useState} from "react";

import {User} from "./User";
import "./users.css";
import {getUsers, deleteUser} from "../services/user.service";

export function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers().then(value => setUsers([...value]))
    }, [users]);

    const deleteOneUser = async (id) => {
        try {
            const response = await deleteUser(id);

            if (response.message) {
                throw new Error(response.message);
            }
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <div className='user-box'>
            <div className='titles'>
                <p>USERNAME</p>
                <p>FIRST NAME</p>
                <p>LAST NAME</p>
                <p>EMAIL</p>
                <p>USER TYPE</p>
            </div>
            {users.map((value, index) => <User key={index + 1} oneUser={value} deleteUser={deleteOneUser}/>)}
        </div>
    )
}