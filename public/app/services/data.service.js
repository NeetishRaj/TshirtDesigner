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

    var data = {};

    data.getDesign = function(id){
      var promise1 = $http.get("/design/getDesign/" + id);
      var promise2 = promise1.then(function(response){
        return response.data;
      });

      return promise2;
    };

    data.insertDesign = function(editData){
      editData = angular.toJson(editData);

      return $http.post("/design/insertDesign", editData).
        then(function(response){
            return response.data;
        }
      );
    };

    data.getDesignList = function(){
      return $http.get("/design/getDesignList").
        then(function(response){
            return response.data;
          }
        );
    };

    // It will store the fetched design lists
    data.designListBuffer = [];


    return data;
  }

  // Define dependencies for dataFactory
  dataFactory.$inject = ['$http'];

  // Register factory with our main angular app
  designEditorApp.factory('data', dataFactory);

})();
