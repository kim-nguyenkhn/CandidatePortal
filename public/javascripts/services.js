/* candidateApp.services ========================================= */
angular.module('candidateServices', [])

// Candidate service -- consumed by mongoDB
.factory('Candidate', function($resource) {
    return $resource('http://localhost:3000/candidates/:id', { id: '@_id' }, {
        update: {
            method: "PUT"

        }
    });
})

// popupService used in .delete() -- asks for confirmation
.service('popupService', function($window) {
    this.showPopup = function(message) {
        return $window.confirm(message);
    }
})