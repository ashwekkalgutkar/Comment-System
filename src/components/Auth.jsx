// import React from 'react';
// import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
// import { auth } from '../firebase';
// import GoogleButton from 'react-google-button'

// const Auth = () => {
//   const signInWithGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//       .then((result) => {
//         console.log("User signed in successfully", result.user);
//       })
//       .catch((error) => {
//         console.error("Error during sign-in", error);
//       });
//   };

//   return (
//     <GoogleButton onClick={signInWithGoogle} className="flex items-center bg-white text-gray-700 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-100" />
//   );
// };

// export default Auth;