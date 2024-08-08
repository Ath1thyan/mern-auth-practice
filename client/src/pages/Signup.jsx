import { Link } from "react-router-dom";
const Signup = () => {
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7 text-blue-700'>Signup</h1>
            <form className='flex flex-col gap-4'>
                <input type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg' />
                <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg' />
                <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg' />
                <button type='submit' className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-60'>Signup</button>
            </form>
            <div className='mt-5 flex gap-2'>
                <p>Have an account?</p>
                <Link to='/sign-in'>
                    <span className="text-blue-500">Sign in</span>
                </Link>
            </div>
        </div>
    )
}

export default Signup;
