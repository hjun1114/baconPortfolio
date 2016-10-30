var ResultViewController = function(dom, appDelegate, navDelegate) {
  var $$ = dom;
  var app = appDelegate;
  var nav = navDelegate;
  var resultChart = BaconPieChart('div.result-chart', 160, false); 
  var data = [
    { label: 'Wow', value: 10, category: ASSET_CATEGORIES.US_STOCKS }, 
    { label: 'Ok', value: 40, category: ASSET_CATEGORIES.CAN_STOCKS }, 
    { label: 'Bleh', value: 15, category: ASSET_CATEGORIES.INT_STOCKS },
    { label: 'Oh', value: 35, category: ASSET_CATEGORIES.FIXED_INCOME }
  ];
  var portfolioList = [{
      title: 'Growth portfolio by Blackrock',
      fixedIncome: [],
      usStocks: [],
      canStocks: [
        { title: 'XIC: IShares Core S&P#TSX Capped Composite Index ETF', value: 45 }
      ],
      intStocks: [
        { title: 'XAW: IShares Core MSCI All Country World ex Canada Index ETF', value: 55 }
      ]
    }, {
      title: 'Growth portfolio by ModernAvisor',
      fixedIncome: [
        { title: 'Vanguard FTSE Canadian Capped REIT ETF', value: 13 },
        { title: 'Vanguard Canadian Short-term Bond ETF', value: 2.9 }
      ],
      usStocks: [
        { title: 'Vabguard US Total Market ETF', value: 5.8 }
      ],
      canStocks: [
        { title: 'IShares Core S&P/TSX Capped Composition ETF', value: 23.7 }
      ],
      intStocks: [
        { title: 'Vanguard Developed ex North America ETF', value: 23.1 },
        { title: 'Vanguard FTSE Emerging Markets All Cap Index ET', value: 22.4 }
      ]
    }, {
      title: 'Growth portfolio by Invisor',
      fixedIncome: [
        { title: 'Cash', value: 1 }
      ],
      usStocks: [
        { title: 'IShares Core High Dividend ETF', value: 18 },
        { title: 'Vanguard Total Stock Market ETF', value: 18 },
        { title: 'Vanguard U.S. Total Market Index ETF', value: 18 }
      ],
      canStocks: [
        { title: 'BMO Low Volatility Canadian Equity ETF', value: 10 }
      ],
      intStocks: [
        { title: 'BMO Global Infrastructure ETF', value: 8.75 },
        { title: 'Vanguard FTSE Developed Markets ETF', value: 8.75 },
        { title: 'Vanguard FTSE Emerging Markets ETF', value: 8.75 },
        { title: 'IShares Core MSCI EAFE IMI Index ETF', value: 8.75 }
      ]
    }
  ];

  var mySwiper = null;
  var resultData = null;
  var i = 0; 
  
  var chartData = portfolioList.map(buildChartDataFromPortfolio);
  chartData.forEach(function (datum, index) {
    appendResultSliderSlide(datum, portfolioList[index]);
  });

  var charts = [];
  function appendResultSliderSlide(chartData, assetsData) {
    ++i;
    var container = '<div class="swiper-slide">' +
      '<h2 class="center white">' + assetsData.title + '</h2>' +
      '<div class="result-chart-' + i + '" align="center"></div>';
    
    var assets = '<div class="assets">' +
      '<div class="content-block-title white">Portfolio assets</div>' +
      '<div class="list-block"><ul>'; 
      

    function appendAsset(asset) {
      assets += '<li class="item-content">' +
        //'<div class="item-media"><i class="icon icon-cola"></i></div>' +
        '<div class="item-inner">' +
          '<div class="item-title">' + asset.title + '</div>' +
          '<div class="item-after">' + asset.value + '%</div>' +
        '</div></li>';
    };

    if (assetsData.usStocks.length != 0) {
      assets+= '<li class="list-group-title">US Stocks</li>';
      assetsData.usStocks.forEach(appendAsset);
    }

    if (assetsData.canStocks.length != 0) {
      assets+= '<li class="list-group-title">Canadian Stocks</li>';
      assetsData.canStocks.forEach(appendAsset);
    }

    if (assetsData.intStocks.length != 0) {
      assets+= '<li class="list-group-title">International Stocks</li>';
      assetsData.intStocks.forEach(appendAsset);
    }

    if (assetsData.fixedIncome.length != 0) {
      assets+= '<li class="list-group-title">Fixed Income</li>';
      assetsData.fixedIncome.forEach(appendAsset);
    }
    assets += '</ul></div></div></div>';

    container += assets;

    $$('.swiper-wrapper').append($$(container));

    var resultChart = BaconPieChart('div.result-chart-' + i, 140, false); 
    resultChart.update(chartData, 0);
  }

  function buildChartDataFromPortfolio(portfolio) {
    var fixedIncome = portfolio.fixedIncome.reduce(function (a, b) {
      return a + b.value;
    }, 0);

    var usStocks = portfolio.usStocks.reduce(function (a, b) {
      return a + b.value;
    }, 0);

    var canStocks = portfolio.canStocks.reduce(function (a, b) {
      return a + b.value;
    }, 0);

    var intStocks = portfolio.intStocks.reduce(function (a, b) {
      return a + b.value
    }, 0);
    
    var data = [
      { label: 'USS', value: usStocks, category: ASSET_CATEGORIES.US_STOCKS }, 
      { label: 'CAN', value: canStocks, category: ASSET_CATEGORIES.CAN_STOCKS }, 
      { label: 'INT', value: intStocks, category: ASSET_CATEGORIES.INT_STOCKS },
      { label: 'FIX', value: fixedIncome, category: ASSET_CATEGORIES.FIXED_INCOME }
    ]; 
    
    return data;
  }

  var disappear = function() {
    resultData = null;
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
