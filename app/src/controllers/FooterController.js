//Controller do footer da página
angular.module('Games').controller ('FooterController', function($scope){
    $scope.foot = "Novo Hamburgo, " + Date();
});