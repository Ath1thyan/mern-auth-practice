import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(false);
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            setLoading(false);
            if (data.success == false) {
                setError(true);
                return;
            }
            navigate('/sign-in');
        }
        catch (error) {
            setError(true);
            setLoading(false);
        }
    };


    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7 text-blue-700'>Sign Up</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' onChange={handleChange} />
                <button disabled={loading} type='submit' className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60'>
                    {loading? 'Signing up...' : 'Signup'}
                </button>
            </form>
            <div className='mt-5 flex gap-2'>
                <p>Have an account?</p>
                <Link to='/sign-in'>
                    <span className="text-blue-500">Sign in</span>
                </Link>
            </div>
            {error && <div className='text-red-700 mt-5'>Failed to signup. Please try again.</div>}
        </div>
    )
}

export default Signup;
