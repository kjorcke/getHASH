var ngA4S = angular.module("ngHash", ["ui.bootstrap", "ngRoute"]);

ngA4S.config([
    "$routeProvider",
    function ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home.html",
                controller: "getHashController",
            })
            .when("/decode", {
                templateUrl: "views/decoding.html",
                controller: "getHashController",
            })
            .when("/encode", {
                templateUrl: "views/encoding.html",
                controller: "getHashController",
            })
            .otherwise({
                redirectTo: "/home",
            });
    },
]);

ngA4S.run(function () {});

ngA4S.controller("getHashController", [
    "$scope",
    "$http",
    function ($scope, $http) {

        const getHash = string => {
            var h = 7;
            var letters = "acdefhlmnoprstuw";
    
            for (var i = 0; i < string.length; i++) {
                h = h * 37 + letters.indexOf(string[i]);
            }

            $scope.hash = h
            $scope.validString = string
            
            return h;
        };


        const validateString = string => {
            var letters = "acdefhlmnoprstuw";
            var invalidChar = []
    
            for (var i = 0; i < string.length; i++) {
                if (letters.indexOf(string[i]) === -1) {
                    console.log(string[i]);
                    invalidChar.push(string[i])
                }
            }
            console.log(invalidChar)
            if (invalidChar.length === 1){
                //Todo: auf Deutsch formulieren!
              $scope.invalidString = `Your input "${string}" contains the invalid character ${invalidChar}. Please submit a valid string containing only the letters "acdefhlmnoprstuw"`
            } else if(invalidChar.length > 1){
                $scope.invalidString = `Your input "${string}" contains the invalid characters ${invalidChar}. Please submit a valid string containing only the letters "acdefhlmnoprstuw"`
            }else{
              getHash(string)
              $scope.invalidString = ""
            }
    
        };

        $scope.submitGetHash = function () {
                console.log($scope.string)
                $scope.hash = "";
                $scope.invalidString = ""

                if ($scope.string){
                    validateString($scope.string.toLowerCase().trim());
                }

                $scope.string = "";
               
        }


        $scope.submitGetString = function () {
            let hash = $scope.submittedHash;
            let indexOfLetters;
            let letters = "acdefhlmnoprstuw";
            let decodeString = [];
            $scope.invalidHash = false
            $scope.userHash = $scope.submittedHash;
            $scope.hashNaN = false
    
           if (isNaN(hash)){
            $scope.hashNaN = true;
           } else {

               for (var i = 0; hash > 7 ; i++) {
                   indexOfLetters = hash % 37;
                   hash = (hash - indexOfLetters) / 37;
                   if (indexOfLetters > 15){
                       $scope.invalidHash = true
                       break;
                    } else {
                        decodeString.push(letters.charAt(indexOfLetters));
                    }
                    
                }
            }
                
            if($scope.invalidHash === false) {
                $scope.gotString = decodeString.reverse().join("");
            }
            
            $scope.submittedHash = ""
    
            return $scope.gotString
        };





    },
]);
