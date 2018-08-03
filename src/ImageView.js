import React, { Component } from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

class ImageView extends Component{
  displayImages(props) {
    if (this.props.length > 0){
      return (
        <div>
          <Grid relaxed columns={4}>
            {this.props.images.map((image) => (
              <Grid.Column>
                <Image src = {image} centered />
              </Grid.Column>
            ))}
          </Grid>
        </div>
      );
    }
    else {
      return (
        <Header as='h3' textAlign='center'>
          No images found!
        </Header>
      );
    }
  }

  render(props) {
    return(
      <div className='imageView'>
          {this.props.submitted
            ? this.displayImages() : (<div></div>)}
      </div>
    );
  }
}

export default ImageView;
