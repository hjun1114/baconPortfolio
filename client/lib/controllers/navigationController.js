var NavigationController = function(router, appDelegate) {
  var previousView = null;
  var currentView = null;
  var router = router;
  var navigateTo = function(view) {
    if (currentView != null) {
      previousView = currentView;
      currentView.disappear();
    }

    currentView = view;
    router.loadPage(view.identifier);
    view.appear();
  };
  
  navigateBack = function() {
    currentView.disappear();
    currentView = previousView;
    router.back();
  };

  return {
    navigateTo: navigateTo,
    navigateBack: navigateBack
  };
};
