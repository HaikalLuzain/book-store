import { Formik, Form } from 'formik'
import { Submit, Input } from 'formstrap'
import React, { useState } from 'react'
import {
  Alert,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
} from 'reactstrap'
import * as Yup from 'yup'
import { Api } from 'src/config/Api'
import { Link } from 'react-router-dom'

const Login = () => {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const handleLogin = async (values) => {
    setStatus('')
    try {
      const res = await Api().post('/auth/login', values)

      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        window.location.pathname = '/dashboard'
      }
    } catch (e) {
      setStatus('danger')
      if (e.errors) {
        setMessage(e.errors)
      } else if (e.message) {
        setMessage(e.message)
      }
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={5} className="mx-auto">
          <Card className="shadow">
            <CardBody>
              <CardTitle>Login Form</CardTitle>
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                onSubmit={handleLogin}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email().required(),
                  password: Yup.string().required(),
                })}
              >
                <Form>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input type="text" name="email" />
                  </FormGroup>

                  <FormGroup>
                    <Label>Password</Label>
                    <Input type="password" name="password" />
                  </FormGroup>

                  {status && message && <Alert color={status}>{message}</Alert>}

                  <Submit color="primary" block withSpinner>
                    Login
                  </Submit>
                </Form>
              </Formik>
            </CardBody>
          </Card>

          <div className="text-center">
            Don't have an account? <Link to="/register">Register here</Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
