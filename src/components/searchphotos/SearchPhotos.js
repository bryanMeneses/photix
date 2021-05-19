import React, { Component } from 'react'
import {createApi} from 'unsplash-js';
import Image from '../images/Image'
import { Spinner } from 'react-bootstrap'
import queryString from 'query-string';


const unsplash = createApi({
    apiUrl: "https://photix-server.netlify.app/.netlify/functions/index/unsplash"
})

class SearchPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            images: [],
            page: 1,
            perPage: 30,
            error: false,
            searchQuery: ""
        }
    }

    componentDidMount() {
        const { page, perPage } = this.state


        const parsed = queryString.parse(window.location.search);
        this.setState({ searchQuery: parsed.query })

        console.log(parsed.query);

        unsplash.search.getPhotos({
            query: parsed.query,
            page,
            perPage,
        })
            .then(result => {
                console.log(result);
                if (result.errors || result.response.response.results.length === 0) {
                    this.setState({ 
                        error: true, 
                        isLoaded: true
                    });
                } else {
                    this.setState({
                        error: false,
                        isLoaded: true,
                        images: result.response.response.results
                    })
                }
            })
            .catch(err => {
                    this.setState({ 
                        error: true, 
                        isLoaded: true
                    });
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
        let errMsg = this.state.error && <h3>Whoops, "{searchQuery}" isn't in our photo album! Try searching something else.</h3>
        return (
            <div style={{ width: '90%', margin: '20px auto', paddingTop: '76px' }}>
                {errMsg}
                {this.state.error ? null : (
                    <div className="gallery" ref={element => { this.galleryElement = element; }}>
                        <h1 className="text-left my-5">Displaying results for "{searchQuery}"
                        </h1>

                        {this.renderLoadingHeader()}
                        <div className="images">
                            {images.map(image => {
                                return (

                                    <Image
                                        image={image}
                                        key={image.id}
                                        id={image.id}
                                        src={image.urls.regular}
                                        alt={image.description}
                                        handleStateChange={this.handleStateChange}
                                    />

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
