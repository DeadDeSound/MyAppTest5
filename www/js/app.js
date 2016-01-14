// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var starter =  angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


starter.controller("MyController",function ($scope,Business,$ionicSideMenuDelegate,$ionicSlideBoxDelegate){

$scope.Name = "Nezar" ;

$scope.model = {
  'job':[
  {
    'name':"ASDg" ,
    'Desc':"ANdroid"
  },
  {
    'name':"Google",
    'Desc':"Dev"
  },
  {
    'name':"Billard",
    'Desc':"Photographer"
  }
      ] ,   //  , is to assign a new Variable to the object "model"

  Name2 : "Saleh"   
};  // Model Var  




 // login Func To track on click listener on any item
$scope.login = function() {
console.log("Menu Icon");
};

$scope.toggleLeft = function(){
  $ionicSideMenuDelegate.toggleLeft(); 
  console.log("Toggle 2 ");
};

$scope.delay=3000;

 $scope.nextSlide = function() {
    
    setTimeout(function(){
  $ionicSlideBoxDelegate.slide(1,[5000]);
    console.log("Slide 3 ");
       //your code to be executed after 1 seconds
}, $scope.delay); 
    
  };

$scope.model = {
    'Business_Items' : []
};





Business.load_Business().then(function success(data){
 
  $scope.model.Business_Items = data;
     console.log("Business Articles Response"+ $scope.model.Business_Items);
 
},function error (data){
  console.log(data);

});   //  error function  and then function 






}); //  MyController 
  



starter.service("Business",function($http,$q){

var self = {

      'Business_Items' : [],
      'load_Business' : function(){
        var d = $q.defer();
        $http.get("http://24ae.sdg.ae.lilac.arvixe.com/_MobServices/CLS_MobServices.asmx/GetBusinessArticles?NumberOfItems=2")
        .success(function success(data){

        var   data2 =  data;
              data2 =  data2.replace("<?xml version=\"1.0\" encoding=\"utf-8\"?>","");
              data2 =  data2.replace("<string xmlns=\"http://24-MobData.org/\">","");
              data2 = data2.replace("</string>","");

            self.Business_Items = JSON.parse(data2);
            d.resolve(self.Business_Items);
        })
        .error (function error(msg){
            console.log(msg);
            d.reject("An Error Blast");
      });

return d.promise; 
      } //  load business function 

};  // self variable 

return self;

});  //  Business Service 

