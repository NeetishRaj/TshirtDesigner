/*eslint-disable*/

// Define the `designEditor` module
var designEditorApp = angular.module("designEditorApp", ["ngRoute"]);



/*
 * Config function is fired before our application runs, so we set up routing
 * here, all the preparations comes here as well
 * $routeProvider dependency is provided by ngRoute
 * we are using [], to preserve our code during minification
 */
designEditorApp.config([
  "$locationProvider",
  "$routeProvider",
  function($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when('/home', {
        templateUrl: 'modules/home/home.html'
      }).
      when('/designs', {
        templateUrl: 'modules/designs/designs.html',
        // controller: 'designsController'
      }).
      when('/editor', {
        templateUrl: 'modules/editor/editor.html',
        controller: 'editorController'
      }).
      otherwise({
        redirectTo: '/editor'
      });

}]);

/*
 * The run function is fired as our application runs
 */
designEditorApp.run(function(){

});

// Define the `appController` on the `designEditorApp` module
designEditorApp.controller('appController', [
  function() {


  }
]);
