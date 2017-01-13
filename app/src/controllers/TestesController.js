//Controller da página de testes
app.controller('TestesController', function ($scope) {

    $scope.colorList = [
        {
            name: "Red",
            hex: "#F21B1B"
        },
        {
            name: "Blue",
            hex: "#1B66F2"
        },
        {
            name: "Green",
            hex: "#07BA16"
        },
        {
            name:"Purple",
            hex:"#b300b3"
        }

        ];
    $scope.myColor = "";
});