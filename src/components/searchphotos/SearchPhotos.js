import React, { Component } from 'react'
import Unsplash, { toJson } from 'unsplash-js';
import Image from '../images/Image'
import { Spinner } from 'react-bootstrap'

const queryString = require('query-string');



export const unsplash = new Unsplash({
    applicationId: "a3d3bf11fb2edf1a7eb5f10a3f636a0559eba6dd199af83547d674f067d1f452",
    secret: "ee0fb70bd9999de167f0b2fc0b86f026d48d713fe626d760d54f41246164ee7f",
    headers: { 'Access-Control-Allow-Origin': '*' }
});

class SearchPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            images: [],
            start: 1,
            count: 30,
            error: false,
            searchQuery: ""
        }
    }
    componentDidMount() {
        const { start, count } = this.state


        const parsed = queryString.parse(window.location.search);
        this.setState({ searchQuery: parsed.query })

        unsplash.search.photos(parsed.query, start, count)
            .then(toJson)
            .then(json => {
                if (json.results.length > 0) {
                    this.setState({ error: false, images: json.results })
                    console.log(json)
                } else if (json.results.length === 0) {
                    this.setState({ error: true, isLoaded: true })
                }
            })
            .catch(err => {
                console.log(err, 'there was an error')
                this.setState({ isLoaded: true })
            })
    }

    imagesLoaded = parentNode => {
        const imgElements = parentNode.querySelectorAll("img");

        for (const img of imgElements) {
            if (img.complete) {
                return true;
            }
        }
        return false;
    }
    handleStateChange = () => {
        this.setState({
            isLoaded: this.imagesLoaded(this.galleryElement),
        });
    }
    renderLoadingHeader = () => {
        if (this.state.isLoaded) {
            // Render nothing if not loading
            return null;
        }
        return (
            <Spinner
                style={{
                    position: "absolute",
                    top: '50%',
                    bottom: '50%',
                    left: '50%',
                    right: '50%',
                }}
                animation="border"
                role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }


    render() {
        const { images, searchQuery } = this.state
        let errMsg = this.state.error ? <h3>Whoops, "{searchQuery}" isn't in our photo album! Try searching something else.</h3> : null
        return (
            <div style={{ width: '80%', margin: '20px auto', paddingTop: '76px' }}>
                {errMsg}
                {this.state.error ? null : (
                    <div className="gallery" ref={element => { this.galleryElement = element; }}>
                        <h1 className="text-left my-5">Displaying results for "{searchQuery}"
                        </h1>

                        {this.renderLoadingHeader()}
                        <div className="images">
                            {images.map(image => {
                                return (
                                    <div className="wow fadeIn">
                                        <Image
                                            image={image}
                                            key={image.id}
                                            id={image.id}
                                            src={image.urls.regular}
                                            alt={image.description}
                                            handleStateChange={this.handleStateChange}
                                        />
                                    </div>
                                )
                            })}
                        </div>

                    </div>

                )}
            </div>
        )
    }
}

export default SearchPhotos
