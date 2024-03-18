import tokenService from '../../utils/tokenService';

import { Grid } from "semantic-ui-react";
import { useState, useEffect } from 'react'

import PostFeed from "../../components/PostFeed/PostFeed";
import Header from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";


export default function FeedPage({loggedUser, handleLogout}) {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

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

  return(
    <Grid centered>
    <Grid.Row>
      <Grid.Column>
      <Header loggedUser={loggedUser} handleLogout={handleLogout}/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 450 }}>
        <AddPostForm  handleAddPost={handleAddPost}/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column style={{ maxWidth: 450 }}>
       {loading ? <h1>Loading...</h1> : <PostFeed  posts={posts} itemsPerRow={1} isProfile={false} addLike={addLike} removeLike={removeLike} loggedUser={loggedUser}/> } 
      </Grid.Column>
    </Grid.Row>
  </Grid>
  )
}