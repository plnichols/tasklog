var app = app || {};

(function() {
  'use strict';


  // create application
  app = new Marionette.Application();

  app.on('start', function () {
    console.log('app started...');
    Backbone.history.start();
  });



  // get dummy data
  app.data = [
    {
      title: 'First task',
      date: '20/11/2015'
    },
    {
      title: '2nd task',
      date: '8/12/2015'
    },
    {
      title: '3rd task',
      date: '2/01/2015'
    }
  ];



  // models
  app.TaskModel = Backbone.Model.extend({
    initialize: function (data) {
      console.log('Task Model initialized', data);
    }
  });



  // collections
  app.TaskCollection = Backbone.Collection.extend({
    initialize: function (data) {
      console.log('Task Collection initialized', data);
    },
    model: app.TaskModel
  });

  app.taskCollection = new app.TaskCollection(app.data);



  // task item view
  app.TaskItemView = Marionette.ItemView.extend({
    tagName: 'li',
    className: 'task__item',
    template: '#task-item-template'
  });


  // task list view
  app.TaskListView = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'task__list',
    childView: app.TaskItemView
  });

  app.taskListView = new app.TaskListView({
    collection: app.taskCollection
  });


  // title view
  app.TitleView = Marionette.ItemView.extend({
    template: '#title-template'
  });
  app.titleView = new app.TitleView();


  // root view
  app.RootView = Marionette.LayoutView.extend({
    el: '#app',
    template: '#root-template',
    regions: {
      title: '#title-region',
      main: '#main-region'
    }
  });



  app.rootView = new app.RootView();
  app.rootView.render();
  app.rootView.showChildView('title', app.titleView);
  app.rootView.showChildView('main', app.taskListView);



  // start the app
  app.start();

})();
