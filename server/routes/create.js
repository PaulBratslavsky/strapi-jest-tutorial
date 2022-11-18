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
    {
      method: 'POST',
      path: '/complete',
      handler: 'todoController.complete',
      config: {
        policies: [],
      },
    },
  ],
}
