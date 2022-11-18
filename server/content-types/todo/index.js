module.exports = {
  info: {
    tableName: 'todo',
    singularName: 'todo', // kebab-case mandatory
    pluralName: 'todos', // kebab-case mandatory
    displayName: 'Todos',
    description: 'A Place for all your todos',
    kind: 'collectionType'
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: true
    },
    'content-type-builder': {
      visible: true
    }
  },
  attributes: {
    name: {
      type: 'string',
      min: 1,
      max: 50,
      configurable: false
    },
    status: {
      type: 'boolean',
      configurable: false
    }
  }
}
