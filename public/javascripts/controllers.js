/* candidateApp.controllers ========================================= */
angular.module('candidateControllers', [])

// ListCtrl ==================================================
.controller('ListCtrl', function($scope, $state, popupService, $window, Candidate) {
    $scope.candidates = Candidate.query();   // fetches all candidates
    // issues GET to /candidates

    $scope.deleteCandidate = function(del_candidate) {   // deletes a candidate
        // issues DELETE to /candidates/:id
        if (popupService.showPopup('Are you sure you want to delete?')) {
            del_candidate.$delete(function() {
                $window.location.href = '';   //redirect to home
            })
        }
    }
})

// ViewCtrl ==================================================
.controller('ViewCtrl', function($scope, $stateParams, Candidate) {
    $scope.candidate = Candidate.get({ id: $stateParams.id });    //gets a single candidate
    // issues GET to /candidates/:id
})

// CreateCtrl ==================================================
.controller('CreateCtrl', function($scope, $state, $stateParams, Candidate) {
    $scope.candidate = new Candidate();   // create new Candidate instance
                                          // properties set by ng-model in UI view

    $scope.addCandidate = function() {    // Creates a new candidate
        // issues POST to /candidates
        $scope.candidate.$save(function() {
            $state.go('candidates');        // On success, go back home
        });
    };

})

// EditCtrl ==================================================
.controller('EditCtrl', function($scope, $state, $stateParams, Candidate) {
    $scope.updateCandidate = function() {     // Updated the candidate
        // Issues PUT to /candidates/:id
        $scope.candidate.$update(function() {
            $state.go('candidates');      // On success, go back home
        });
    };

    $scope.loadCandidate = function() {       // Issues GET request to /candidates/:id
        // To get a candidate to edit
        $scope.candidate = Candidate.get({ id: $stateParams.id });
    };

    $scope.loadCandidate();       // Load a movie which can be edited on UI

});