import React, {Component} from 'react'
import {Carousel} from 'react-bootstrap'

class Slide extends Component{

    render(){
        return(
            <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__340.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3 color="black" >First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
        )
    }
}

export default Slide;
