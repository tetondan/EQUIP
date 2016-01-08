angular.module('equip.services', [])
  .factory('Inventory', function ($http) {
    
  	//in here add our logic for retrieving inventory information from
  	//the db


 
  })
  .factory('Businesses', function ($http) {

  	//in here add our logic for retrieving business information from
  	//the db
    return {}

  })
  .factory('Auth', function ($http) {




  	var signIn = function () {
      $http({
        method: 'GET',
        url: '/'
      }).then(function (data) {
        //use the data to validate us or invalidate us
        console.log(data);
      })
  	}

  	var signUp = function () {
      $http({
        method: 'POST',
        url: '/businesses/signup'
      }).then(function (data) {
        //sign up successful
        console.log(data);
      })


  	}

  	return {
  		signIn: signIn,
  		signUp: signUp
  	}

  })






