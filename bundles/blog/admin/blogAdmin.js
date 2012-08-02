exports.blogAdmin = {
  fields: [
    {
      name: title, 
      css: 'width: 100'
    },
    {
      name: content
    },
    { 
      name: tags
    }

  ],
  events: {
      save: function() {

      }

  }

}
