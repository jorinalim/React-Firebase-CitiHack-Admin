import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
function SignIn(
) {
    const handleSubmitClick = ()=> { 

    }

    return (
        <div class="App">
            <div class="signin-container">
                <Container>
                    <Row>
                        <Col></Col>
                        <Col xs={5}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                                <Button variant="outline-primary" type="submit" href = "/transactions">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
export default SignIn;