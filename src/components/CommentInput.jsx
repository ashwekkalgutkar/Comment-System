import React, { useState } from 'react';
import { TextField, Button, IconButton } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const CommentInput = ({ onSubmit, user }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (commentText) => {
    if (!commentText) return;

    const newComment = {
      author: user.displayName,
      content: commentText,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };

    try {
      await addDoc(collection(db, 'comments'), newComment);
      console.log('Comment added successfully!');
    } catch (error) {
      console.error('Error adding comment: ', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommentSubmit(comment); // Use handleCommentSubmit to save the comment
    setComment('');
  };

  const handleFormat = (style) => {
    // Implement text formatting logic
    console.log(`Format ${style} is not yet implemented.`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <TextField
        fullWidth
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        variant="outlined"
      />
      <div className="flex justify-between mt-2">
        <div>
          <IconButton onClick={() => handleFormat('bold')}><FormatBoldIcon /></IconButton>
          <IconButton onClick={() => handleFormat('italic')}><FormatItalicIcon /></IconButton>
          <IconButton onClick={() => handleFormat('underline')}><FormatUnderlinedIcon /></IconButton>
          <IconButton><AttachFileIcon /></IconButton>
        </div>
        <Button variant="contained" color="primary" type="submit">
          Send
        </Button>
      </div>
    </form>
  );
};

export default CommentInput;
