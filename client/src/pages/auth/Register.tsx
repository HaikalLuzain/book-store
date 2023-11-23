import { User } from '@book-store/server/types/user'
import { Form, Formik, FormikHelpers, getIn, useFormikContext } from 'formik'
import { Input, Submit } from 'formstrap'
import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  Alert,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Label,
  Row,
} from 'reactstrap'
import { Api } from 'src/config/Api'
import * as Yup from 'yup'

const AlertMessage = () => {
  const { status } = useFormikContext()
  const success = getIn(status, 'success') || null
  const error = getIn(status, 'error') || null
  return success || error ? (
    <Alert color={success ? 'success' : 'danger'}>{success || error}</Alert>
  ) : (
    <></>
  )
}

const Register: React.FC = () => {
  const history = useHistory()
  // const [error, setError] = useState('')

  const initialValue = {
    name: '',
    email: '',
    password: '',
  } as User

  const onRegister = async (
    data: any,
    { setErrors, setStatus }: FormikHelpers<any>
  ) => {
    setStatus({})
    try {
      const res = await Api().post('auth/register', data)

      console.log(res)

      if (res.status === 200) {
        history.push('/login')
      }
    } catch (e) {
      if (e.errors) {
        setErrors(e.errors)
      } else if (e.message) {
        setStatus({ error: e.message })
      }
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={5} className="mx-auto">
          <Card className="shadow">
            <CardBody>
              <CardTitle>Register Form</CardTitle>
              <CardSubtitle>Please fill out the form below</CardSubtitle>

              <Formik
                initialValues={initialValue}
                validationSchema={Yup.object().shape({
                  name: Yup.string().required().min(3),
                  email: Yup.string().required().email(),
                  password: Yup.string().required().min(6),
                  confirmPassword: Yup.string().oneOf(
                    [Yup.ref('password'), null],
                    "Password doesn't match"
                  ),
                })}
                onSubmit={onRegister}
              >
                <Form>
                  <FormGroup>
                    <Label>Name</Label>
                    <Input name="name" />
                  </FormGroup>

                  <FormGroup>
                    <Label>Email</Label>
                    <Input name="email" type="email" />
                  </FormGroup>

                  <FormGroup>
                    <Label>Password</Label>
                    <Input name="password" type="password" />
                  </FormGroup>

                  <FormGroup>
                    <Label>Confirm Password</Label>
                    <Input name="confirmPassword" type="password" />
                  </FormGroup>

                  <AlertMessage />

                  <Submit color="primary">Register</Submit>
                </Form>
              </Formik>
            </CardBody>
          </Card>

          <div className="text-center">
            Already have an account? <Link to="/login">Login here</Link>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Register
