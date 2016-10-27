// Initialize app
var myApp = new Framework7();
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

var builder = Builder($$);
var progress = builder.questionnaire.progress() * 100;
var progressbar = $$('.progress .progressbar');

function updateProgress(update) {
  update();
  var progress = builder.questionnaire.progress() * 100;
  var progressbar = $$('.progress .progressbar');
  myApp.showProgressbar(progressbar, progress);
}

function refreshNextButton() {
  var results = 'Results <i class="icon icon-forward theme-white"></i>'
  var text = builder.questionnaire.progress() == 1 ? results : 'Next';
  $$('.button-next').html(text);
}

function refreshBackButton() {
  // TODO Change color when back is disabled
}

function navigateBack() {
  mainView.router.back();
}

function initializeApp() {
  mainView.router.loadPage('#index');
  $$('.navbar').removeClass('splash');
  myApp.showProgressbar(progressbar, progress);
}

// TODO ResultPageViewController
var resultChart = BaconPieChart('div.result-chart', 160);
                      
function next() {
  if (builder.questionnaire.progress() == 1) {
    var data = [
      { label: 'Wow', value: 10, category: ASSET_CATEGORIES.US_STOCKS }, 
      { label: 'Ok', value: 40, category: ASSET_CATEGORIES.CAN_STOCKS }, 
      { label: 'Bleh', value: 15, category: ASSET_CATEGORIES.INT_STOCKS },
      { label: 'Oh', value: 35, category: ASSET_CATEGORIES.FIXED_INCOME }
    ];
    resultChart.update(data);
    mainView.router.loadPage('#results');

    // TODO Reload swiper after going back to questionnaire
    var mySwiper = myApp.swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationHide: false,
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });   
    mySwiper.swipeTo(0);
  } 
  else {
    builder.test();
    var updateFunction = builder.questionnaire.next;
    updateProgress(updateFunction);
    refreshNextButton(); 
  } 
}

setTimeout(initializeApp, 1500);

function back() {
  builder.test2();
  var updateFunction = builder.questionnaire.back;
  updateProgress(updateFunction);
  refreshNextButton();
}

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true,
  domCache: true
});
