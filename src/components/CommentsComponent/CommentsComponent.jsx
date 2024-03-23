import React, { useState, useEffect } from "react";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import tokenService from '../../utils/tokenService';

// Separate Comments component
export default function CommentsComponent({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + tokenService.getToken(),
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comments');
      }

      const commentsData = await response.json();
      setComments(commentsData.comments);
      fetchComments()
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  return (
    <Card.Content>
      {comments.map(comment => (
        <div key={comment._id}>
          <p>{comment.text}</p>
          <p>By: {comment.user.username}</p>
        </div>
      ))}
    </Card.Content>
  );
}