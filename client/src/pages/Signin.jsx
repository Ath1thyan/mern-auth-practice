import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Signin = () => {

    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success == false) {
                dispatch(signInFailure(data));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
        }
        catch (error) {
            dispatch(signInFailure(error));
        }
    };


    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7 text-blue-700'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <button disabled={loading} type='submit' className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60'>
                    {loading? 'Signing in...' : 'Signin'}
                </button>
            </form>
            <div className='mt-5 flex gap-2'>
                <p>New user?</p>
                <Link to='/sign-up'>
                    <span className="text-blue-500">Register here</span>
                </Link>
            </div>
            <p className='text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ""}</p>
        </div>
    )
}

export default Signin;
