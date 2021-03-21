import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/esm/Form';
import Modal from 'react-bootstrap/esm/Modal';
import RequestHandler from '../api/RequestHandler';
import withRouterProps, { WithRouterProps } from '../components/withRouterProps';
import IInstitution from '../interfaces/institution.interface';
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';

interface SignUpViewProps extends WithRouterProps { }

interface SignUpViewState {
  institutions: IInstitution[];
}

class SignUpView extends React.Component<SignUpViewProps, SignUpViewState> {

  state: SignUpViewState = {
    institutions: [],
  }

  async onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await RequestHandler.post("/signup", event);
    this.props.history.push("/signin");
  }

  async getInstitutions() {
    const response = await RequestHandler.get("/institutions/all");
    const institutions = response as IInstitution[];
    if (institutions != null) {
      this.setState({ institutions: institutions });
    }
  }

  componentDidMount() {
    this.getInstitutions();
  }

  render() {
    return (
      <Modal show={true}>
        <Form onSubmit={this.onSubmit.bind(this)}>
          <Modal.Dialog>
            <Modal.Title style={{ textAlign: "center" }}>
              <h3 style={{ padding: "40px 0" }}>Sign up</h3>
              <Form.Text>
                Already have an account? <Link className="link" to="/sigin">Sign in here</Link>
              </Form.Text>
            </Modal.Title>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control name="username" placeholder="Username" required />
              </Form.Group>
              <Form.Group>
                <Row style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                  <Col>
                    <Form.Label>First name</Form.Label>
                    <Form.Control name="firstName" placeholder="First name" required />
                  </Col>
                  <Col>
                    <Form.Label>Last name</Form.Label>
                    <Form.Control name="lastName" placeholder="Last name" required />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
                  <Col>
                    <Form.Label>Institution</Form.Label>
                    <Form.Control as="select" name="institution" required>
                      {this.state.institutions?.map((institution: IInstitution, index: number) => (
                        <option key={index} value={institution.id}>{institution.name}</option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col>
                    <Form.Label>Account Type</Form.Label>
                    <Form.Control as="select" name="privilege" required>
                      <option value="0">Student</option>
                      <option value="1">Moderator</option>
                      <option value="2">Educator</option>
                      <option value="3">Admin</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password1" placeholder="Password" required />
              </Form.Group>
              <Form.Group>
                <Form.Label>Repeat password</Form.Label>
                <Form.Control type="password" name="password2" placeholder="Repeat password" required />
              </Form.Group>
              <Form.Group>
                <Button type="submit">Sign up</Button>
              </Form.Group>
            </Modal.Body>
          </Modal.Dialog>
        </Form>
      </Modal>
    )
  }

}

export default withRouterProps(SignUpView);