import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PostCard({ post, isProfile, loggedUser, deletePost, removeLike, addLike }) {

  const likedIndex = post.likes.findIndex(like => like.username === loggedUser.username);
  const likeColor = likedIndex > -1 ? 'red' : 'grey';
  const clickHandlerLike = likedIndex > -1 ? () => removeLike(post.likes[likedIndex]._id) : () => addLike(post._id)

  const [showFullCaption, setShowFullCaption] = useState(false)

  const clickHandler = () => deletePost(post._id)

  const toggleCaption = () => {
    setShowFullCaption(!showFullCaption)
  }
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

      </Card>
  );
}
