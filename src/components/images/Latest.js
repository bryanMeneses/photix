import React, { Component } from 'react'
import { Spinner, Form, FormControl, Button } from 'react-bootstrap'
import Image from './Image';
import InfiniteScroll from "react-infinite-scroll-component";

class Latest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            collections: [],
            isLoaded: false,
            images: [],
            page: 1,
            perPage: 15,
            searchfield: ''
        }
    }
    componentDidMount() {
        const { page, perPage } = this.state

        // This call fills the main gallery's first 15 pictures
        // Don't know why Unsplash browser API isn't working but this call to our own api works just fine.
        fetch(`http://localhost:9000/.netlify/functions/index/unsplash/photos?per_page=${perPage}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    console.log(data.erorrs);
                } else {
                    this.setState({
                        images: data.response.results,
                        page: page + 1,
                    })
                }
            })

        // unsplash.photos.list({
        //     page: 1,
        //     perPage: 15,
        // })
        //     .then(result => {
        //         console.log(result);
        //         // if (result.errors) {
        //             // console.log(result.errors);
        //         // } else {
        //             console.log(result);
        //             this.setState({ images: result.response.results })
        //         // }
        //     })
        //     .catch(err => console.log(err))

    };

    onSearchSubmit = e => {
        e.preventDefault()
        const { searchfield } = this.state

        window.location.href = `/search?query=${searchfield}`
    }

    onSearchChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchMoreImages = () => {
        const { page, perPage, images } = this.state
        fetch(`http://localhost:5000/unsplash/photos?per_page=${perPage}&page=${page}`)
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    console.log(data.erorrs);
                } else {
                    this.setState({ images: images.concat(data.response.results) })
                }
            })

        this.setState({ page: page + 1 })
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
        const { images } = this.state
        return (
            <div>
                {(!images[0]) ? null : (

                    <div className="fixedBGLatest" style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.4),rgba(0,0,0,0.4)),url(https://images.unsplash.com/photo-1620408991409-37585ff089a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MTkwMnwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMTE2NTMxNw&ixlib=rb-1.2.1&q=80&w=1080)`
                    }}>
                        <div className="text-left text-white" style={{ width: '80%', margin: "0px auto", paddingTop: '200px' }}>
                            <h1 className="display-4" style={{ fontWeight: '400' }} >Our Latest Collection</h1>
                            <h5>Browse high definition images uploaded by users like you</h5>

                            <Form onSubmit={this.onSearchSubmit} inline>
                                <FormControl
                                    style={{ width: '60%' }}
                                    required
                                    value={this.state.searchfield}
                                    name="searchfield"
                                    onChange={this.onSearchChange}
                                    type="text"
                                    placeholder="Search"
                                    className="mr-sm-2 mr-2 my-3" />
                                <Button type="submit" variant="light">Search</Button>
                            </Form>
                            <p>Try something like {' '}
                                <span
                                    className="text-link"
                                    onClick={() => window.location.href = `/search?query=black and white`}>
                                    "black and white"
                                </span>, {' '}
                                <span
                                    className="text-link"
                                    onClick={() => window.location.href = `/search?query=nature`}>
                                    "nature"
                                </span>, or {' '}
                                <span
                                    className="text-link"
                                    onClick={() => window.location.href = `/search?query=flower`}>
                                    "flower"
                                </span>.
                            </p>
                        </div>


                    </div>
                )}

                <div style={{ width: '90%', margin: '20px auto' }} className="gallery" ref={element => { this.galleryElement = element; }}>
                    <InfiniteScroll
                        dataLength={this.state.images.length}
                        next={this.fetchMoreImages}
                        hasMore={true}
                        loader={<Spinner animation="border" role="status"> <span className="sr-only">Loading...</span>
                        </Spinner>}
                    >
                        {this.renderLoadingHeader()}
                        <div className="images" >
                            {images.map((image, i) => {
                                return (
                                    <Image
                                        key={i}
                                        image={image}
                                        id={image.id}
                                        src={image.urls.small}
                                        alt={image.description}
                                        handleStateChange={this.handleStateChange}
                                    />
                                )
                            })}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        )
    }
}



export default Latest
