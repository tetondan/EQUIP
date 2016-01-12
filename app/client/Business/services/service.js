angular.module('equip.services', [])

    //========== INVENTORY ADD AND RETRIEVE SERVICES ================
  .factory('Inventory', function ($http, $state) {

    var update = function () {
      $state.transitionTo('main.inventory');
    }

    var addItem = function (data) {
      return $http({
        method: 'POST',
        url: '/api/items',
        data: data
      })
      .then(function (response) {
        return response;
      })
    }

    var getItems = function (businessId) {
      return $http({
        method: 'GET',
        url: '/api/items/getall/' + businessId
      })
      .then(function (data) {
        return data;
      })
    }

    var removeItem = function (id) {
      return $http({
        method: 'DELETE',
        url: '/api/items/' + id 
      }).then(function (data) {
        return data;
      })
    }

    return {
      update: update,
      removeItem: removeItem,
      addItem: addItem,
      getItems : getItems
    }
  })


  //================= AUTHORIZATION SERVICES =======================
  .factory('Auth', function ($http) {

  	var signUp = function (data) {
      return $http({
        method: 'POST',
        url: '/api/businesses/signup',
        data: data
      })
      .then(function (data) {
        window.localStorage.setItem('EQUIP_TOKEN', data.data._id);
        return data;
      })
  	}

    var signIn = function (username, password) {
      var user = {
        username: username,
        password: password
      }
      return $http({
        method: 'POST',
        url: '/api/businesses/signin',
        data: user
      })
      .then(function (data) {
        return data;
      })
      .catch(function (error) {
        console.log('problem', error);
      })
    }

    var logout = function () {
      window.localStorage.removeItem("EQUIP_TOKEN");
    }
 
    var isAuthorized = function () {
      if (localStorage.EQUIP_TOKEN) {
        return true;
      }
      return false;
    }

  	return {
      logout: logout,
  		signIn: signIn,
  		signUp: signUp,
      isAuthorized: isAuthorized
  	}

  })
  .factory('Messages', function ($http) {

    var getMessages = function (businessId) {
      return $http({
        method: 'GET',
        url: '/api/messages/' + businessId
      })
      .then(function (data) {
        return data;
      });
    }

    return {
      getMessages: getMessages
    }

  });





