module.exports = ({ strapi }) => ({
  async create({ name }) {
    //query the todo table
    try {
      await strapi.query('plugin::todo.todo').create({
        data: {
          name,
          status: false,
        }
      }
      )
    } catch (e) {
      strapi.log.error(e)
    }
  },
});


