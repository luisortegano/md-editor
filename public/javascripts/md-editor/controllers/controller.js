(angular => {

    const APP_NAME = "md-editor"

    const CONTROLLER_NAME = "md-editor-controller"

    const app = angular.module(APP_NAME);

    inject = ['$scope', 'md-editor-service']

    const controller = function ($scope, mdService) {
        mdService.getDocuments().then(
            response => {
                $scope.files = response.data;
            },
            error => {
                console.log('some error');
            }
        );
    };

    controller.$inject = inject;

    app.controller(CONTROLLER_NAME, controller);

})(angular)