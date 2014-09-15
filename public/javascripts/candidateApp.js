/* candidateApp.js ========================================== */
angular.module('candidateApp', ['ui.router', 'ngResource', 'candidateControllers', 'candidateServices'])

/* CandidateApp Config (UI-Router) ========================================= */
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/candidates');

    $stateProvider.state('candidates', {  // State for showing all candidates
        // Also has delete functionality
        url: '/candidate-portal',
        templateUrl: 'candidates.html',
        controller: 'ListCtrl'
    }).state('newCandidate', { // state for adding a new candidate
        url: '/candidate-portal/new',
        templateUrl: 'candidate-add.html',
        controller: 'CreateCtrl'
    }).state('viewCandidate', { // state for showing single candidate
        url: '/candidate-portal/:id/view',
        templateUrl: 'candidate-view.html',
        controller: 'ViewCtrl'
    }).state('editCandidate', { // state for updating a candidate
        url: '/candidate-portal/:id/edit',
        templateUrl: 'candidate-edit.html',
        controller: 'EditCtrl'
    });
}).run(function($state){
    $state.go('candidates');    // go to candidates state when app starts
});