const nanoid = require('nanoid');
const books = require('./model/books');

const getBooksHandler = (request, h) => {
  const {name, reading, finished} = request.query;
  let myBooks = [...books];

  if (name !== undefined) {
    myBooks = books.filter((book) => {
      if (book.name.toUpperCase().includes(name.toUpperCase())) {
        return true;
      }
    });
  }

  if (reading !== undefined) {
    myBooks = books.filter((book) => {
      const readingCek = reading == 1 ? true : false;
      if (book.reading === readingCek) {
        return true;
      }
    });
  }

  if (finished !== undefined) {
    myBooks = books.filter((book) => {
      const finishedCek = finished == 1 ? true : false;
      if (book.finished === finishedCek) {
        return true;
      }
    });
  }

  return h.response({
    status: 'success',
    data: {
      books: myBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
};

const showBookByIdHandler = (request, h) => {
  const {bookId: id} = request.params;
  const book = books.filter((book) => book.id === id)[0];

  if (book !== undefined) {
    return h.response({status: 'success', data: {book}});
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

const storeBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (typeof name !== 'string' || name.length < 1) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    const message =
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount';
    return h.response({status: 'fail', message}).code(400);
  }

  const id = nanoid(16);
  const finished = pageCount == readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const book = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(book);
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {bookId: id},
    }).code(201);
  }

  return h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

const updateBookByIdHandler = (request, h) => {
  const {bookId: id} = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (typeof name !== 'string' || name.length < 1) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    const message =
      'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount';
    return h.response({
      status: 'fail',
      message,
    }).code(400);
  }

  const updatedAt = new Date().toISOString();
  const finished = pageCount == readPage;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books[bookIndex] = {
      ...books[bookIndex],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

const deleteBookByIdHandler = (request, h) => {
  const {bookId: id} = request.params;
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    return h.response({
      'status': 'success',
      'message': 'Buku berhasil dihapus',
    });
  }

  return h.response({
    'status': 'fail',
    'message': 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = {
  getBooksHandler,
  showBookByIdHandler,
  storeBookHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
