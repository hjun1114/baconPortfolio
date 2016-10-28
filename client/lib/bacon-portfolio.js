// Initialize app
var myApp = new Framework7();
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
  domCache: true
});

var navigationController = NavigationController(mainView.router, myApp);

// Init view controllers
var indexController = IndexViewController($$, myApp, navigationController);
var resultController = ResultViewController($$, myApp, navigationController);

var navigateBack = navigationController.navigateBack;

function initializeApp() {
  navigationController.navigateTo(indexController);
}

setTimeout(initializeApp, 1500);

// Add view

