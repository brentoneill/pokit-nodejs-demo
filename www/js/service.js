angular.module('poki')
  .factory('PokiService', function ($location, $http){

    var apiUrl = 'https://pd-nodeclient-demo.herokuapp.com/api/'
    // var apiUrl = 'http://localhost:5000/api/';

    var getProviders = function(options) {

      options = {
        zipcode: 29464,
        limit: 10
      };

      return $http.post( apiUrl + 'providers', options );
    };

    var getTradingPartners = function() {
      return $http.get( apiUrl + 'tradingPartners' );
    };

    var convertIcd = function(code) {
        var reqBody = {
            icd_code: code
        };
        return $http.post( apiUrl + 'icdConvert', reqBody );
    };

    var calcTradingPartnerStats = function(tradingPartnerList) {
      var apiStats = {
        supportedTransactions: [
          {
            key: '837',
            label: 'Claims API',
            value: 0
          },
          {
            key: '270',
            label: 'Eligibility API',
            value: 0
          },
          {
            key: '276',
            label: 'Claims Status API',
            value: 0
          }
        ],
        totalEnabled: 0
      };

      for ( var i = 0; i < tradingPartnerList.length; i++ ) {
        tradingPartnerList[i].supported_transactions_labels = [];
        if ( _.contains(tradingPartnerList[i].supported_transactions, '837') ) {
          tradingPartnerList[i].supported_transactions_labels.push('Claims API')
          apiStats.supportedTransactions[0].value++;
        }
        if (  _.contains(tradingPartnerList[i].supported_transactions, '276') ) {
          tradingPartnerList[i].supported_transactions_labels.push('Claims Status API')
          apiStats.supportedTransactions[2].value++;
        }
        if (  _.contains(tradingPartnerList[i].supported_transactions, '270') ) {
          tradingPartnerList[i].supported_transactions_labels.push('Eligibility API')
          apiStats.supportedTransactions[1].value++;
        }
        if ( tradingPartnerList[i].is_enabled ) {
          apiStats.totalEnabled++;
        }
      }
      return apiStats;
    };

    var getActivities = function(options) {
      options = {};
      return $http.post( apiUrl + 'activities', options );
    };

    var getPlans = function(options) {
      return $http.post( apiUrl + 'plans', options );
    };

    var getInsurancePrices = function(options) {
      return $http.post( apiUrl + 'insurancePrices', options );
    };

    return {
      getProviders: getProviders,
      getTradingPartners: getTradingPartners,
      getActivities: getActivities,
      getPlans: getPlans,
      getInsurancePrices: getInsurancePrices,
      calcTradingPartnerStats: calcTradingPartnerStats,
      convertIcd: convertIcd
    };

});
