import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Comment from './Comment';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, 'comments'),
        orderBy(sortBy === 'latest' ? 'timestamp' : 'likes', 'desc'),
        limit(8)
      );
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setComments(fetchedComments);
    };

    fetchComments();
  }, [sortBy]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Comments({comments.length})</h2>
        <div className="space-x-2">
          <button
            onClick={() => setSortBy('latest')}
            className={`${sortBy === 'latest' ? 'font-bold' : ''}`}
          >
            Latest
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`${sortBy === 'popular' ? 'font-bold' : ''}`}
          >
            Popular
          </button>
        </div>
      </div>
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}
    </div>
  );
};

export default CommentList;