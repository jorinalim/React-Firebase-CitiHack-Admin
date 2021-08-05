import './App.css';
import db from './config';
import React, { useState, useEffect } from 'react';
import { Table, InputGroup, FormControl, Button, Form, Row, Col, ToastBody } from 'react-bootstrap'

function Transaction() {
    const [trans, setTrans] = useState([])
    const [redeemF, setRedeemF] = useState("all_select")
    const [transDateF, setTransDateF] = useState("all_transact")
    const [filtered, setFiltered] = useState(false)
    const [filteredList, setFilteredList] = useState([])

    const fetchData = () => {
        setTrans([]);
        db.collection("userVoucher")
            .get()
            .then((querySnapShot) => {
                querySnapShot.forEach((doc) => {
                    doc.data().userRef.get().then((snapshot) => { //snapshot: get user data
                        doc.data().voucherTypeRef.get().then((snapshot2) => { //snapshot2: get voucher data
                            snapshot2.data().merchant.get().then((snapshot3) => {//snapshot3: get merchant data
                                doc.data().userRef.get().then((snapshot4) => { //snapshot 4: get user data
                                    if (doc.data().cashierRef !== null) {
                                        doc.data().cashierRef.get().then((snapshot5) => { //snapshot 5: get cashier data
                                            console.log(snapshot4.data())
                                            var date = doc.data().createdAt.toDate();
                                            var new_create = { "doc": doc.data(), "voucher": snapshot2.data(), "merchant": snapshot3.data(), "trans_date": date, "user_data": snapshot4.data(), "cashier": snapshot5.data() };

                                            setTrans(trans => [...trans, new_create])
                                        })
                                    }
                                    else {
                                        console.log(snapshot4.data())
                                        var date = doc.data().createdAt.toDate();
                                        var new_create = { "doc": doc.data(), "voucher": snapshot2.data(), "merchant": snapshot3.data(), "trans_date": date, "user_data": snapshot4.data(), "cashier": {"email": ""}};

                                        setTrans(trans => [...trans, new_create])
                                    }

                                })
                            })
                        })
                    })
                })
            })
    }

    const handleSearchClick = () => {
        setFiltered(true);
        setFilteredList([]);
        var filterText = []
        var searchTxt = document.getElementById("search-text").value.toUpperCase();
        console.log("i am clicked with search txt" + searchTxt + " redemem value " + redeemF + " trans value " + transDateF);

        trans.forEach((trans) => {
            if (searchTxt !== "") {
                if (trans.user_data.email.toUpperCase().includes(searchTxt) || trans.merchant.name.toUpperCase().includes(searchTxt)) {
                    filterText.push(trans)
                }
            }
            else {
                filterText.push(trans)
            }
        })
        console.log(filterText);
        var filterRedeemState = [];
        filterText.forEach((trans) => {
            if (redeemF == "all_select") {
                filterRedeemState.push(trans);
            }
            else if (redeemF == "purchased_only") {
                if (trans.cashier.email == "") {
                    filterRedeemState.push(trans);
                }
            }
            else {
                //redeemed 
                if (trans.cashier.email !== "") {
                    filterRedeemState.push(trans);
                }
            }
        })
        console.log(filterRedeemState);
        const today = new Date();
        filterRedeemState.forEach((trans) => {
            if (transDateF == "today_only") {
                if (trans.trans_date.getDate() == today.getDate()) {
                    setFilteredList(filteredList => [...filteredList, trans]);
                }
            }
            else if (transDateF == "past_7_days") {
                var date = new Date();
                var dateRange = date.getDate() - 7;
                if (trans.trans_date.getDate() > dateRange) {
                    setFilteredList(filteredList => [...filteredList, trans]);
                }
            }
            else if (transDateF == "past_month") {
                if (trans.trans_date.getMonth() == today.getMonth()) {
                    setFilteredList(filteredList => [...filteredList, trans]);
                }
            }
            else {
                setFilteredList(filteredList => [...filteredList, trans]);
            }
        })
    }
    const handleRedeemRdbChange = (e) => {
        console.log(e.target.id);
        setRedeemF(e.target.id);
    }
    const handleDateRdbChange = (e) => {
        console.log(e.target.id);
        setTransDateF(e.target.id);
    }
    useEffect(() => {
        fetchData();
        console.log(trans)
    }, [])


    return (
        <div className="App">
            <div class="table-body">
                <div class="table-title">
                    <h1>Transactions</h1>
                </div>
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search user's email or merchant name"
                        aria-label="search-txt"
                        aria-describedby="basic-addon1"
                        id="search-text"
                    />
                    <Button variant="outline-secondary" id="button-addon1" onClick={handleSearchClick}>
                        Search
                    </Button>
                </InputGroup>
                <br />
                <Form.Group as={Row} className="mb-3" >
                    <Form.Label as="legend" column sm={2}>
                        Transaction Date
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Check
                            type="radio"
                            label="Today"
                            name="trans_rdb"
                            id="today_only"
                            onChange={handleDateRdbChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Past 7 Days"
                            name="trans_rdb"
                            id="past_7_days"
                            onChange={handleDateRdbChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Past Month"
                            name="trans_rdb"
                            id="past_month"
                            onChange={handleDateRdbChange}
                        />
                        <Form.Check
                            type="radio"
                            label="All"
                            name="trans_rdb"
                            id="all_transact"
                            onChange={handleDateRdbChange}
                            defaultChecked
                        />
                    </Col>
                    <Form.Label as="legend" column sm={2}>
                        Redeemed
                    </Form.Label>
                    <Col sm={4}>
                        <Form.Check
                            type="radio"
                            label="Redeemed"
                            name="redeem_rdb"
                            id="Redeemed"
                            onChange={handleRedeemRdbChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Purchased Only"
                            name="redeem_rdb"
                            id="purchased_only"
                            onChange={handleRedeemRdbChange}
                        />
                        <Form.Check
                            type="radio"
                            label="All"
                            name="redeem_rdb"
                            id="all_select"
                            onChange={handleRedeemRdbChange}
                            defaultChecked
                        />
                    </Col>
                </Form.Group>
                <br />

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>User Email</th>
                            <th>Cashier Email</th>
                            <th>Merchant</th>
                            <th>Price</th>
                            <th>Payment Mode</th>
                            <th>Transaction Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            !filtered && trans && trans.map(trans => {
                                return (
                                    <tr>
                                        <td>{trans.user_data.email}</td>
                                        <td>{trans.cashier.email}</td>
                                        <td>{trans.merchant.name}</td>
                                        <td>${trans.voucher.costDollar} | {trans.voucher.costPoints} Points</td>
                                        <td>{trans.doc.paymentType}</td>
                                        <td>{trans.trans_date.toString()}</td>
                                    </tr>
                                )
                            })
                        }
                        {
                            filtered && filteredList && filteredList.map(trans => {
                                return (
                                    <tr>
                                        <td>{trans.user_data.email}</td>
                                        <td>{trans.cashier.email}</td>
                                        <td>{trans.merchant.name}</td>
                                        <td>${trans.voucher.costDollar} | {trans.voucher.costPoints} Points</td>
                                        <td>{trans.doc.paymentType}</td>
                                        <td>{trans.trans_date.toString()}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>

                </Table>
            </div>
        </div>
    );
}

export default Transaction;