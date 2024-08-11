import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

const OAuth = () => {

    const dispatch = useDispatch();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/googlelogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data))
        } 
        catch (error) {
            console.log("Google signin error", error);
        }
    };

  return (
    <button type='button' onClick={handleGoogleClick} className='bg-red-700 rounded-lg p-3 uppercase hover:opacity-95 text-white'>Continue with Google</button>
  )
}

export default OAuth;
