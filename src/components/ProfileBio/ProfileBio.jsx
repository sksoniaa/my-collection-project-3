import {  Image, Grid, Segment } from 'semantic-ui-react';
import './ProfileBio.css'


function ProfileBio({user}) { 
  return (
  <Grid textAlign='center' columns={2}>
    <Grid.Row>
      <Grid.Column>
        <Image style={{borderRadius: "50%", border: "2px solid white"}}src={`${user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} `} avatar size='small' />
      </Grid.Column>
      <Grid.Column textAlign="left" style={{ maxWidth: 450 }}>
        <Segment vertical>
           <h3 style={{color: "white", textShadow: "0 0 3px black"}}>{user.username}</h3>
        </Segment>
        <Segment>
           <span> Bio: {user.bio}</span>
        </Segment>
          
      </Grid.Column>
    </Grid.Row>
  </Grid>

  );
}



export default ProfileBio;