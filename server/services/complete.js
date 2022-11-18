module.exports = ({ strapi }) => ({
  async complete(ctx) {
    const { id } = ctx.params;
    //query the todo table
    try {
      await strapi.query("plugin::todo.todo").update(
        {
          id,
        },
        {
          status: true,
        }
      );
    } catch (e) {
      strapi.log.error(e);
    }
  },
});
