const {
  getBooksHandler,
  showBookByIdHandler,
  storeBookHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
} = require('./books-handler');

const serverRouters = [
  {
    path: '/books',
    method: 'post',
    handler: storeBookHandler,
  },
  {
    path: '/books',
    method: 'get',
    handler: getBooksHandler,
  },
  {
    path: '/books/{bookId}',
    method: 'get',
    handler: showBookByIdHandler,
  },
  {
    path: '/books/{bookId}',
    method: 'put',
    handler: updateBookByIdHandler,
  },
  {
    path: '/books/{bookId}',
    method: 'delete',
    handler: deleteBookByIdHandler,
  },
  {
    path: '/{any*}',
    method: '*',
    handler: (_request, h) => {
      const response = h.response({
        status: 'fail',
        message: 'Page not found 404',
      });
      response.code(404);
      return response;
    },
  },
];

module.exports = serverRouters;
