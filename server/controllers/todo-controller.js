'use strict'

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

