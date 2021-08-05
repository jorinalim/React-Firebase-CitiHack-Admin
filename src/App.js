import './App.css';
import db from './config';
import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container, Table, InputGroup, FormControl, Button} from 'react-bootstrap'
import Main from './Main'

function App() {

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">CitiLife</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/transactions">Transactions</Nav.Link>
            <Nav.Link href="/vouchers">Vouchers</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Main />
    </div>
  );
}

export default App;