let todoController = require('../server/controllers/todo-controller');

describe('Submit Controller', () => {
  let strapi
  beforeEach(async function () {
    // mock this teh strapi object to allow for calling of create  await strapi.plugin('todo').service('create').create({ name })
    strapi = {
      plugin: jest.fn().mockReturnValue({
        service: jest.fn().mockReturnValue({
          create: jest.fn().mockReturnValue({
            data: {
              name: 'test',
              status: false,
            }
          }),
          complete: jest.fn().mockReturnValue({
            data: {
              id: 1,
              status: true,
            }
          })

        })
      })
    }
  })
  it('should create a todo', async function () {
    const ctx = {
      request: {
        body: {
          name: 'test'
        }
      },
      body: null
    }
    await todoController({strapi}).index(ctx)
    // expect the body to be 'created'
    expect(ctx.body).toBe('created')
    // expect create to be called once
    expect(strapi.plugin('todo').service('create').create).toBeCalledTimes(1)
  })
  it('should complete a todo', async function(){
    const ctx = {
      request: {
        body: {
          id: 1
        }
      },
      body: null
    }
    await todoController({strapi}).complete(ctx)
    // expect the body to be 'todo completed'
    expect(ctx.body).toBe('todo completed')
    // expect complete to be called once
    expect(strapi.plugin('todo').service('complete').complete).toBeCalledTimes(1)
  })
})