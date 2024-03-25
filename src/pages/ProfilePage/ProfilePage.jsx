import { Grid } from "semantic-ui-react"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostFeed from "../../components/PostFeed/PostFeed";
import tokenService from "../../utils/tokenService";
import AddPostForm from "../../components/AddPostForm/AddPostForm";




export default function ProfilePage({loggedUser, handleLogout, addPostPage, handleAddPost, deletePost}) {

  const [posts, setPosts] = useState([])
  const [profileUser, setProfileUser] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const {username} = useParams() // comes from the params, defined in the app.jsx routes <Route path="/:username" .. >
  console.log(username, "username -- useParams"); 



  async function handleSubmitComment() {
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
      setText("reload the page")
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  }

  async function deletePost(postId){
    console.log(postId, "THIS IS THE LOG BEFORE THE TRY IN THE DELETERECIPE FUNCTION")
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        } 
      })

      const data = await response.json()
      console.log(data, ' response from delete recipe')
      getProfileInfo(); // call getPosts to sync you data and update state
      // so the like is removed from the array 
    } catch(err){
      console.log(err)
    }
  }
  
  async function handleAddPost(postToSendToServer) {
    console.log(postToSendToServer, " formData from addPost form");

    try {
      // Since we are sending a photo
      // we are sending a multipart/formdData request to express
      // so express needs to have multer setup on this endpoint!
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: postToSendToServer, // < No jsonify because we are sending a photo
        headers: {
            // convention for sending jwts, tokenService is imported above
            Authorization: "Bearer " + tokenService.getToken() // < this is how we get the token from localstorage 
            //and and it to our api request
            // so the server knows who the request is coming from when the client is trying to make a POST
          }
      })
  
      const data = await response.json();
      //       res.status(201).json({ post }); this value is from express/posts/create controller
      console.log(data, ' response from post request! This from express')
      setPosts([data.post, ...posts])
    } catch(err){
      console.log(err.message)
      console.log('CHECK YOUR SERVER TERMINAL!!!!')
    }
  }

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
  

  async function addLike(postId){ // postId comes from the card component
    // where we call this function
    try {
      const response = await fetch(`/api/posts/${postId}/likes`, {
        method: 'POST',
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        }
      })

      const data = await response.json();
      console.log(data, ' response from addLike')
      getProfileInfo(); // Refetch the posts, which updates the state, 
      // the post will now have the user in inside of the 
      // post.likes array
    } catch(err){
      console.log(err)
    }
  }

  async function removeLike(likeId){
    try {
      const response = await fetch(`/api/likes/${likeId}`, {
        method: 'DELETE',
        headers: {
          // convention for sending jwts in a fetch request
          Authorization: "Bearer " + tokenService.getToken(),
          // We send the token, so the server knows who is making the
          // request
        } 
      })

      const data = await response.json()
      console.log(data, ' response from delete like')
      getProfileInfo(); // call getPosts to sync you data and update state
      // so the like is removed from the array 
    } catch(err){
      console.log(err)
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
    <>
        <Grid>
    <Grid.Row>
        <Grid.Column>
          <Header loggedUser={loggedUser} handleLogout={handleLogout} addPostPage={addPostPage}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row  style={{marginTop: "100px"}}>
        <Grid.Column>
          <ProfileBio user={profileUser}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750, margin: "15px"}}>
         <PostFeed handleSubmitComment={handleSubmitComment} itemsPerRow={3} isProfile={true} posts={posts}  loggedUser={loggedUser} deletePost={deletePost} addLike={addLike} removeLike={removeLike}/> 
         {loggedUser.username === username && <AddPostForm handleAddPost={handleAddPost} />}
        
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </>
  )
}