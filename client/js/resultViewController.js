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
  var mySwiper;
  var disappear = function() {
    setTimeout(function() { mySwiper.slideTo(0); }, 500);
  };

  var appear = function() {
    resultChart.update(data);
    mySwiper = app.swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationHide: false,
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
    });   
  };

  return {
    appear: appear,
    disappear: disappear,
    identifier: '#results'
  }
};
