//this is defining the app module and the balancedBracesTest directive within that module
angular
  .module('app', [])
  .controller('Controller', [
    '$scope',
    function ($scope) {
      $scope.pairsToBalance = {
        Brackets: ['{', '}'],
        Square_Brackets: ['[', ']'],
        Paranthesis: ['(', ')']
      }
    }
  ])
  .directive('balancedBracesTest', () => {
    return {
      templateUrl: 'balanced-braces.tmpl.html'
    }
  })
