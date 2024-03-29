import { Card, Icon, Image, Button, CardContent } from "semantic-ui-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentsComponent from "../CommentsComponent/CommentsComponent"
import tokenService from "../../utils/tokenService";
import "./PostCard.css"

export default function PostCard({ post, isProfile, loggedUser, deletePost, removeLike, addLike, handleSubmitComment }) {

  const likedIndex = post.likes.findIndex(like => like.username === loggedUser.username);
  const likeColor = likedIndex > -1 ? 'red' : 'grey';
  const clickHandlerLike = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)

  const [showFullCaption, setShowFullCaption] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [text, setText] = useState('')
  const [comments, setComments] = useState([]);

  const clickHandler = () => deletePost(post._id)

  const toggleCaption = () => {
    setShowFullCaption(!showFullCaption)
  }
  const toggleComments = () => {
    setShowComments(!showComments)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleSubmitComment(text, post._id)
    setText("")
  };

  return (

    <Card>
      {isProfile ? null : (
        <Card.Content textAlign="left">
          <Link to={`/${post.user.username}`} style={{display: "flex", alignItems: "center"}}>
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
            <Card.Header style={{marginBottom: "15px"}} floated="right">{post.user.username}</Card.Header>
          </Link>
        </Card.Content>
      )}

      <Card.Content style={{display: "flex", textAlign: "center", justifyContent: "center", fontSize: "15px", fontWeight: "600", color: "#cc8989"}}>{post.title}</Card.Content>
      <Image style={{margin: "10px"}} src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
  {showFullCaption ? (
    <>
      {post.caption.length > 20 ? (
        <>
          <Card.Description>{post.caption}</Card.Description>
          <Card.Description style={{color: "#4183C4", fontSize: "12px", cursor: "pointer"}} onClick={toggleCaption}>Show less</Card.Description>
        </>
      ) : (
        <>
          <Card.Description>{post.caption}</Card.Description>
        </>
      )}
    </>
  ) : (
    <>
      {post.caption.length > 20 ? (
        <>
          <Card.Description>{post.caption.substring(0, 20)}...</Card.Description>
          <Card.Description style={{color: "#4183C4", fontSize: "12px", cursor: "pointer"}} onClick={toggleCaption}>Show more</Card.Description>
        </>
      ) : (
        <>
          <Card.Description>{post.caption}</Card.Description>
        </>
      )}
    </>
  )}
</Card.Content>


      <Card.Content extra textAlign={"right"}>
        <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandlerLike}/>
        {post.likes.length} Likes
      </Card.Content>

      {showComments && loggedUser && (
    <Card.Content>
        <>
            <p style={{fontWeight: "bold"}}>Comments:</p>
            {post.comments.map(comment => (
                <div key={comment._id} style={{display: "flex", gap: "10px"}}>
                    <p style={{color: "grey", fontSize:"12px"}}>{comment.username} : <span style={{color: "black"}}>{comment.text}</span></p>
                </div>
            ))}
            <p onClick={toggleComments} style={{textAlign: "center", color: "#4183C4"}}>Hide comments</p>
        </>
    </Card.Content>
)}

          {!showComments && (
            <CardContent>
              <p onClick={toggleComments} style={{textAlign: "center", color: "#4183C4"}}>Show comments</p>
            </CardContent>
          )}

          <CommentsComponent handleSubmitComment={handleSubmitComment}/>
          {loggedUser && (
          <form onSubmit={handleSubmit} style={{display:"flex", alignItems: "center", justifyContent: "space-between", flexDirection: "column", gap: "10px"}}>
            <label style={{
              fontSize: "15px"
            }}>Comment:</label>
            <textarea style={{border: "1px solid #E0E1E2", width: "90%"}}name="text" value={text} onChange={(e) => setText(e.target.value)}></textarea>
            <input style={{
              backgroundColor: "#4183C4",
              border: "none",
              borderRadius: "5px",
              fontSize: "60%",
              fontFamily: "Arial",
              width: "80px",
              padding: "5px 10px",
              color: "#D4EAFF",
              marginBottom: "10px"              
            }}type="submit" value="ADD COMMENT" />
          </form>
      )}





{isProfile && loggedUser.username === post.user.username && <Button onClick={clickHandler}>DELETE POST</Button>}
      </Card>
  );
}