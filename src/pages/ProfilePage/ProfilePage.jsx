import { Grid } from "semantic-ui-react"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import tokenService from "../../utils/tokenService";




export default function ProfilePage({loggedUser, handleLogout}) {

  const [posts, setPosts] = useState([])
  const [profileUser, setProfileUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const {username} = useParams() // comes from the params, defined in the app.jsx routes <Route path="/:username" .. >
  console.log(username, "username -- useParams"); 

  useEffect(() => {
    getProfileInfo();
  }, [username])

  async function getProfileInfo() {
    try {
      
      const response = await fetch(`/api/users/${username}`, {
        method: "GET",
        headers: {
          // convention for sending jwts, tokenService is imported above
          Authorization: "Bearer " + tokenService.getToken(), // < this is how we get the token from localstorage
          //and and it to our api request
          // so the server knows who the request is coming from when the client is trying to make a POST
        },
      });
      //.ok property comes from fetch, and it checks the status code, since profile not found
      // is a 404 the code throws to the fetch block
      if (!response.ok)
        throw new Error("Whatever you put in here goes to the catch block");
      // this is recieving and parsing the json from express
      const data = await response.json();
      console.log(data);
      setLoading(false);
      setPosts(data.data);
      setProfileUser(data.user);
      setError(""); // set error back to blank after successful fetch
    } catch (err) {
      console.log(err.message);
      setError("Profile Does Not Exist! Check the Terminal!");
      setLoading(false);
    }
  }



  if (error) {
    return (
      <>
        <Header loggedUser={loggedUser} handleLogout={handleLogout} />
        <h1>{error}</h1>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Header loggedUser={loggedUser} handleLogout={handleLogout} />
        <h1>Loading....</h1>
      </>
    );
  }

  return(
        <Grid>
    <Grid.Row>
        <Grid.Column>
          <Header loggedUser={loggedUser} handleLogout={handleLogout} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row  style={{marginTop: "100px"}}>
        <Grid.Column>
          <ProfileBio user={profileUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750, margin: "15px"}}>
         <PostFeed itemsPerRow={4} isProfile={true} posts={posts}  loggedUser={loggedUser}/> 
        
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}