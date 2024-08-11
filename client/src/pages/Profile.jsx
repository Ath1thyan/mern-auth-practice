import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

export default function Profile() {
    const { currentUser } = useSelector((state) => state.user);

    const profilePictureRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imageUploadPercentage, setImageUploadPercentage] = useState(0);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [formData, setFormData] = useState({});


    useEffect(() => {
        if (image) {
            handleImageUplad(image);
        }
    }, [image]);

    const handleImageUplad = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadPercentage(Math.round(progress));
                if (snapshot.state === "success") {
                    console.log("Upload successful");
                }
            },
            (error) => {
                setImageUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, profilePicture: downloadURL });
                });
            }
        );
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className="text-3xl font-semibold text-center my-7">
                {currentUser.username}&apos;s Profile
            </h1>
            <form className="flex flex-col gap-4">
                <input
                    type="file"
                    ref={profilePictureRef}
                    hidden
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt="profile"
                    className="h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2"
                    onClick={() => profilePictureRef.current.click()}
                />
                <p className="text-sm self-center">
                    {imageUploadError ? (
                        <span className="text-red-700">Error uploading image (file size must be lessthan 5 MB)</span>
                    ) : (
                        imageUploadPercentage > 0 && imageUploadPercentage < 100 ? (
                            <span className="text-slate-700">
                                {imageUploadPercentage}% uploaded
                            </span>
                        ) : (
                            imageUploadError === 100 ? (
                                <span className="text-green-700">
                                    Image uploaded successfully
                                </span>
                            ) : ""
                        )
                    )}
                </p>
                <input
                    defaultValue={currentUser.username}
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <input
                    defaultValue={currentUser.email}
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="bg-slate-100 rounded-lg p-3"
                />
                <button
                    type="submit"
                    className="bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
                >
                    Update Profile
                </button>
            </form>
            <div className="flex justify-between mt-5">
                <span className="text-red-700 cursor-pointer">Delete Account</span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
        </div>
    );
}
