import { Form, Formik, getIn, useFormikContext } from 'formik'
import { Input, Submit } from 'formstrap'
import React from 'react'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import { Book } from '@book-store/server/types/book'
import MediaImage from 'src/components/MediaImage'
import {
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  FormGroup,
  Label,
  Row,
} from 'reactstrap'
import { FormikCurrencyInput } from 'src/components/CurrencyInput'
import { Api } from 'src/config/Api'

const AddBook = () => {
  const history = useHistory()
  const initialValues = {
    title: '',
    genre: '',
    author: '',
    publisher: '',
    price: 0,
    description: '',
    images: [] as any,
  } as Book

  const onSave = async (values: Book) => {
    try {
      let form = new FormData()

      form.set('title', values.title)
      form.set('genre', values.genre)
      form.set('author', values.author)
      form.set('publisher', values.publisher)
      form.set('price', values.price as any)
      form.set('description', values.description)
      values.images.forEach((v, i) => {
        const arrayKey = `images`
        form.append(arrayKey, v as any)
      })

      const res = await Api().post('/book/add', form)

      if (res.status === 200) {
        history.push('/book')
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Card>
        <CardBody>
          <CardTitle>Add Book</CardTitle>
          <CardSubtitle>Please fill out this form</CardSubtitle>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              title: Yup.string().required(),
              genre: Yup.string().required(),
              author: Yup.string().required(),
              publisher: Yup.string().required(),
              price: Yup.number().required().min(1),
              images: Yup.array().required(),
              description: Yup.string().required(),
            })}
            onSubmit={onSave}
          >
            <Form encType="multipart/form-data">
              <Row>
                <Col md>
                  <FormGroup>
                    <Label>Cover Image</Label>
                    <InputMediaImage />
                  </FormGroup>
                  <FormGroup>
                    <Label>Author</Label>
                    <Input name="author" />
                  </FormGroup>

                  <FormGroup>
                    <Label>Publisher</Label>
                    <Input name="publisher" />
                  </FormGroup>
                </Col>
                <Col md>
                  <FormGroup>
                    <Label>Title</Label>
                    <Input name="title" />
                  </FormGroup>

                  <FormGroup>
                    <Label>Genre</Label>
                    <Input name="genre" />
                  </FormGroup>

                  <FormGroup>
                    <Label>Price</Label>
                    <FormikCurrencyInput name="price" />
                  </FormGroup>

                  <FormGroup>
                    <Label>Description</Label>
                    <Input name="description" type="textarea" />
                  </FormGroup>
                </Col>
              </Row>
              <Submit color="primary" withSpinner>
                Save
              </Submit>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </>
  )
}

export const InputMediaImage = () => {
  const { values, setFieldValue, errors, touched } = useFormikContext()
  const error = getIn(errors, 'images')
  const touch = getIn(touched, 'images')

  return (
    <div>
      <MediaImage
        multiple
        maxFiles={2}
        error={error && touch ? true : false}
        value={getIn(values, 'images') || []}
        onChange={(value) => setFieldValue('images', value)}
      />
      {error && touch && (
        <div className="text-danger mt-2">
          <small>{error}</small>
        </div>
      )}
    </div>
  )
}

export default AddBook
