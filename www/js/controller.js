angular.module('poki')
  .controller('MainController', function ($location, $scope, PokiService, tradingPartners){

    var mainCtrl = this;

    $scope.tradingPartnersData = tradingPartners.data;
    $scope.showError = false;
    $scope.stats = PokiService.calcTradingPartnerStats(tradingPartners.data);
    $scope.loaderMessage = 'Hold your squirrels! Fetching some acorns...'


    mainCtrl.goToPage = function(page) {
      $location.path('/' + page);
    };


  })
  .controller('ICDController', function($location, $scope, $rootScope, PokiService) {

      var icdCtrl = this;

      $scope.sourceCode = {};
      $scope.loaderMessage = 'Hold your squirrels! Fetching some acorns...'

      icdCtrl.goToPage = function(page) {
        $location.path('/' + page);
      };

      icdCtrl.convertIcd = function(code) {
          code = code.toUpperCase();
          $scope.myPromise = PokiService.convertIcd(code).then(function(res) {
                $scope.data = res.data;
                if ( typeof res.data.data == 'object' || (res.data.data && res.data.data.errors) ) {
                    $scope.showError = true;
                } else {
                    $scope.showError = false;
                    $scope.sourceCode = res.data.source_code;
                    $scope.possibleList = res.data.destination_scenarios[0].choice_lists[0];
                    $scope.searchQuery = $scope.sourceCode.description.slice(0, $scope.sourceCode.description.indexOf(","));
                    console.log($scope.searchQuery);
                }
          });
      };
  });
