import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import GoogleButton from "react-google-button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { v4 as uuidv4 } from "uuid";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import PersonIcon from "@mui/icons-material/Person";

// Define comment functionalities and initial state
const App = () => {
  const [user, loading] = useAuthState(auth);
  const [commentsData, setCommentsData] = useState([
    {
      userId: "02b",
      comId: "017",
      fullName: "Lily",
      userProfile: "https://www.linkedin.com/in/riya-negi-8879631a9/",
      text: "I think you have a point🤔",
      avatarUrl: "https://ui-avatars.com/api/?name=Lily&background=random",
      replies: [],
      likes: 0,
      dislikes: 0,
      userLikes: [], // Track likes by users
      userDislikes: [], // Track dislikes by users
    },
  ]);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null); // Track which comment to reply to

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

  const handleCommentSubmit = () => {
    if (!user) {
      alert("Please log in to comment");
      return;
    }

    if (commentText.trim() === "") {
      alert("Comment cannot be empty");
      return;
    }

    const newComment = {
      userId: user.uid,
      comId: uuidv4(),
      fullName: user.displayName,
      userProfile: user.photoURL,
      text: commentText,
      avatarUrl: user.photoURL, // Use the user's profile picture
      replies: [],
      likes: 0,
      dislikes: 0,
      userLikes: [],
      userDislikes: [],
    };

    if (replyingTo) {
      // Add reply to the specific comment
      setCommentsData(
        commentsData.map((comment) =>
          comment.comId === replyingTo
            ? {
                ...comment,
                replies: [...comment.replies, newComment],
              }
            : comment
        )
      );
      setReplyingTo(null); // Reset reply state
    } else {
      // Add new comment
      setCommentsData([...commentsData, newComment]);
    }

    setCommentText("");
  };

  const handleLike = (comId) => {
    setCommentsData(
      commentsData.map((comment) =>
        comment.comId === comId
          ? {
              ...comment,
              likes: comment.userLikes.includes(user?.uid)
                ? comment.likes - 1
                : comment.likes + 1,
              dislikes: comment.userDislikes.includes(user?.uid)
                ? comment.dislikes - 1
                : comment.dislikes,
              userLikes: comment.userLikes.includes(user?.uid)
                ? comment.userLikes.filter((id) => id !== user?.uid)
                : [...comment.userLikes, user?.uid],
              userDislikes: comment.userDislikes.includes(user?.uid)
                ? comment.userDislikes.filter((id) => id !== user?.uid)
                : comment.userDislikes,
            }
          : comment
      )
    );
  };

  const handleDislike = (comId) => {
    setCommentsData(
      commentsData.map((comment) =>
        comment.comId === comId
          ? {
              ...comment,
              dislikes: comment.userDislikes.includes(user?.uid)
                ? comment.dislikes - 1
                : comment.dislikes + 1,
              likes: comment.userLikes.includes(user?.uid)
                ? comment.likes - 1
                : comment.likes,
              userDislikes: comment.userDislikes.includes(user?.uid)
                ? comment.userDislikes.filter((id) => id !== user?.uid)
                : [...comment.userDislikes, user?.uid],
              userLikes: comment.userLikes.includes(user?.uid)
                ? comment.userLikes.filter((id) => id !== user?.uid)
                : comment.userLikes,
            }
          : comment
      )
    );
  };

  const handleReply = (comId) => {
    setReplyingTo(comId);
    setCommentText(""); // Clear the text box for a new reply
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Box className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-md">
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar className="justify-between">
            <div className="relative">
              {user ? (
                <div className="relative w-32 h-32">
                  <PersonIcon />
                  <span>{user.displayName}</span>
                  <Button
                    onClick={() => auth.signOut()}
                    className="ml-4 text-sm text-blue-500 hover:underline"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <GoogleButton
                  onClick={signInWithGoogle}
                  className="flex items-center bg-white text-gray-700 border border-gray-300 rounded-md px-2 py-1 text-sm hover:bg-gray-100"
                  style={{ position: "absolute", top: "16px", right: "16px" }}
                />
              )}
            </div>
          </Toolbar>
        </AppBar>

        <Container
          maxWidth="md"
          className="mt-8 shadow-md p-4 bg-white rounded-md"
          style={{ boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}
        >
          <CommentSection
            currentUser={{
              currentUserId: user?.uid || "guest",
              currentUserImg: user?.photoURL || <PersonIcon />, // Show icon if no user photo
              currentUserProfile: user?.photoURL || "https://www.linkedin.com",
              currentUserFullName: user?.displayName || "Guest",
            }}
            hrStyle={{ border: "0.5px solid #ff0072" }}
            commentData={commentsData}
            currentData={(data) => {
              console.log("Current data:", data);
            }}
            logIn={{
              loginLink: "http://localhost:3001/",
              signupLink: "http://localhost:3001/",
            }}
            inputStyle={{ border: "1px solid rgb(208 208 208)" }}
            formStyle={{ backgroundColor: "white" }}
            submitBtnStyle={{
              border: "1px solid black",
              backgroundColor: "black",
              padding: "7px 15px",
            }}
            cancelBtnStyle={{
              border: "1px solid gray",
              backgroundColor: "gray",
              color: "white",
              padding: "7px 15px",
            }}
          />
        </Container>
      </Box>
    </div>
  );
};

export default App;
