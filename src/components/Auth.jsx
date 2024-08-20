import React from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

const Auth = () => {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in successfully", result.user);
      })
      .catch((error) => {
        console.error("Error during sign-in", error);
      });
  };

  return (
    <button onClick={signInWithGoogle} className="flex items-center bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100">
      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google logo" className="w-5 h-5 mr-2" />
      Sign with the Google
    </button>
  );
};

export default Auth;