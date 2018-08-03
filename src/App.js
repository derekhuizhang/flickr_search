import React, { Component } from 'react';
import { Container, Header, Segment, Form, Button } from 'semantic-ui-react';
import './App.css';

import ImageView from './ImageView.js';
const axios = require('axios');
const url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=3e7cc266ae2b0e0d78e279ce8e361736&format=json&nojsoncallback=1&safe_search=1&text="

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query : '',
      images : [],
      newest_images_length: 0,
      error : false,
      page : 1,
      submitted: false,
    };
    this.getImages = this.getImages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    this.setState({
      images : [],
      error : false,
      page : 1
    }, this.getImages());
    event.preventDefault();
  }

  getImages() {
    let photo_urls = [];
    axios.get(url + this.state.query + `&page=${this.state.page}`)
      .then((response) => {
        let photos = response.data.photos.photo;
        photo_urls = photos.map(photo => `http://farm${photo.farm}.static.flickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`);
        this.setState({
          images: this.state.images.concat(photo_urls),
          page: this.state.page + 1,
          newest_images_length: photo_urls.length,
          submitted: true
        });
      })
      .catch((err) => {
        this.setState({
          images: [],
          newest_images_length: 0
        });
        console.log(err);
      });
  }

  render() {

    return (
      <div className='wrapper'>
        <Container>
          <Segment>
            <Header as='h2' textAlign='center'>
              Flickr Search
            </Header>

             <div>
                <p>Enter a search for your image!</p>
             </div>

             <div className='form'>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Input name='query' onChange={this.handleChange} />
                  <Button type='submit' value='Submit'>Submit</Button>
                </Form>
             </div>

            <ImageView submitted={this.state.submitted} length={this.state.newest_images_length} images={this.state.images}/>

            <div>
                {(this.state.newest_images_length > 0 && this.state.submitted) ?
                  <Button onClick = {() => this.getImages()} content="Load more..." style={{topMargin:"25px"}}/> : (<div></div>)}
            </div>
          </Segment>
        </Container>
      </div>
    );
  }
}

export default App;
