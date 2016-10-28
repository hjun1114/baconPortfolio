var IndexViewController = function(dom, appDelegate, navDelegate) { 
  var $$ = dom;
  var app = appDelegate;
  var nav = navDelegate;
  
  var builder = Builder($$);
  var progress = builder.questionnaire.progress() * 100;
  var progressbar = $$('.progress .progressbar');

  function updateProgress(update) {
    update();
    var progress = builder.questionnaire.progress() * 100;
    var progressbar = $$('.progress .progressbar');
    app.showProgressbar(progressbar, progress);
  }

  function refreshNextButton() {
    var results = 'Results <i class="icon icon-forward theme-white"></i>'
    var text = builder.questionnaire.progress() == 1 ? results : 'Next';
    $$('.button-next').html(text);
  }

  function refreshBackButton() {
    // TODO Change color when back is disabled
  }

  var next = function() {
    if (builder.questionnaire.progress() == 1) {
       nav.navigateTo(resultController); // defined in bacon-portfolio
    } 
    else {
      builder.test();
      var updateFunction = builder.questionnaire.next;
      updateProgress(updateFunction);
      refreshNextButton(); 
    } 
  }

  var back = function() {
    builder.test2();
    var updateFunction = builder.questionnaire.back;
    updateProgress(updateFunction);
    refreshNextButton();
  }

  var disappear = function() {

  };

  var appear = function() {
    $$('.navbar').removeClass('splash');
    app.showProgressbar(progressbar, progress);
  };

  return {
    appear: appear,
    disappear: disappear,
    identifier: '#index',
    next: next,
    back: back
  }
};
