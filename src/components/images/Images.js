import React, { Component } from 'react'
import Unsplash, { toJson } from 'unsplash-js';
import { Spinner, Form, FormControl, Button } from 'react-bootstrap'
import Image from './Image';
import InfiniteScroll from "react-infinite-scroll-component";




const unsplash = new Unsplash({
    applicationId: "a3d3bf11fb2edf1a7eb5f10a3f636a0559eba6dd199af83547d674f067d1f452",
    secret: "ee0fb70bd9999de167f0b2fc0b86f026d48d713fe626d760d54f41246164ee7f",
    headers: { 'Access-Control-Allow-Origin': '*' }
});

class Images extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: [],
            isLoaded: false,
            images: [],
            start: 1,
            count: 15,
            randomImage: {
                urls: {}
            },
            searchfield: ''
        }
    }
    componentDidMount() {
        const { start, count } = this.state

        // This call fills the main gallery's first 15 pictures
        unsplash.photos.listPhotos(start, count, 'popular')
            .then(toJson)
            .then(data => {
                this.setState({ images: data })
            })
            .catch(err => console.log(err))

        // This call gets a random photo for the top sections background image
        unsplash.photos.getRandomPhoto({ query: 'black and white' })
            .then(toJson)
            .then(json => {
                this.setState({ randomImage: json })
            })
            .catch(err => console.log(err));
    };

    onSearchSubmit = e => {
        e.preventDefault()
        const { searchfield } = this.state

        window.location.href = `/search/?query=${searchfield}`
        this.setState({ searchfield: '' })
    }


    onSearchChange = e => {
        this.setState({ searchfield: e.target.value })
    }
    fetchMoreImages = () => {
        const { start, count, images } = this.state
        this.setState({ start: start + count })
        unsplash.photos.listPhotos(start, count, 'latest')
            .then(toJson)
            .then(data => {
                this.setState({ images: images.concat(data) })
            })
            .catch(err => console.log(err))

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
        const { images, randomImage } = this.state
        return (
            <div className="animated fadeIn">
                {(!images[0]) ? null : (

                    <div className="fixedBGLatest" style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(${randomImage.urls.regular})`
                    }}>
                        <div className="text-left text-white" style={{ width: '80%', margin: "0px auto", paddingTop: '200px' }}>
                            <h1 className="display-4" style={{ fontWeight: '400' }} >Our Latest Collection</h1>
                            <h5>Browse high definition images uploaded by users like you</h5>

                            <Form onSubmit={this.onSearchSubmit} inline>
                                <FormControl style={{ width: '60%' }} required value={this.state.searchfield} onChange={this.onSearchChange} type="text" placeholder="Search" className="mr-sm-2 mr-2 my-3" />
                                <Button type="submit" variant="light">Search</Button>
                            </Form>
                            <p>Try something like {' '}
                                <span
                                    className="text-link"
                                    onClick={() => window.location.href = `/search/?query=black and white`}>
                                    "black and white"
                                </span>, {' '}
                                <span
                                    className="text-link"
                                    onClick={() => window.location.href = `/search/?query=wallpaper`}>
                                    "wallpaper"
                                </span>, or {' '}
                                <span
                                    className="text-link"
                                    onClick={() => window.location.href = `/search/?query=flower`}>
                                    "flower"
                                </span>.
                            </p>
                        </div>


                    </div>
                )}

                <div style={{ width: '80%', margin: '20px auto' }} className="gallery" ref={element => { this.galleryElement = element; }}>
                    <InfiniteScroll
                        dataLength={this.state.images.length}
                        next={this.fetchMoreImages}
                        hasMore={true}
                        loader={<Spinner animation="border" role="status"> <span className="sr-only">Loading...</span>
                        </Spinner>}
                    >
                        {this.renderLoadingHeader()}
                        <div className="images" >
                            {images.map(image => {
                                return (
                                    <div className='wow fadeIn' key={image.id}>

                                        <Image
                                            image={image}
                                            id={image.id}
                                            src={image.urls.regular}
                                            alt={image.description}
                                            handleStateChange={this.handleStateChange}
                                        />
                                    </div>

                                )
                            })}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}



export default Images
