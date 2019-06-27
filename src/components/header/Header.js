import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchfield: '',
        }
    }
    onSearchSubmit = e => {
        e.preventDefault()
        const { searchfield } = this.state

        window.location.href = `/search/?query=${searchfield}`
        this.setState({ searchfield: '' })
    }


    onSearchChange = e => {
        this.setState({ searchfield: e.target.value })
    }
    render() {
        return (
            <Navbar className="customNav" collapseOnSelect expand='lg' variant="dark" fixed='top'>
                <Navbar.Brand style={{ margin: '2px 0 0 5px', fontFamily: "'Calligraffitti', cursive" }} href="/">Photix</Navbar.Brand>
                <p className="text-muted" style={{ fontSize: '.75em', margin: '1.5em 0 0 5px', float: 'left' }}>
                    <i className="fas fa-bolt"></i> Powered by Unsplash API</p>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/" className="nav-link mr-3 whiteFont"><i className="fas fa-home"></i> Home</Link>
                        <Link to="/latest" className="nav-link mr-3 whiteFont">
                            <i className="fas fa-rss"></i> Latest</Link>
                        <Link to="/about" className="nav-link mr-3 whiteFont"> About</Link>
                        <Form onSubmit={this.onSearchSubmit} style={{ margin: 'auto' }} inline>
                            <FormControl required value={this.state.searchfield} onChange={this.onSearchChange} type="text" placeholder="Search" className="mr-2 respTextInput" />
                            <Button type="submit" variant="outline-light">Search</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar >
        )
    }
}

export default Header