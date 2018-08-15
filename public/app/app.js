// Define the `designEditor` module
const designEditor = angular.module("designEditor", ['ngRoute']);

/*
 * Config function is fired before our application runs, so we set up routing
 * here, all the preparations comes here
 */
// designEditor.config(function(){
//
// });

/*
 * The run function is fired as our application runs
 */
// designEditor.run(function(){
//
// });

// Define the `designEditorController` controller on the `designEditor` module
designEditor.controller('designEditorController', function($scope){

  $scope.name = "Morpheus";

});
