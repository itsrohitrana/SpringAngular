(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .factory('QuizService', QuizService);

    QuizService.$inject = ['$resource'];

    function QuizService ($resource) {
    	var service = $resource('api/student/:id', {}, {
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET', isArray: false,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'save': { method:'POST' },
            'update': { method:'PUT' },
            'delete':{ method:'DELETE'}
            
        });
        return service;
    }
})();
