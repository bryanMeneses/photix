import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchfield: '',
        }
    }
    onSearchSubmit = e => {
        e.preventDefault();

        const { searchfield } = this.state;

        window.location.href = `/search/?query=${searchfield}`;

        this.setState({ searchfield: '' })
    }

    onSearchChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    routeChange = path => {
        this.props.history.push(path);
    }

    render() {
        return (
            <Navbar collapseOnSelect className="customNav" expand='lg' variant="dark" fixed='top'>
                <Navbar.Brand style={{ margin: '2px 0 0 5px', fontFamily: "'Calligraffitti', cursive" }} href="/">Photix</Navbar.Brand>
                <p className="text-muted" style={{ fontSize: '.75em', margin: '1.5em 0 0 5px', float: 'left' }}>
                    <i className="fas fa-bolt"></i> Powered by Unsplash API</p>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link
                            eventKey={2}
                            onClick={() => this.routeChange('/')}
                            className="nav-link mr-3 whiteFont">
                            <i className="fas fa-home"></i> Home
                        </Nav.Link>
                        <Nav.Link
                            eventKey={2}
                            onClick={() => this.routeChange("/latest")}
                            className="nav-link mr-3 whiteFont">
                            <i className="fas fa-rss"></i> Latest
                        </Nav.Link>
                        <Nav.Link
                            eventKey={2}
                            onClick={() => this.routeChange("/about")}
                            className="nav-link mr-3 whiteFont"> About
                        </Nav.Link>
                        <Form
                            onSubmit={this.onSearchSubmit}
                            style={{ margin: 'auto' }}
                            inline
                        >
                            <FormControl
                                required value={this.state.searchfield}
                                onChange={this.onSearchChange}
                                type="text"
                                placeholder="Search"
                                className="mr-2 respTextInput"
                                name="searchfield"
                            />
                            <Button type="submit" variant="outline-light">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}

export default withRouter(Header);