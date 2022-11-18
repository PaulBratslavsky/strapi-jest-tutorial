| .         | .                                          |
| --------- | ------------------------------------------ |
| Title     | How To Add Unit Test To Your Strapi Plugin |
| Author    | Cameron Paczek                             |
| Meta Desc |           Testing is a very important part of software development. It allows you to ensure that your code is working as expected and that it will continue to work as expected in the future. In this article, we'll be looking how to add unit tests using the [Jest](https://jestjs.io/) testing framework to your Strapi plugin.                                 |
| Word Count          |   ~1400                                         |


## Outline

* Introduction
* Prerequisites
* What Is Jest
* Creating Our First Test Suite
* Creating Our First Test
* Running Tests
* Automatically Run Tests With GitHub Actions
* Conclusion

## Introduction
Testing is a very important part of software development. It allows you to ensure that your code is working as expected and that it will continue to work as expected in the future. In this article, we'll be looking at how to add unit tests using the [Jest](https://jestjs.io/) testing framework to your Strapi plugin.

The code for this tutorial is based on a simple todo plugin which you can find [here](https://github.com/excl-networks/strapi-jest-tutorial)
## Prerequisites

To follow along with this post you will need the following

- [A v4 Strapi Plugin](https://strapi.io/blog/how-to-create-a-strapi-v4-plugin-generate-a-plugin-1-6)
- Understanding of Javascript
- Understanding of Strapi
- A basic understanding of Jest
- Git and GitHub (Required for Actions)

## What Is Jest
Jest is a testing framework for Javascript. It is a very popular testing framework and is used by many large companies such as Facebook, Airbnb, and Netflix. Jest is a very powerful testing framework and has many features that make it easy to write tests. Jest is also very fast and can run tests in parallel.

Unit tests are aimed at testing individual parts of your code. They are used to ensure that your code is working as expected. Unit tests are very important as they allow you to ensure that your code is working as expected and that it will continue to work as expected in the future.

### Installing Jest
To install Jest, run the following command in your terminal

```bash
npm install --save-dev jest
```
or
```bash
yarn add --dev jest
```

Then in your package.json file add the following

```json
{
  "scripts": {
    "test": "jest"
  }
}
```

### Configuring Jest
Jest has a lot of global configuration variables but for the purpose of this tutorial, we are going to leave everything as the default. If you want to learn more about how to configure Jest, you can read the [Jest documentation](https://jestjs.io/docs/configuration). 
First, we are going to create a new folder to store all of our tests, you should create this in the root of your application and the name is `tests`.

All tests are going to end with `.test.js` (or `.test.ts`). We can go ahead and create our first test file. Create a new file called `tests/todo-controller.test.js` and add the following code to it.


## Creating Our First Test Suite

In `./server/controllers/todo-controller.js` we have a very simple controller:
```js
module.exports = ({ strapi }) => ({
  async index(ctx) {
    const { name } = ctx.request.body
    await strapi.plugin('todo').service('create').create({ name })
    return ctx.body = 'created'
  },
  async complete(ctx) {
    const { id } = ctx.request.body
    await strapi.plugin('todo').service('complete').complete({ id })
    return ctx.body = 'todo completed'
  },
})
```
This controller allows us to create a todo and complete a todo. We are going to write two tests, one for each of these functions.

To create our first test suite we are going to create a new file called `tests/todo-controller.test.js` and add the following code to it.

```js
let todoController = require('../server/controllers/todo-controller');

describe('Todo Controller', () => {
  it('should create a todo', async function () {
    // TODO: Write test
  })
})
```

We want to import the `todoController` so that we can call the functions that we want to test. We then create a test suite called `Todo Controller` and then we create a test called `should create a todo`. We are going to write our test inside of the `it` function.

## Creating Our First Test

We are going to create a test to test the index function. When making a unit test it's easiest to test pure functions (i.e functions that don't call other functions) however we have a different service that we are calling in our index function. We are going to use a mock function to mock the service that we are calling.


### Mocking the Strapi Object

Because we are only testing the index function we are just going to mock any external calls. You typically want to do this for any functions that are being called. 

To mock the `strapi` object we are going to use the `jest.mock` function. We are going to mock the `strapi.plugin('todo').service('create').create` function. We are going to mock this function so that we can test that it is being called with the correct arguments.

We don't need to mock up the entire `strapi` object only the parts that are being used in this function. Since we are going to have multiple tests we want to reset the strapi object every time we run a test. To do this we are going to use the `beforeEach` function. This function will run before every test and will reset the `strapi` object.

Within your describe function call `beforeEach()` with a `async function` as a callback parameter.

```js
let todoController = require('../server/controllers/todo-controller');

describe('Todo Controller', () => {
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
    // TODO: Write test
  })
})
```

As you can see we are mocking `plugin()`, `service()` and `create()`. We are also returning a mock object from `create()`

### Mocking Request `ctx`

Now that we mocked up the `strapi` object we need to mock the `ctx` object. The `ctx` object is the request object that is passed into the controller. Because each test is going to have a different `ctx` object we are going to mock it within each test instead of mocking it globally.

Within our `it()` function add this code

```js
 it('should create a todo', async function () {
    const ctx = {
      request: {
        body: {
          name: 'test'
        }
      },
      body: null
    }
  })
```
This `ctx` object mimics the `ctx` object that would be passed into the controller if we were actually running `strapi`.

### Extending Mocking to Your Code

This is a very simplistic example of mocking the `strapi` and `ctx` object but as a rule, you should look through your code and mock any external calls that you are making. This will allow you to test your code without having to worry about external calls. Remember it may also be easier to re-arrange your code so that you are testing pure functions.

### Calling the Controller

Now that we have mocked the `strapi` and `ctx` objects we can call the controller. We are going to call the `index()` function and pass in the `ctx` object.

```js
  it('should create a todo', async function () {
    const ctx = {
      request: {
        body: {
          name: 'test'
        }
      },
      body: null
    }
    // call the index function
    await todoController({strapi}).index(ctx)
    // expect the body to be 'created'
    expect(ctx.body).toBe('created')
    // expect create to be called once
    expect(strapi.plugin('todo').service('create').create).toBeCalledTimes(1)
  })
```

Here you can see we are passing in our `strapi` object into the `todoController` then calling `index` and passing in the `ctx` object. We then expect the `ctx.body` to be `created` and we expect the `strapi.plugin('todo').service('create').create` function to be called once.

This means that if down the line the `create` service isn't being called or if the function is returning a different value then the test will fail.

We can do the same thing for the `complete` function.

```js
  it('should complete a todo', async function () {
    const ctx = {
      request: {
        body: {
          id: 1
        }
      },
      body: null
    }
    // call the index function
    await todoController({strapi}).complete(ctx)
    // expect the body to be 'created'
    expect(ctx.body).toBe('todo completed')
    // expect create to be called once
    expect(strapi.plugin('todo').service('complete').complete).toBeCalledTimes(1)
  })
```

We also need to add the complete object to our `strapi` object.

```js
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
```

Our final test suite should look like this

```js
let todoController = require('../server/controllers/todo-controller');

describe('Todo Controller', () => {
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
```

### Testing Services

Now that we have tested the controller we need to test the services. We are going to test the `create` service and you can try testing the `complete` service on your own.

We are going to create a new file called `create-service.test.js` in the `tests` folder.

We now need to import our `create` service and mock the `strapi` object.

```js
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
    //todo
  })
})
```

Because our `create()` service is calling the `strapi.query()` function we need to mock that function instead of the `strapi.plugin()` function like in our controller test suite.

Now we can build out our test, we are testing that a todo is created and is only called once and that the returned name is 'test'

```js
  it('should create a todo', async function () {
    const name = 'test'
    const todo = await createService({ strapi }).create({ name })
    expect(strapi.query('plugin::todo.todo').create).toBeCalledTimes(1)
    expect(todo.data.name).toBe('test')
  })
```
Again we pass in the mocked `strapi` object into the `createService` function and call the `create()` function. We then expect the `strapi.query()` function to be called once.

Your final service test suite should look like
```js
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
```

This is a very basic example of how you can test your controllers and services. In reality, you would be testing a lot of error logic and edge cases. If you want to see some more complex example of test check out [this forms plugin](https://github.com/excl-networks/strapi-plugin-ezforms/tree/master/tests)



## Running Tests

To run your tests you can run the following command

```bash
npm run test
```
or
```bash
yarn test
```



## Automatically Run Tests with GitHub Actions

If you're working on a large team or you want to make sure your tests are running every time you push to GitHub you can use GitHub Actions to automatically run your tests.

To do this you need to create a new file called `.github/workflows/test.yaml` and add the following code

```yaml
name: 'Tests'

on:
  pull_request:
  push:
jobs:
  run-tests:
    name: Run Tests
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install modules
        working-directory: ./
        run: npm ci
      - name: Run Tests
        working-directory: ./
        run: npm run test

```
This will run your tests every time you push to GitHub or create a pull request.

You can also set up branch protection rules within GitHub to prevent merging to master if your tests are failing. To do this go to your repository settings and click on the `Branches` tab. Then click on `Add rule` and select the branch you want to protect. Then select `Require status checks to pass before merging`. You also want to enable `Require a pull request before merging` and `Include administrators`. This will prevent you from merging to master if your tests are failing.
 

## Conclusion

Testing can be very annoying and time-consuming but in the long run, it will save you a lot of time and headaches and maybe even stop production from going down.



