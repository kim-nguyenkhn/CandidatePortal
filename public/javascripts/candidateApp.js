/* candidateApp.js ========================================== */
angular.module('candidateApp', ['ui.router', 'ngResource', 'candidateControllers', 'candidateServices'])

/* CandidateApp Config (UI-Router) ========================================= */
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/candidate-portal');

    $stateProvider.state('candidates', {  // "Candidates" State for showing all candidates
        // Also has delete functionality
        url: '/candidate-portal/home',
        views: {
            'list': {
                templateUrl: 'candidates.html',
                controller: 'ListCtrl'
            },
            'newCandidate': {
                templateUrl: 'candidate-add.html',
                controller: 'CreateCtrl'
            }
        }
    }).state('viewCandidate', { // "viewCandidate" state for showing single candidate
        url: '/candidate-portal/:id/view',
        templateUrl: 'candidate-view.html',
        controller: 'ViewCtrl'
    }).state('editCandidate', { // "editCandidate" state for updating a candidate
        url: '/candidate-portal/:id/edit',
        templateUrl: 'candidate-edit.html',
        controller: 'EditCtrl'
    });
}).run(function($state){
    $state.go('candidates');    // go to candidates state when app starts
});