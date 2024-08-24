import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Container,
  Button,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import GoogleButton from "react-google-button";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import PersonIcon from "@mui/icons-material/Person";
import { formatDistanceToNow } from "date-fns";

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
      userLikes: [],
      userDislikes: [],
      timestamp: new Date().toISOString(),
    },
  ]);
  const [openModal, setOpenModal] = useState(false);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("User signed in successfully", result.user);
        setOpenModal(false);
      })
      .catch((error) => {
        console.error("Error during sign-in", error);
      });
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User signed out successfully");
      })
      .catch((error) => {
        console.error("Error during sign-out", error);
      });
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Box className="w-full max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-md">
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar className="justify-between">
            <div className="relative">
              {user ? (
                <div className="relative w-32 h-32 flex items-center">
                  <PersonIcon />
                  <span className="ml-2">{user.displayName}</span>
                  <Button
                    onClick={handleSignOut}
                    className="ml-4 text-sm text-blue-500 hover:underline"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <GoogleButton
                  onClick={handleOpenModal}
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
          {user ? (
            <CommentSection
              currentUser={{
                currentUserId: user.uid,
                currentUserImg:
                  user.photoURL || "https://ui-avatars.com/api/?name=Guest",
                currentUserProfile: user.photoURL || "https://www.linkedin.com",
                currentUserFullName: user.displayName || "Guest",
              }}
              advancedInput={true}
              hrStyle={{ border: "0.5px solid #ff0072" }}
              commentData={commentsData.map((comment) => ({
                ...comment,
                timestamp: formatDistanceToNow(new Date(comment.timestamp), {
                  addSuffix: true,
                }),
              }))}
              inputStyle={{ border: "1px solid rgb(208, 208, 208)" }}
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
              replyInputStyle={{
                borderBottom: "1px solid black",
                color: "black",
              }}
            />
          ) : (
            <Typography variant="body1" align="center">
              Please log in to view and post comments.
            </Typography>
          )}
        </Container>
      </Box>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="login-modal"
        aria-describedby="login-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="login-modal" variant="h6" component="h2">
            Login Required
          </Typography>
          <Typography id="login-modal-description" sx={{ mt: 2 }}>
            Please log in to view and post comments.
          </Typography>
          <GoogleButton
            onClick={signInWithGoogle}
            style={{ marginTop: "20px" }}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default App;

// const handleCommentSubmit = () => {
//   if (!user) {
//     alert("Please log in to comment");
//     return;
//   }

//   if (commentText.trim() === "") {
//     alert("Comment cannot be empty");
//     return;
//   }

//   const newComment = {
//     userId: user.uid,
//     comId: uuidv4(),
//     fullName: user.displayName,
//     userProfile: user.photoURL,
//     text: commentText,
//     avatarUrl: user.photoURL, // Use the user's profile picture
//     replies: [],
//     likes: 0,
//     dislikes: 0,
//     userLikes: [],
//     userDislikes: [],
//   };

//   if (replyingTo) {
//     // Add reply to the specific comment
//     setCommentsData(
//       commentsData.map((comment) =>
//         comment.comId === replyingTo
//           ? {
//               ...comment,
//               replies: [...comment.replies, newComment],
//             }
//           : comment
//       )
//     );
//     setReplyingTo(null); // Reset reply state
//   } else {
//     // Add new comment
//     setCommentsData([...commentsData, newComment]);
//   }

//   setCommentText("");
// };

// const handleLike = (comId) => {
//   setCommentsData(
//     commentsData.map((comment) =>
//       comment.comId === comId
//         ? {
//             ...comment,
//             likes: comment.userLikes.includes(user?.uid)
//               ? comment.likes - 1
//               : comment.likes + 1,
//             dislikes: comment.userDislikes.includes(user?.uid)
//               ? comment.dislikes - 1
//               : comment.dislikes,
//             userLikes: comment.userLikes.includes(user?.uid)
//               ? comment.userLikes.filter((id) => id !== user?.uid)
//               : [...comment.userLikes, user?.uid],
//             userDislikes: comment.userDislikes.includes(user?.uid)
//               ? comment.userDislikes.filter((id) => id !== user?.uid)
//               : comment.userDislikes,
//           }
//         : comment
//     )
//   );
// };

// const handleDislike = (comId) => {
//   setCommentsData(
//     commentsData.map((comment) =>
//       comment.comId === comId
//         ? {
//             ...comment,
//             dislikes: comment.userDislikes.includes(user?.uid)
//               ? comment.dislikes - 1
//               : comment.dislikes + 1,
//             likes: comment.userLikes.includes(user?.uid)
//               ? comment.likes - 1
//               : comment.likes,
//             userDislikes: comment.userDislikes.includes(user?.uid)
//               ? comment.userDislikes.filter((id) => id !== user?.uid)
//               : [...comment.userDislikes, user?.uid],
//             userLikes: comment.userLikes.includes(user?.uid)
//               ? comment.userLikes.filter((id) => id !== user?.uid)
//               : comment.userLikes,
//           }
//         : comment
//     )
//   );
// };

// const handleReply = (comId) => {
//   setReplyingTo(comId);
//   setCommentText(""); // Clear the text box for a new reply
// };
