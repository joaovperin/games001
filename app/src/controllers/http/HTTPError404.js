//Controller do footer da página
app.controller ('HTTPError404', function($scope, $location){
    $scope.msg = "Ocorreu um erro ao abrir a página! Desculpe :/ " + $location.path();
});