import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import Auth from "./components/Auth";
import CommentInput from "./components/CommentInput";
import CommentList from "./components/CommentList";
import { Container, AppBar, Toolbar } from "@mui/material";

const App = () => {
  const [user] = useAuthState(auth);

  const handleCommentSubmit = async (commentText) => {
    if (!commentText) return;

    const newComment = {
      author: user.displayName,
      content: commentText,
      timestamp: new Date(),
      likes: 0,
      replies: [],
    };

    try {
      // Add the comment to the Firestore collection
      await addDoc(collection(db, "comments"), newComment);
      console.log("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className="justify-between">
          <h1 className="text-2xl font-bold">Comment Section</h1>
          {user ? (
            <div className="flex items-center">
              <img
                src={user.photoURL}
                alt="User Avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{user.displayName}</span>
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
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" className="mt-8">
        {user && <CommentInput onSubmit={handleCommentSubmit} />}
        <CommentList />
      </Container>
    </>
  );
};

export default App;
