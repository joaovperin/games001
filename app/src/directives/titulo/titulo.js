app.directive('titulo', function () {
    return {
        restrict: 'E',
        templateUrl: "app/directives/titulo/titulo.html",
        transclude:true,
        scope: {
            ngModel: '=',
            placeholder: "@",
            Subtitulo: "=",
            center: "@",
            img: "@"
        },
        compile: function ($scope, element, attributes) {
            var linkFunction = function ($scope, element, attributes) {
                $scope.Title = attributes.tit;
                $scope.centraliza = 'center' in attributes;
                $scope.subTitle = attributes.sub;
            }
            return linkFunction;
        }
    };
});