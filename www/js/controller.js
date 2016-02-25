angular.module('poki')
  .controller('MainController', function ($location, $scope, PokiService, tradingPartners){

    var mainCtrl = this;

    $scope.tradingPartnersData = tradingPartners.data;
    $scope.filters = {};
    $scope.stats = PokiService.calcTradingPartnerStats(tradingPartners.data);

    mainCtrl.goToPage = function(page) {
      $location.path('/' + page);
    };


  })
  .controller('ICDController', function($location, $scope, PokiService) {

      var icdCtrl = this;

      $scope.sourceCode = {};

      icdCtrl.goToPage = function(page) {
        $location.path('/' + page);
      };

      icdCtrl.convertIcd = function(code) {
          PokiService.convertIcd(code).then(function(res) {
                $scope.data = res.data;
                $scope.sourceCode = res.data.source_code;
                $scope.possibleList = res.data.destination_scenarios[0].choice_lists[0];
                console.log($scope.possibleList);
          });
      };
  });
