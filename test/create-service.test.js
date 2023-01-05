//testing the create service
const createService = require('../server/services/create')
describe('Create Service', () => {
  let strapi
  beforeEach(async function () {
    strapi = {
      query: jest.fn().mockReturnValue({
        create: jest.fn().mockReturnValue({
          data: {
            name: 'test',
            status: false,
          }
        })
      })
    }
  })
  it('should create a todo', async function () {
    const name = 'test'
    const todo = await createService({ strapi }).create({ name })
    expect(strapi.query('plugin::todo.todo').create).toBeCalledTimes(1)
    expect(todo.data.name).toBe('test')
  })
})