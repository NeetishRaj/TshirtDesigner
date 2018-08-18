/*eslint-disable*/

/*
* This is a service provider for the fabric.js library to be used by the
* angluar app, exposed as "fabric" in root scope
 */

// IIFE to create closure and avoid polluting global space
(function(){

  var designEditorApp = angular.module("designEditorApp");

  function fabricFactory($window) {
    if(!$window.fabric){
      /*
      * @TODO If fabric is not available then we can provide a
      * mock service, try to load it from somewhere else,
      * redirect the user to a dedicated error page
      */
      console.log("Fabric not availbale");
    }

    return $window.fabric;
  }

  // Define dependencies for fabricFactory
  fabricFactory.$inject = ['$window'];

  // Register factory
  designEditorApp.factory('fabric', fabricFactory);

})();
