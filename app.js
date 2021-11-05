//this is defining the app module and the balancedBracesTest directive within that module
angular
  .module('app', [])
  .controller('Controller', [
    '$scope',
    function ($scope) {
      $scope.pairsList = [
        { name: 'Brackets', chars: ['{', '}'] },
        { name: 'Square Brackets', chars: ['[', ']'] },
        { name: 'Paranthesis', chars: ['(', ')'] }
      ]
    }
  ])
  .directive('balancedBracesTest', () => {
    return {
      templateUrl: 'balanced-braces.tmpl.html'
    }
  })
