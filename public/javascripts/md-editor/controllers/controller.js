((angular) => {

    const APP_NAME = "md-editor"

    const CONTROLLER_NAME = "md-editor-controller"

    const app = angular.module(APP_NAME);

    inject = ['$document', '$scope', 'md-editor-service']

    const controller = function ($document, $scope, mdService) {

        $scope.files = []

        $scope.filename = ""

        $scope.selected = {
            position: null,
            file: null,
            edited: false,
            isEdited: (() => {return this.edited }).bind($scope.selected),
            resetEdition: (() => {this.edited = false}).bind($scope.selected),
            isEditing: (() => { this.edited = true }).bind($scope.selected),
        }

        $scope.contentArea = ``;

        $scope.parseMD = () => {
            let element = angular.element( document.querySelector( '#test' ) );
            element.html(marked($scope.contentArea));
        };

        // watch changes in contentArea
        $scope.$watch('contentArea', function () {
            $scope.parseMD()
        });

        // watch changes in contentArea
        $scope.$watch('selected.file', function () {
            $scope.contentArea = $scope.selected.file 
            ? $scope.selected.file.content
            : '';

            $scope.filename = $scope.selected.file 
            ? $scope.selected.file.name
            : '';
        });
        
        mdService.getDocuments().then(
            response => {
                $scope.files = response.data;

                // set 0 as file selected
                if ( 0 < $scope.files.length ){
                    $scope.selected.position = 0;
                    $scope.selected.file = $scope.files[0];
                } else {
                    $scope.createDocument();
                }
            },
            error => {
                console.log('some error');
            }
        );


        $scope.selectFile = (index) => {
            if( $scope.selected.position != index){
                $scope.selected.position = index
                $scope.selected.file = $scope.files[index]
                $scope.filename = $scope.files[index].name
                $scope.selected.resetEdition()
            }
        }

        $scope.createDocument = () => {
            mdService.createDocument({
                name: "New File",
                content:"",
                date: new Date ()
            }).then(response => {
                $scope.files.push({...response.data.data});
                $scope.selectFile($scope.files.length-1);
            },
            error => {
                console.log(error)
            });
        }

        $scope.saveDocumentChanges = () => {
            if($scope.selected.file){
                $scope.selected.file.content = $scope.contentArea;
                $scope.selected.file.name = $scope.filename;
                mdService.updateDocument($scope.selected.file).then(
                    response => {
                        $scope.selected.resetEdition()
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        }

        $scope.deleteDocument = () => {
            if($scope.selected.file){
                mdService.deleteDocument($scope.selected.file._id).then(
                    response => {
                        const oldPosition = $scope.selected.position;
                        const newPosition = Math.max($scope.selected.position-1 , 0);
                        $scope.files.splice(oldPosition, 1);
                        $scope.selectFile(newPosition);
                        if($scope.files.length == 0){
                            $scope.selected.position = -1;
                            $scope.createDocument();
                        }
                    },
                    error => {
                        console.log(error);
                    }
                );
            }
        }

        $scope.canDelete = () => $scope.files.length == 0;
    };

    controller.$inject = inject;

    app.controller(CONTROLLER_NAME, controller);

})(angular)