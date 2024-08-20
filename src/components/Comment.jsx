import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

const Comment = ({ author, content, timestamp, likes, replies }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-2">
        <img src={`https://ui-avatars.com/api/?name=${author}&background=random`} alt={author} className="w-8 h-8 rounded-full mr-2" />
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-xs text-gray-500">{formatDistanceToNow(new Date(timestamp.seconds * 1000), { addSuffix: true })}</p>
        </div>
      </div>
      <p className="mb-2">{content}</p>
      <div className="flex items-center text-sm text-gray-500">
        <button className="mr-4 flex items-center">
          <span className="mr-1">👍</span> {likes}
        </button>
        <button className="mr-4" onClick={() => setShowReplies(!showReplies)}>
          Reply
        </button>
        {replies.length > 0 && (
          <button onClick={() => setShowReplies(!showReplies)}>
            {showReplies ? 'Hide' : 'Show'} {replies.length} replies
          </button>
        )}  
      </div>
      {showReplies && (
        <div className="ml-8 mt-4">
          {replies.map((reply, index) => (
            <Comment key={index} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;