import { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'

export default function AddPostForm({handleAddPost}) {


  const [state, setState] = useState({
    title: '',
    caption: ''
  })

  const [photo, setPhoto] = useState({})
  
  function handleFileInput(e) {
    setPhoto(e.target.files[0])
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', state.title)
    formData.append('caption', state.caption)
    formData.append('photo', photo)
    handleAddPost(formData)
  }

  return(
    <Segment style={{marginTop: "100px"}}>
      <Form autocomplete="off" onSubmit={handleSubmit}>
        
      <Form.Input
          className='form-control'
          name="title"
          value={state.title}
          placeholder="Did you get a new perfume? 💌"
          onChange={handleChange}
          required
        />
        <Form.Input
          className='form-control'
          name="caption"
          value={state.caption}
          placeholder="How do you like it?"
          onChange={handleChange}
        />
        <Form.Input
          className='form-control'
          type="file"
          name="photo"
          placeholder="upload image"
          onChange={handleFileInput}
          required
        />
        <Button type='submit' className='button'>
          ADD PERFUME
        </Button>
      </Form>
    </Segment>
  )
}