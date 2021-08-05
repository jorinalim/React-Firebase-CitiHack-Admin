import './App.css';
import db from './config';
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Form, Table, InputGroup, FormControl, Button, Modal } from 'react-bootstrap'

function Voucher() {
    const [voucher, setVoucher] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const fetchData = () => {
        setVoucher([]);
        db.collection("voucherType")
            .get()
            .then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    console.log(doc.data); 
                    doc.data().merchant.get().then((snapshot) => { //snapshot: get merchant data
                        console.log(snapshot);
                        var new_create = { "doc": doc.data(), "merchant": snapshot.data() };
                        console.log(new_create);
                        setVoucher(voucher => [...voucher, new_create])
                    })
                })
            })
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleClose = () => {
        setModalShow(false);
    }

    const handleSearchClick = () => {
        setFiltered(true);
        setFilteredList([]);
        var searchTxt = document.getElementById("search-text").value.toUpperCase();
        voucher.forEach((v) => {
            if (searchTxt !== "") {
                if (v.doc.name.toUpperCase().includes(searchTxt)) {
                    setFilteredList(filteredList => [...filteredList, v]);
                }
            }
            else {
                setFilteredList(filteredList => [...filteredList, v]);
            }
        })
    }

    const handleSaveNew = () => { 
        console.log(document.getElementById("voucher-name").value);
        db.collection("voucherType").add({
            name: document.getElementById("voucher-name").value,
            terms: {
                "additionalDetails": document.getElementById("terms").value,
                "validityDays": document.getElementById("validity").value
            },
            costDollar: document.getElementById("cost-dollars").value, 
            costPoints: document.getElementById("cost-points").value, 
            count: document.getElementById("qty-available").value, 
            merchant: db.doc('merchant/' + document.getElementById("merchant-ref").value)
        })
        .then(() => {
            console.log("Document successfully written!");
            setModalShow(false);
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });

        fetchData();
    }

    return (
        <div className="App">
            <div class="table-body">
                <div class="table-title">
                    <h1>Vouchers</h1>
                </div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search voucher name"
                        aria-label="search-txt"
                        aria-describedby="basic-addon1"
                        id="search-text"
                    />
                    <Button variant="outline-secondary" id="button-addon1" onClick={handleSearchClick}>
                        Search
                    </Button>
                </InputGroup>
                <div className="addnewcontainer">
                    <Button variant="primary" onClick={() => setModalShow(true)}> + New Voucher</Button>
                </div>
                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Merchant</th>
                            <th>Available Qty</th>
                            <th>Cost</th>
                            <th>Terms</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !filtered && voucher && voucher.map(v => {
                                return (
                                    <tr>
                                        <th>{v.doc.name}</th>
                                        <td>{v.merchant.name}</td>
                                        <td> {v.doc.count}</td>
                                        <td>${v.doc.costDollar} | {v.doc.costPoints} Points</td>
                                        <td>
                                            <b>Details: </b>{v.doc.terms.additionalDetails} <br />
                                            <b>Validity: </b> {v.doc.terms.validityDays} Days<br />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {
                            filtered && filteredList && filteredList.map(v => {
                                return (
                                    <tr>
                                        <th>{v.doc.name}</th>
                                        <td>{v.merchant.name}</td>
                                        <td> {v.doc.count}</td>
                                        <td>${v.doc.costDollar} | {v.doc.costPoints} Points</td>
                                        <td>
                                            <b>Details: </b>{v.doc.terms.additionalDetails} <br />
                                            <b>Validity: </b> {v.doc.terms.validityDays} Days<br />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
            </div>


            <Modal show={modalShow} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Add New Voucher</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Voucher Name</InputGroup.Text>
                        <FormControl aria-label="First name" placeholder="e.g: $5 Off Yu Kee" id = "voucher-name"/>
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Merchant Ref</InputGroup.Text>
                        <FormControl aria-label="First name" placeholder="e.g: Food Republic" id = "merchant-ref"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Quantity Available</InputGroup.Text>
                        <FormControl aria-label="First name" placeholder="e.g: 100" id = "qty-available"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Validity</InputGroup.Text>
                        <FormControl aria-label="First name" placeholder="e.g: 30 Days" id = "validity"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text>Price</InputGroup.Text>
                        <FormControl aria-label="First name" placeholder="Points" id = "cost-points"/>
                        <FormControl aria-label="Last name" placeholder="Dollars" id = "cost-dollars"/>
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Text>Terms</InputGroup.Text>
                        <FormControl as="textarea" aria-label="With textarea" id = "terms"/>
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outlined-secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveNew}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Voucher;