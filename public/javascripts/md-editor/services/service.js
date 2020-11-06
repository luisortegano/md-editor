(angular => {

    const APP_NAME = "md-editor"

    const SERVICE_NAME = "md-editor-service"

    const app = angular.module(APP_NAME);

    app.service(SERVICE_NAME, function($http) {

        const basePath = "/documents";

        this.getDocuments = function () {
            return $http.get(basePath);
        }
    })
})(angular)

;