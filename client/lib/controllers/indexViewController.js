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
    var theme = builder.questionnaire.currentQuestionAnswered() ? 'theme-white' : 'theme-gray'
    var results = 'Results <i class="icon icon-forward ' + theme + '"></i>'
    var text = builder.questionnaire.progress() == 1 ? results : '<i class="icon icon-forward ' + theme + '"></i>';
    $$('.button-next').html(text);
  }

  builder.questionnaire.addListener(refreshNextButton);

  function refreshBackButton() {
    var theme = builder.questionnaire.progress() == 1 / builder.questionnaire.numberOfQuestions() ? 'theme-gray' : 'theme-white'
    var text = '<i class="icon icon-back ' + theme + '"></i>';
    $$('.button-prev').html(text);
  }

  var next = function() {
    if (builder.questionnaire.currentQuestionAnswered()) {
      if (builder.questionnaire.progress() == 1) {
        var data = builder.questionnaire.result();
        builder.updateChart(data);
        resultController.setResult(data);
        nav.navigateTo(resultController); // defined in bacon-portfolio
      } 
      else {
        var data = builder.questionnaire.result();
        builder.updateChart(data);
        var updateFunction = builder.questionnaire.next;
        updateProgress(updateFunction);
        refreshNextButton();
        refreshBackButton();
      } 
    }
  }

  var back = function() {
    if (builder.questionnaire.progress() != 1 / builder.questionnaire.numberOfQuestions()) {
      var data = builder.questionnaire.result();
      builder.updateChart(data);
      var updateFunction = builder.questionnaire.back;
      updateProgress(updateFunction);
      refreshNextButton();
      refreshBackButton();
    }
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
