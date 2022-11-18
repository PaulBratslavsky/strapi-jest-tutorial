'use strict'

module.exports = ({ strapi }) => ({
  async index(ctx) {
    const { name } = ctx.request.body
    const todo = await strapi.services.todo.create({ name })
    return todo
  },
  async complete(ctx) {
    const { id } = ctx.params
    const todo = await strapi.services.todo.update({ id }, {
      status: true
    })
    return todo
  },
})

