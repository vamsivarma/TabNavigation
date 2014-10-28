angular.module('tabnav', [])
  .controller('tabNavController', ['$scope', '$location', '$cacheFactory', function($scope, $location, $cacheFactory) {
    $scope.selectedTab = "tab1";
    $scope.cache = $cacheFactory('cacheId');
    $scope.tabNavModel = {
      "tab1": {
          "tabId": "tab1",
          "tabContent": "Display data for tab1"
      },
      "tab2": {
          "tabId": "tab2",
          "tabContent": "Display data for tab2"
      },
      "tab3": {
          "tabId": "tab3",
          "tabContent": "Display data for tab3"
      }
    };

    $scope.setSelectedTab = function(tabId) {
      $scope.selectedTab = tabId;
      $scope.setValue('selectedTab', tabId);
      $scope.setNavURL(tabId); 

    };

    $scope.setNavURL = function(tabId) {
      $location.path(tabId);    
    };
    
    $scope.paintSelectedTabContent = function() {
      return $scope.tabNavModel[$scope.selectedTab].tabContent; 
    };

    $scope.setValue = function(key, value) {
      $scope.cache.put(key, value === undefined ? null : value);
    };

    $scope.retainNavState = function() {
      var pathStr = $location.path();
      pathStr = pathStr.split("/");
      var retainTabId = (pathStr[1]) ? pathStr[1] : "tab1";
      $scope.setSelectedTab(retainTabId);      
    };
  }]);
