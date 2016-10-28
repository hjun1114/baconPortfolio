var ResultViewController = function(dom, appDelegate, navDelegate) {
  var $$ = dom;
  var app = appDelegate;
  var nav = navDelegate;
  var resultChart = BaconPieChart('div.result-chart', 160); 
  var data = [
    { label: 'Wow', value: 10, category: ASSET_CATEGORIES.US_STOCKS }, 
    { label: 'Ok', value: 40, category: ASSET_CATEGORIES.CAN_STOCKS }, 
    { label: 'Bleh', value: 15, category: ASSET_CATEGORIES.INT_STOCKS },
    { label: 'Oh', value: 35, category: ASSET_CATEGORIES.FIXED_INCOME }
  ];
  var mySwiper = null;
  var resultData = null;

  var disappear = function() {
    resultData = null;
    setTimeout(function() { mySwiper.slideTo(0); }, 500);
  };

  var appear = function() {
    console.log(resultData);
    resultChart.update(data);
    mySwiper = app.swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationHide: false,
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });   
  };
  
  var setResult = function(result) {
    resultData = result;
  };

  return {
    appear: appear,
    disappear: disappear,
    identifier: '#results',
    setResult: setResult
  }
};
