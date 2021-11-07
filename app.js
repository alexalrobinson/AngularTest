//this is defining the app module and the balancedBracesTest directive within that module
angular
  .module('app', [])

  .controller('balancedBracesController', [
    '$scope',
    $scope => {
      // input binding
      $scope.newPairName = ''
      $scope.newOpenChar = ''
      $scope.newClosingChar = ''
      $scope.wordToCheck = ''

      // other state handlers
      $scope.pairsList = [
        { name: 'Brackets', chars: ['{', '}'] },
        { name: 'Square Brackets', chars: ['[', ']'] },
        { name: 'Paranthesis', chars: ['(', ')'] }
      ]

      $scope.pairsLookUp = {
        open: {
          '{': '}',
          '[': ']',
          '(': ')'
        },
        close: {
          '}': '{',
          ']': '[',
          ')': '('
        }
      }

      $scope.checkedWordsHistory = []

      $scope.addPair = false

      // functions
      $scope.addNewPair = () => {
        const {
          newPairName: name,
          newOpenChar: open,
          newClosingChar: close
        } = $scope

        $scope.pairsList.push({ name, chars: [open, close] })
        $scope.pairsLookUp.open[open] = close
        $scope.pairsLookUp.close[close] = open
        $scope.addPair = false
      }

      $scope.checkWord = () => {
        const word = $scope.wordToCheck
        $scope.wordToCheck = ''

        if (word === '') return

        const openingChars = []

        for (const char of word) {
          if (char in $scope.pairsLookUp.open) {
            openingChars.push(char)
          } else if (char in $scope.pairsLookUp.close) {
            const lastOpenChar = openingChars.pop()

            // word is not balanced
            if (char !== $scope.pairsLookUp.open[lastOpenChar]) {
              $scope.checkedWordsHistory.unshift({
                word,
                balanced: 'Not Balanced'
              })
              return
            }
          }
        }

        // word is balanced
        $scope.checkedWordsHistory.unshift({ word, balanced: 'Balanced' })
      }
    }
  ])

  .directive('balancedBracesTest', () => {
    return {
      templateUrl: 'balanced-braces.tmpl.html'
    }
  })

  .directive('ngEnter', () => {
    return (scope, element, attrs) => {
      element.bind('keydown keypress', event => {
        if (event.which === 13) {
          scope.$apply(() => {
            scope.$eval(attrs.ngEnter)
          })
          event.preventDefault()
        }
      })
    }
  })
