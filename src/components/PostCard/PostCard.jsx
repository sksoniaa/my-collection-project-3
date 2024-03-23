import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import tokenService from '../../utils/tokenService';


export default function PostCard({ post, isProfile, loggedUser, deletePost, removeLike, addLike }) {

  const likedIndex = post.likes.findIndex(like => like.username === loggedUser.username);
  const likeColor = likedIndex > -1 ? 'red' : 'grey';
  const clickHandlerLike = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)

  const [showFullCaption, setShowFullCaption] = useState(false)
  const [text, setText] = useState('')
  const [comments, setComments] = useState([]);

  const clickHandler = () => deletePost(post._id)

  const toggleCaption = () => {
    setShowFullCaption(!showFullCaption)
  }


  // --------------------------------------------------------------------------------------------------------------

    async function handleSubmit(e){
      e.preventDefault();
  
      try {
        const response = await fetch(`/api/posts/${post._id}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer " + tokenService.getToken(),
          },
          body: JSON.stringify({ text }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to add comment');
        }
  
        // Reset form fields after successful submission
        setText('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };

    // ----------------------------------------------------------------------------------------------------------------
  return (

    <Card>
      {isProfile ? null : (
        <Card.Content textAlign="left">
          <Link to={`/${post.user.username}`}>
            <Image
              floated="left"
              size="large"
              avatar
              src={
                post.user.photoUrl
                ? post.user.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
              }
              />
            <Card.Header floated="right">{post.user.username}</Card.Header>
          </Link>
        </Card.Content>
      )}

      <Card.Content style={{display: "flex", textAlign: "center", justifyContent: "center", fontSize: "15px", fontWeight: "600", color: "#cc8989"}}>{post.title}</Card.Content>
      <Image src={`${post.photoUrl}`} wrapped ui={false} />

      <Card.Content>
        {showFullCaption ? (
          <>
            <Card.Description>{post.caption}</Card.Description>
            <Card.Description style={{color: "grey", fontSize: "12px", cursor: "pointer"}} onClick={toggleCaption}>Show less</Card.Description>
          </>
        ) : (
          <>
            <Card.Description>{post.caption.substring(0, 20)}...</Card.Description>
            <Card.Description style={{color: "grey", fontSize: "12px", cursor: "pointer"}} onClick={toggleCaption}>Show more</Card.Description>
          </>
        )}
      </Card.Content>

      {isProfile && loggedUser.username === post.user.username && <Button onClick={clickHandler}>DELETE</Button>}

      <Card.Content extra textAlign={"right"}>
        <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandlerLike}/>
        {post.likes.length} Likes
      </Card.Content>

      <Card.Content>
        {post.comments.map(comment => (
          <div key={comment._id}>
            <p>{comment.text}</p>
            <p>By: {comment.username}</p>
          </div>
        ))}
      </Card.Content>

      {loggedUser && (
        <Card.Content>
          <form onSubmit={handleSubmit}>
            <label>Comment:</label>
            <textarea name="text" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <input type="submit" value="Add Comment" />
          </form>
        </Card.Content>
      )}

      </Card>
  );
}
