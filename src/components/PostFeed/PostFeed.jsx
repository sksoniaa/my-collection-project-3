import PostCard from '../PostCard/PostCard'
import { Card } from 'semantic-ui-react'

export default function PostFeed({posts, itemsPerRow, isProfile, loggedUser, deletePost, addLike, removeLike}){
	

		const postCards = posts.map((post) => {
			return <PostCard post={post} key={post._id} isProfile={isProfile} deletePost={deletePost} loggedUser={loggedUser} addLike={addLike} removeLike={removeLike}/> 
		})
	
		return (
		   <Card.Group itemsPerRow={itemsPerRow}>
			{postCards}
		   </Card.Group>
		)
    
}