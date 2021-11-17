import {useState} from "react";
import {Link} from "react-router-dom";

import {postUser} from "../services/user.service";
import "./create-form.css";

export function CreateForm() {

    let [value, setValue] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_type: ''
    });

    const {username, first_name, last_name, email, password, user_type} = value;

    let [errors, setErrors] = useState(' ');

    let createUser = async (e) => {
        try {
            e.preventDefault();

            const user = await postUser(value);

            if (user.message) {
                throw new Error(user.message)
            } else {
                setErrors('')
            }
        } catch (e) {
            setErrors(e.message);
        }
    };

    let onChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    };

    return (
        <div>
            <form className='create-form' onSubmit={createUser}>
                <div className='cross-box'>
                    <Link to='/'>
                        <div className='cross'/>
                    </Link>
                </div>
                <div className='title'>Create new user</div>
                <label htmlFor='username'>Username:</label>
                <input
                    id='username' required onChange={onChange} name='username' value={username} placeholder='username'
                    type='text'
                />
                <label htmlFor='first_name'>First name</label>
                <input
                    id='first_name' required onChange={onChange} name='first_name' value={first_name}
                    placeholder='first name'
                    type='text'
                />

                <label htmlFor='last_name'>Last name</label>
                <input
                    id='last_name' required onChange={onChange} name='last_name' value={last_name}
                    placeholder='last name'
                    type='text'
                />

                <label htmlFor='email'>Email</label>
                <input
                    id='email' required onChange={onChange} name='email' value={email} placeholder='email'
                    type='text'
                />

                <label htmlFor='password'>Password</label>
                <input
                    id='password' autoComplete='on' required onChange={onChange} name='password' value={password}
                    placeholder='password' type='password'
                />

                <label htmlFor='user_type'>User type</label>
                <select id='user_type' required onChange={onChange} value={user_type} name='user_type'>
                    <option value=''/>
                    <option value='Driver'>Driver</option>
                    <option value='Admin'>Admin</option>
                </select>

                <button>Create</button>

                <div className='errors'>{errors}</div>
            </form>
        </div>
    )
}