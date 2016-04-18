angular.module('homepage', ['ui.bootstrap']).controller('mycontroller',['$scope', function($scope){

    $scope.slides = [];
    $scope.slides.push({title: 'Project Proposal', text: 'Use cases, functionality description and client-server model for Travelogue', image: 'http://placekitten.com/300/200', link: "https://docs.google.com/a/husky.neu.edu/document/d/1eTukKILfFtT6AdwE6gftETqZjoGU96EA0YGm2OxVHk0/edit?usp=sharing"});
    $scope.slides.push({title: 'Travelogue', text: 'Link to the Project homepage', image: 'http://placekitten.com/301/200', link: 'project/client'});
    $scope.slides.push({title: 'Assignments', text: 'Link to the Assignments homepage', image: 'http://placekitten.com/302/200', link: 'assignment/client'});
    $scope.slides.push({title: 'Github Repo', text: 'Check out my code here', image: 'http://placekitten.com/302/200', link: 'http://github.com/aishwaryaa11/webdev'});

}]);