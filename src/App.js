import React from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Auth from "./components/Auth";

const App = () => {
  const [user] = useAuthState(auth);

  const commentsData = [
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/?name=Lily&background=random",
      replies: [],
    },
  ];

  return (
    <div className="w-[828px] bg-white max-w-full flex flex-col items-end justify-start pt-[15px] pb-6 pl-5 pr-6 box-border gap-5">
      <header className="self-stretch flex flex-row items-start justify-between">
        <h1 className="text-[24.5px] font-semibold text-gray-800">
          Comments(3)
        </h1>
        {user ? (
          <div className="flex items-center">
            <img
              src={user.photoURL}
              alt="User Avatar"
              className="h-[37px] w-[37px] rounded-[50%] object-cover mr-2"
            />
            <span className="font-semibold">{user.displayName}</span>
            <button
              onClick={() => auth.signOut()}
              className="ml-4 text-sm text-blue-500 hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <Auth />
        )}
      </header>
      <main className="self-stretch shadow-[0px_0px_4px_5px_rgba(0,_0,_0,_0.1)] rounded-xl bg-white flex flex-col items-end justify-start pt-4 px-11 pb-[62px] box-border gap-[45px] max-w-full">
        <CommentSection
          currentUser={{
            currentUserId: user?.uid || "",
            currentUserImg: user?.photoURL || "",
            currentUserProfile: "#",
            currentUserFullName: user?.displayName || "",
          }}
          logIn={{
            loginLink: "#",
            signupLink: "#",
          }}
          commentData={commentsData}
          onSubmitAction={(data) => {
            console.log("Check submit, ", data);
          }}
          currentData={(data) => {
            console.log("Current data", data);
          }}
        />
      </main>
    </div>
  );
};

export default App;
