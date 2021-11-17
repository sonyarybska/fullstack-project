import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {getUser, putUser, deleteUser} from "../services/user.service";
import "./update-form.css"


export function UpdateForm(props) {
    const {location: {state: id}} = props;

    let [value, setValue] = useState({
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_type: ''
    });

    const {first_name, last_name, password, user_type} = value;

    let [errors, setErrors] = useState('');

    useEffect(() => {
        getUser(id).then(value => setValue({...value}))
    }, [id]);

    let updateUser = async (e) => {
        try {
            e.preventDefault();

            const user = await putUser({first_name, last_name, password, user_type}, id);
            console.log(value);
            if (user.message) {
                throw new Error(user.message)
            } else {
                setErrors('')
            }
        } catch (err) {
            setErrors(err.message)
        }
    };

    let onChange = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
    };

    let dropUser = async () => {
        if (user_type === 'Admin') {
            alert('Access denied, admin cannot be removed');
        } else {
            setValue({first_name: '', last_name: '', password: '', user_type: ''});
            await deleteUser(id);
        }
    }

    return (
        <form className='update-form' onSubmit={updateUser}>
            <div className='cross-box-update'>
                <Link to='/'>
                    <div className='cross-update'/>
                </Link>
            </div>

            <div className='title'>{first_name} {last_name}</div>

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

            <div className='buttons'>
                <button className='pink-btn' onClick={() => dropUser()}>Delete</button>
                <button className='blue-btn'>Save</button>
            </div>

            <div className='errors'>{errors}</div>
        </form>
    )
}