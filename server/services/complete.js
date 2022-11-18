module.exports = ({ strapi }) => ({
  async complete({ id }) {
    console.log('id', id)
    //query the todo table
    try {
      await strapi.query('plugin::todo.todo').update({
        where: { id: id },
        data: {
          status: true,
        }
      })
    } catch (e) {
      strapi.log.error(e)
    }
  },
})
