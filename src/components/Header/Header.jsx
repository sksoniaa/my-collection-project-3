import { Header, Segment, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import './Header.css'

export default function PageHeader({ loggedUser, handleLogout }) {
    console.log(handleLogout)
  return (
    <Segment clearing>
      <Header as="h2" floated="right" style={{marginTop: "20px"}}>
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
        <Link to="" onClick={handleLogout}>
          Logout
        </Link>
      </Header>
      <Header as="h2" floated="left">
        <Link to={`/${loggedUser.username}`} className="user-link">
          <Image
            src={
              loggedUser.photoUrl
              ? loggedUser.photoUrl
              : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            className="user-icon"
            avatar
            >
          </Image>
            <h3>{loggedUser.username}</h3>
        </Link>
      </Header>
    </Segment>
  );
}