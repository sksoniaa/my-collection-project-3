import { Card, Icon, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PostCard({ post, isProfile, loggedUser, deletePost }) {

  const clickHandler = () => deletePost(post._id)
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
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
      {loggedUser.username === post.user.username && <Button onClick={clickHandler}>DELETE</Button>}
    </Card>
  );
}
