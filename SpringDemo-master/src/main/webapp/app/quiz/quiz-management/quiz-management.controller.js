(function() {
    'use strict';

    angular
        .module('springDemoApp')
        .controller('QuizManagementController', QuizManagementController);

    QuizManagementController.$inject = ['$filter','$http','$stateParams','QuizManagementService' ,'$state' ];

    function QuizManagementController (filter,$http,$stateParams,QuizManagementService, $state ) {
        var vm = this;
        vm.quesCategoryArr =[ { "id":"1","category":"Math"},{ "id":"2","category":"JAVA" }, { "id":"3","category":"GK"}];
        vm.category = vm.quesCategoryArr[0];
        vm.answerArr =[ { "id":1,"ans":"A"},{ "id":2,"ans":"B" 	}, { "id":3,"ans":"C"}, { "id":4,"ans":"D"}];
        vm.update =false;
        
        if($stateParams.id){
            QuizManagementService.get({id: $stateParams.id}, function(result) {
                vm.quiz = result;
                vm.category = vm.quesCategoryArr[Number(vm.quiz.category)-1];
               
                angular.forEach(vm.answerArr,function(a){
                	if(a.id==vm.quiz.correctAns){
                        vm.correctAns=a;
                    }
                });
            });
            vm.update=true;	
       }
        
        vm.save = function(){
        	console.log("data ",vm.quiz);
        	vm.quiz.category = vm.category.id;
        	vm.quiz.correctAns = vm.correctAns.id;
        	$http.post('api/quiz',vm.quiz).success(function(response){
        		$state.go('quiz-list');
            })
        }
    }
})();
