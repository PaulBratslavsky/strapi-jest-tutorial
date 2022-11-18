| .         | .                                          |
| --------- | ------------------------------------------ |
| Title     | How To Add Unit Test To Your Strapi Plugin |
| Author    | Cameron Paczek                             |
| Meta Desc |                                            |
| Word Count          |                                            |

## Introduction
Testing is a very important part of software development. It allows you to ensure that your code is working as expected and that it will continue to work as expected in the future. In this article, we'll be looking how to add unit tests using the [Jest](https://jestjs.io/) testing framework to your Strapi plugin.

The code for this tutorial is based off of a simple todo plugin which you can find [here](https://github.com/excl-networks/strapi-jest-tutorial)
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
Jest has a lot of global configuration variables but for the purpose of this tutorial we are going to leave everything as the default. If you want to learn more about how to configure Jest, you can read the [Jest documentation](https://jestjs.io/docs/configuration).

First we are going to create a new folder to store all of our tests, you should create this in the root of your application and name is `tests`.

All tests are going to end with `.test.js` (or `.test.ts`). We can go ahead and create our first test file. Create a new file called `tests/todo-controller.test.js` and add the following code to it.


## Creating Our First Test Suite



## Mocking the Strapi Object

## Mocking Request `ctx`

## Testing Controllers

## Testing Services

## Running Tests

## Automatically Run Tests with Github Actions

## Conclusion



