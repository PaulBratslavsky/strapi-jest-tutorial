module.exports = {
  type: 'content-api',
  routes: [
    {
      method: 'POST',
      path: '/create',
      handler: 'todoController.index',
      config: {
        policies: [],
      },
    },
  ],
}
