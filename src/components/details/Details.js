import React, { Component } from 'react'
import {createApi} from 'unsplash-js';
import { Row, Col, Button, Spinner, OverlayTrigger, Tooltip } from 'react-bootstrap'


const unsplash = createApi({
    apiUrl: "https://photix-server.netlify.app/.netlify/functions/index/unsplash"
});

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {
                urls: {},
                user: {
                    profile_image: {
                    }
                },
                location: {},
                tags: [],
                exif: {},

            },
        }
    }
    getFormattedDate = date => {
        const d = new Date(date)
        const year = d.getFullYear();

        const monthNum = d.getMonth();

        let month;

        switch (monthNum) {
            case 0:
                month = 'January'
                break;
            case 1:
                month = 'February'
                break;
            case 2:
                month = 'March'
                break;
            case 3:
                month = 'April'
                break;
            case 4:
                month = 'May'
                break;
            case 5:
                month = 'June'
                break;
            case 6:
                month = 'July'
                break;
            case 7:
                month = 'August'
                break;
            case 8:
                month = 'September'
                break;
            case 9:
                month = 'October'
                break;
            case 10:
                month = 'November'
                break;
            case 11:
                month = 'December'
                break;
            default:
                month = monthNum
        }

        let day = d.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        return `${month} ${day}, ${year}`;
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        unsplash.photos.get({
            photoId: id
        })
            .then(result => {
                console.log(result);
                if (result.errors) {
                    console.log(result.errors);
                } else {
                    this.setState({ image: result.response.response })
                }

            })
            .catch(err => console.log(err));
    }

    addCommasToNum = num => {
        return String(num).replace(/(.)(?=(\d{3})+$)/g, '$1,')
    }
    
    render() {
        const { image } = this.state;

        // Info for columns about the photo's views, likes, and downloads.
        const views = this.addCommasToNum(image.views)
        const likes = this.addCommasToNum(image.likes)
        const downloads = this.addCommasToNum(image.downloads)

        // Info for column about the photo's camera info.
        const cameraInfoEntriesArray = Object.entries(image.exif)

        //Check if image has loaded. If not, return loading spinner
        if (!image.views) {
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
        return (
            <div className="animated fadeIn" style={{ paddingTop: '58px' }}>
                <div style={{ backgroundColor: 'rgb(33,33,36)' }}>

                    <Row className="mr-0 ml-4 p-3">
                        <span onClick={this.props.history.goBack} className="p-0 whiteFont" style={{ cursor: 'pointer' }}>
                            <i className="text-white fas fa-arrow-circle-left"></i> Go back
                    </span>
                    </Row>
                    <Row className="mx-0 pb-4 justify-content-center">
                        <img
                            className={`${image.width > image.height ? ('landscapeOrient') : ('portraitOrient')}`}
                            id={image.id}
                            src={image.urls.regular}
                            alt={image.alt_description}
                            style={{ margin: '10px' }}
                        />
                    </Row>
                </div>
                <div className="text-left wow fadeIn" style={{ width: '80%', margin: "auto" }}>

                    <Row className="mx-0 p-3">
                        <Col xs='12' lg="6">
                            <Row>

                                <span>
                                    <div className="d-inline-block">
                                        <a className="text-muted rounded-circle" href={`https://unsplash.com/@${image.user.username}`} target="blank">
                                            <img src={image.user.profile_image.medium} className="rounded-circle respProfilePic" alt="Profile" /></a>
                                    </div>
                                    <div className="d-inline-block align-middle mx-3">

                                        <h5>{image.user.name}</h5>
                                        <a className="text-muted respDetailsLink" href={`https://unsplash.com/@${image.user.username}`} target="blank">@{image.user.username}</a>
                                    </div>
                                    <div style={{ fontSize: ".85em" }} className='my-2'><i className="fas fa-map-marker-alt"></i> {image.location.title !== null ? (`Taken in ${image.location.title}`) : (<i>Taken somewhere on earth</i>)} </div>
                                </span>
                            </Row>
                            <hr />
                            <Row>

                                <Col className="mb-2" xs="12">
                                    <h6><i className="fas fa-camera mr-2"></i>Camera Info:</h6>
                                </Col>
                                {cameraInfoEntriesArray.map((cur, index) => {
                                    return (
                                        <Col key={index} xs="6" sm="4">
                                            <p className="text-muted" style={{ fontSize: '12px' }}>{cur[0].replace('_', ' ')}</p>
                                            <p className="respDetailsPara">{cur[1]}</p>
                                        </Col>
                                    )
                                })}

                            </Row>
                            <hr />
                        </Col>
                        <Col xs="12" lg="6">
                            <Row>
                                <Col className="respDetailsPara" xs="6"><i className="fas fa-eye"></i> {` ${views}`}
                                    <p className="text-muted">{(image.views === 1) ? ('view') : ('views')}</p>
                                </Col>
                                <Col className="respDetailsPara" xs="6"><i className="fas fa-thumbs-up"></i>
                                    {` ${likes}`}
                                    <p className="text-muted">{(image.likes === 1) ? ('like') : ('likes')}</p>
                                </Col>
                                <Col className="respDetailsPara" xs="6"><i className="fas fa-arrow-down"></i>
                                    {` ${downloads}`}
                                    <p className="text-muted">{(image.downloads === 1) ? ('download') : ('downloads')}</p>
                                </Col>
                                <Col className="respDetailsPara" xs="6">
                                    Published on {this.getFormattedDate(image.created_at)}
                                </Col>
                            </Row>
                            <hr />
                            <Row>

                                <Col>
                                    <h6>Color:</h6>
                                    <div className="d-inline-block">
                                        <li>
                                            {image.color}
                                        </li>
                                    </div>
                                    <li className="ml-2"
                                        style={{
                                            border: '1px solid lightgray',
                                            position: 'relative',
                                            top: '4px',
                                            display: 'inline-block',
                                            borderRadius: '3px',
                                            width: '20px',
                                            height: '20px',
                                            backgroundColor: `${image.color}`
                                        }}></li>
                                </Col>
                            </Row>
                            <hr />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>
                            <h6>
                                <OverlayTrigger
                                    key='top'
                                    placement='top'
                                    overlay={
                                        <Tooltip id={`tooltip-top`}>
                                            Click on any tag to display search results.
                                    </Tooltip>}>
                                    <i className="far fa-question-circle mr-2"></i>
                                </OverlayTrigger>
                                Related Tags:</h6>
                            {image.tags.map((cur, i) => {
                                return (
                                    <Button
                                        onClick={() => window.location.href = `/search/?query=${cur.title}`}
                                        style={{ fontSize: '12px' }}
                                        key={i}
                                        className='m-1'
                                        variant="light">
                                        {cur.title}
                                    </Button>
                                )
                            })}
                        </Col>
                    </Row>
                </div>
            </div >
        )
    }
}

export default Details
