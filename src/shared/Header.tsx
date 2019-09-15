import * as React from "react";
import {Navbar, Image, Dropdown, Nav} from "react-bootstrap";
import {NavbarText} from "react-bootstrap/Navbar";

export default class Header extends React.Component {
    render() {
        return <React.Fragment>
            <Navbar className="colorAccent" bg="light" variant="light">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={require("../assets/img/logo.png")}
                        width="70"
                        height="70"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <h1>givr</h1>
                <Nav.Link className={"ml-auto"} href="https://www.redcross.ca/"> Canadian Red Cross </Nav.Link>
                <Dropdown className={"mr-4"}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <Image rounded={true}
                            src={require("../assets/img/company.jpg")}
                            alt="profile photo"
                            height={50}
                            width={50}
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Settings</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Profile</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Sign out</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar>
        </React.Fragment>;
    }
}
