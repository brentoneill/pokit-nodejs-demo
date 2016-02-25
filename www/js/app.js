angular.module('poki', [
  'ngRoute',
  'ngAnimate'
])
.config(function($routeProvider){
  $routeProvider
    //STORE ROUTES
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'MainController as mainCtrl',
      resolve: {
        tradingPartners: function(PokiService) {
          return PokiService.getTradingPartners();
        }
      }
    })
    .when('/stats', {
      templateUrl: 'views/stats.html',
      controller: 'MainController as mainCtrl',
      resolve: {
        tradingPartners: function(PokiService) {
          return PokiService.getTradingPartners();
        }
      }
    })
    .when('/icd', {
      templateUrl: 'views/icd.html',
      controller: 'ICDController as icdCtrl'
    })
    .otherwise({
      redirectTo: '/'
    })
});
