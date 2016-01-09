angular.module('equip.services', [])

    //========== INVENTORY ADD AND RETRIEVE SERVICES ================
  .factory('Inventory', function ($http) {

    var addItem = function (data) {

      return $http({
        method: 'POST',
        url: '/items',
        data: data
      })
      .then(function (response) {
        console.log('good post', response);
        return response;
      })
    }

    var getItems = function (businessId) {

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
      addItem: addItems,
      getItems : getItems
    }
  })

  //================= AUTHORIZATION SERVICES =======================
  .factory('Auth', function ($http) {

    //remember to JSON stringify data
  	var signUp = function (data) {
      console.log(data);
      return $http({
        method: 'POST',
        url: '/api/businesses/signup',
        data: data
      })
      .then(function (data) {
        return data;
      })
  	}

    var signIn = function () {
      return $http({
        method: 'GET',
        url: '/api/businesses/signIn'
      }).then(function (data) {
        //this will sign us in as a business- use the token returned here to sign the business in
        console.log(data);
      })
    }

    var isAuthorized = function () {
      if (localStorage.EquipToken) {
        return true;
      }
      return false;
    }


  	return {
  		signIn: signIn,
  		signUp: signUp,
      isAuthorized: isAuthorized
  	}

  })






