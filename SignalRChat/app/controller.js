'use strict';

app.controller('chatController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.Messages = [];
        
        var chat = $.connection.chatHub;
        
        // Create a function that the hub can call back to display messages / Signalr client functions
        chat.client.addNewMessageToPage = function (name, message) {
            var obj = { name: name, message: message };
            $scope.Messages.push(obj);
            $scope.$apply(); // this is outside of angularjs, so need to apply
        };

        $scope.newMsg = {};
        $scope.newMsg.name = 'Sam';
        $scope.newMsg.msg = 'Test';

        $scope.postAnswer = function () {
            $http.post('Send', $scope.newMsg).
                success(function (data) {
                })
        };
        $.connection.hub.start();
    }]);
