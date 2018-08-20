/*eslint-disable*/

/*
* Data service
* Service exposed with the name "data"
* This service provide methods that interacts with the MySQL backend
* and fetches the data from the Rest api using angular's $http service
*/

// IIFE to create closure and avoid polluting global space
(function(){

  var designEditorApp = angular.module("designEditorApp");

  function dataFactory($http) {

    if(!$http){
      console.log("cant access angular's http service");
      return null;
    }

    data.getDesign = function(id){
      
    }

    var data = {};

    return data;
  }

  // Define dependencies for dataFactory
  dataFactory.$inject = ['$http'];

  // Register factory with our main angular app
  designEditorApp.factory('data', dataFactory);

})();
