angular.module('equip.services', [])
  .factory('Inventory', function ($http) {
    
  	//in here add our logic for retrieving inventory information from
  	//the db
    var addItem = function (data) {

      //remember to JSON stringify data on posts
      return $http({
        method: 'POST',
        url: '/items',
        data: JSON.stringify(data)
      })
      .then(function (response) {
        console.log('good post', response);
        return response;
      })

    }

    var getItems = function (businessId) {

      //get items from the database
      return $http({
        method: 'GET',
        url: '/items'
      })
      .then(function (data) {
        console.log('we have the datas', data);
        return data;
      })

    }

    return {
      addTo: addTo,
      getItems : getItems
    }
 
  })
  .factory('Auth', function ($http) {

    //remember to JSON stringify data
  	var signUp = function (data) {
      console.log(data);
      return $http({
        method: 'POST',
        url: '/businesses/signup',
        data: JSON.stringify(data)
      })
      .then(function (data) {
        console.log('IN HERE')
        console.log(data);
      })


  	}

    var signIn = function () {
      return $http({
        method: 'GET',
        url: '/'
      }).then(function (data) {
        //use the data to validate us or invalidate us
        console.log(data);
      })
    }


  	return {
  		signIn: signIn,
  		signUp: signUp
  	}

  })






