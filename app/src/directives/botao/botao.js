app.directive('botao', function () {
    return {
        restrict: 'E',
        templateUrl: "app/directives/botao/botao.html",
        transclude:true,
        scope: {
            ngModel: '=',
            placeholder: "@",
            center: "@",
            img: "@"
        },
        compile: function ($scope, element, attributes) {
            var linkFunction = function ($scope, element, attributes) {
                $scope.centraliza = 'center' in attributes;
                element.css("background-color", "#ff00ff");
            }
            return linkFunction;
        }
    };
});