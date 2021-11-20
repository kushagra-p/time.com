'use strict';
module.exports = function (app) {
  var todoList = require('../service/latest-service');

  // latest-stories Routes
  app.route('/getLatestStories')
    .get(todoList.get_latest_stories);

  app.route('/display')
    .get(todoList.list_html)
};


