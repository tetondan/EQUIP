angular.module('Equip', ['ui.router', 'equip.control', 'inventory.manage'])
  .config(function ($stateProvider) {
  	$stateProvider
	  	.state('signIn' {
	  	  url: '/signin',
	  	  templateUrl : 'signin/index.html',
	  	  controller: 'SignIn'
	  	})
			.state('manage', {
				url: '/manage', 
				templateUrl : 'manage/index.html',
				controller: 'InventoryManage'
			})
			.state('itemDetails', {
				url: '/details'
			})
  }).run(function () {
  	console.log('running');
  })
 


