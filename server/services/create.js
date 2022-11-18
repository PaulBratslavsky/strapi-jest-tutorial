module.exports = ({ strapi }) => ({
    async create(ctx) {
        const { name } = ctx.request.body;
      //query the todo table
      try {
        await strapi.query("plugin::todo.todo").create(
          {
            name,
          }
        );
      } catch (e) {
        strapi.log.error(e);
      }
    },
  });
  

