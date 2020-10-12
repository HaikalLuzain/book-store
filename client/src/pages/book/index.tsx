import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Book } from '@book-store/server/types/book'
import { Button, Card, CardBody, CardTitle, Table } from 'reactstrap'
import { Api } from 'src/config/Api'

const BookPage = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      try {
        const {
          data: { books },
        } = await Api().get('/book')
        setBooks(books)
      } catch (e) {
        console.log(e)
      }
    }

    getBooks()
    // return
  }, [])

  return (
    <>
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div>
              <CardTitle className="text-uppercase">Books</CardTitle>
            </div>
            <div className="ml-auto d-flex no-block align-items-center mb-3">
              <div className="dl">
                <Link to="/book/add">
                  <Button color="primary">Add Book</Button>
                </Link>
              </div>
            </div>
          </div>
          <Table className="no-wrap v-middle font-weight-light mb-0" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">#</th>
                <th className="border-0 text-uppercase">Title</th>

                <th className="border-0 text-uppercase">Author</th>
                <th className="border-0 text-uppercase">Genre</th>
                <th className="border-0 text-uppercase">Publisher</th>
                <th className="border-0 text-uppercase">Price</th>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map((book: Book, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{book.title}</td>

                    <td>
                      <span className="text-uppercase">{book.author}</span>
                    </td>
                    <td>{book.genre}</td>
                    <td>{book.publisher}</td>
                    <td className="text-success">{book.price}</td>
                    <td>
                      <Button>Option</Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          {!books.length && (
            <div className="text-center py-5 mb-5">
              <h3>Tidak ada buku</h3>
              <p>Mulai menambahkan buku anda</p>
              <Link to="/book/add">
                <Button color="primary">Add Book</Button>
              </Link>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  )
}

export default BookPage
