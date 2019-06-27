import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { id, src, alt, handleStateChange } = this.props

        return (
            <Link to={`/details/${id}`}>
                <img
                    id={id}
                    src={src}
                    alt={alt}
                    style={{ margin: '10px', cursor: 'pointer' }}
                    onLoad={handleStateChange}
                    onError={handleStateChange}
                />
            </Link >
        )

    }
}
export default Image