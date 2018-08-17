// Define the `designEditor` module
const designEditorApp = angular.module("designEditorApp", ['ngRoute']);

/*
 * Config function is fired before our application runs, so we set up routing
 * here, all the preparations comes here
 */
designEditorApp.config(function(){

});

/*
 * The run function is fired as our application runs
 */
designEditorApp.run(function(){

});

// Define the `designEditorAppController` on the `designEditorApp` module
designEditorApp.controller('appController', ['$scope', function($scope){

  $scope.name = "Morpheus";




}]);
