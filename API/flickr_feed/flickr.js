(function() {

    var app = angular.module("flickr_Gallery", []);
    var mainController = function($scope, $http) {
 
        var flickrPublicUrl = "https://api.flickr.com/services/feeds/photos_public.gne?&format=json";
        var success = function() {
        };
        
        var onError = function(reason) {
            $scope.error = "An error occured while fetching Pictures from Flickr";
        };
        
        jsonFlickrFeed = function(data) {
            $scope.data = data.items;
        }
        
        $scope.searchFlickr = function() {
            if ($scope.search.length > 0) {
                var url = flickrPublicUrl + "&tags=" + $scope.search;
                $http.jsonp(url).then(success, onError);
            }
        }
    };
 app.controller("mainController", mainController);
 
 }());