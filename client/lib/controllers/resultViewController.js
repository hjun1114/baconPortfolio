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

  var portfolioList = [
    //DEFENSIVE
    { 
      tag: 'defensive',
      title: 'Defensive porfolio by Blackrock',
      fixedIncome: [
        {title: 'XQB: IShares Core High Quality Canadian Bond Index ETF', value: 60},
        {title: 'XSQ: IShare Core Short Term High Quality Canadian Bond Index ETF', value: 10},
        {title: 'XSH: IShare Core Canadian Short Term Corporate + Maple Bond Index ETF', value: 4}
      ],
      usStocks: [],
      canStocks: [
      {title: 'XIC: IShare Core S&P#TSX Capped Composite Index ETF', value: 11}],
      intStocks: [
      {title: 'XAW: IShares Core MSCI All Country World ex Canada Index ETF', value: 15}
      ]
    },
    {
      tag: 'defensive',
      title: '80FI-20EQ by PWL Model ETF Porfolios',
      fixedIncome: [
        {title: 'VSB: Vanguard Canadian Short-Therm Bond Index', value: 80}
      ],
      usStocks: [
        {title:'VUN: Vanguard U.S. Total Market Index ETF', value: 7}
      ],
      canStocks: [
        {title: 'VCN:Vanguard FTSE Canada All Cap Index ETF', value: 7}
      ],
      intStocks: [
        {title:'XEF: IShares Core MSCI EAFE IMI Index ETF', value: 5},
        {title:'XEC: IShares Core MSCI Emerging Markets IMI Index ETF', value: 1}
      ]
    },
    {
      tag: 'defensive',
      title: 'Social Responsable Investment portfolio risk level 1 by ModernAdvisor',
      fixedIncome: [
        {title:'IShares Short-Term Government Bond Index ETF', value: 90},
        {title:'BMO Emerging Market Bond ETF', value: 3.2}
      ],
      usStocks: [
        {title:'IShare MSCI KLD 400 Social ETF', value: 2.6}
      ],
      canStocks: [
        {title:'IShare Jantzi Social Index ETF', value: 4.2}
      ],
      intStocks: []
    },

    //CONSERVATIVE
    {
      tag: 'conservative',
      title: 'Conservateur portefeuille par Investcube ',
      fixedIncome: [
        {title: 'Cash', value: 15},
        {title: 'XQB-T: IShares Core High Quality Canadian Bond Index ETF', value: 30},
        {title: 'HAB-T: Horizons Active Corporate Bond ETF', value: 15},
        {title: 'HYI-T: Horizons Active High Yield Bond ETF', value: 10},
        {title: 'HPR--T: Horizons Active Preferred Share ETF', value: 5},
        {title: 'ZEF-T: BMO Emerging Market Bond Hedged to CAD Index ETF', value: 5}
      ],
      usStocks: [],
      canStocks: [
        {title: 'XIC: IShares Core S&P/TSX Capped Composite Index ETF', value: 7.5}
      ],
      intStocks: [
        {title: 'VIT-NY: Vanguard Total Stock Maret ETF', value: 7.5},
        {title: 'RWO-NY: SPDR Dow Jones Global Real Estate ETF', value: 5}
      ]
    },
    {
      tag: 'conservative',
      title: 'Cautious portfolio by Vanguard ETFs',
      fixedIncome: [
        {title: 'VAB: Vanguard Canadian Aggregate Bond Index ETF', value: 55}
      ],
      usStocks: [],
      canStocks: [
        {title: 'VCN: Vanguard FTSE Canada All Cap Index ETF', value: 15}
      ],
      intStocks: [
        {title: 'VXC: Vanguard FTSE All-World ex Canada Index ETF', value: 30}
      ]
    },
    {
      tag: 'conservative',
      title: 'IA Clarington Inhance Conservative SRI Portfolio',
      fixedIncome: [
        {title: 'IA Clarington Bond Fund, Series I', value: 55.95},
        {title: 'IA Clarington Inhance Monthly Income SRI Fund, Serie', value: 8.02}
      ],
      usStocks: [],
      canStocks: [
        {title: 'IA Clarington Inhance Monthly Income SRI Fund, Serie', value: 12.02},
        {title: 'IA Clarington Inhance Canadian Equity SRI Class', value: 10}
      ],
      intStocks: [
        {title: 'IA Clarington Inhance Global Equity SRI Class, Series I', value: 14.01}
      ]
    },

    //BALANCED
    {
      tag: 'balanced',
      title: 'Balanced Portfolio by Blackrock ',
      fixedIncome: [
        {title: 'XQB: IShares Core High Quality Canadian Bond Index ETF', value: 30},
        {title: 'XSQ: IShares Core Short Term High Quality Canadian Bond Index ETF', value: 10},
        {title: 'XSH: IShares Core Canadian Short Term Corporate + Maple Bond Index ETF', value: 4}
      ],
      usStocks: [],
      canStocks: [
        {title: 'XIC: IShares Core S&P#TSX Capped Composite Index ETF', value: 20}
      ],
      intStocks: [
        {title: 'XAW: IShares Core MSCI All Country World ex Canada Index ETF', value: 36}
      ]
    },
    {
      tag: 'balanced',
      title: 'IA Clarington Inhance Conservative SRI Portfolio',
      fixedIncome: [{title: 'IA Clarington Bond Fund, Series I', value: 39.9},
        {title: 'IA Clarington Inhance Monthly Income SRI Fund, Serie', value: 7.1}
      ],
      usStocks: [],
      canStocks: [
        {title: 'IA Clarington Inhance Monthly Income SRI Fund, Serie', value: 10.8},
        {title: 'IA Clarington Inhance Canadian Equity SRI Class', value: 18.1}
      ],
      intStocks: [
        {title: 'IA Clarington Inhance Global Equity SRI Class, Series I', value: 24.1}
      ]
    },
    {
      tag: 'balanced',
      title: 'Balanced portfolio by Vanguard ETFs',
      fixedIncome: [
        {title: 'VAB: Vanguard Canadian Aggregate Bond Index ETF', value: 40}
      ],
      usStocks: [],
      canStocks: [
        {title: 'VCN: Vanguard FTSE Canada All Cap Index ETF', value: 20}
      ],
      intStocks: [
        {title: 'VXC: Vanguard FTSE All-World ex Canada Index ETF', value: 40}
      ]
    },

    //GROWTH
    {
      tag: 'growth',
      title: 'Growth Portfolio by Blackrock',
      fixedIncome: [
        {title: 'XLB: IShares Core Canadian Long Term Bond Index ETF', value: 1},
        {title: 'XQB: IShares Core High Quality Canadian Bond Index ETF', value: 10},
        {title: 'XSQ: IShares Core Short Term High Quality Canadian Bond Index ETF', value: 10},
        {title: 'XSH: IShares Core Canadian Short Term Corporate + Maple Bond Index ETF', value: 4}
      ],
      usStocks: [],
      canStocks: [
        {title: 'XIC: IShares Core S&P#TSX Capped Composite Index ETF', value: 30}
      ],
      intStocks: [
        {title: 'XAW: IShares Core MSCI All Country World ex Canada Index ETF', value: 45}
      ]
    },
    {
      tag: 'growth',
      title: 'Investcube Growth Porfolio',
      fixedIncome: [
        {title: 'Cash', value: 2},
        {title: 'HAB-T: Horizons Active Corporate Bond ETF', value: 9},
        {title: 'HYI-T: Horizons Active High Yield Bond ETF', value: 14}
      ],
      usStocks: [],
      canStocks: [
        {title: 'XIC-T: IShares Core S&P/TSX Capped Composite Index ETF', value: 20},
        {title: 'VRE-T: FTSE Canadina Capped REIT Index ETF', value: 7}
      ],
      intStocks: [
        {title: 'VIT-NY: Vanguard Total Stock Maret ETF', value: 10},
        {title: 'XEF-T: IShares Core MSCI EAFE IMI Index ETF', value: 15},
        {title: 'IJH-NY: IShares Core S&P Mid- Cap ETF', value: 13},
        {title: 'VWO-NY: Vanguard FTSE Emerging Market ETF', value: 10}
      ]
    },
    {
      tag: 'growth',
      title: 'IA Clarington Inhance Growth SRI Portfolio',
      fixedIncome: [
        {title: 'IA Clarington Bond Fund, Series I', value: 28},
        {title: 'IA Clarington Inhance Monthly Income SRI Fund, Serie', value: 6}
      ],
      usStocks: [],
      canStocks: [
        {title: 'IA Clarington Inhance Monthly Income SRI Fund, Serie', value: 9},
        {title: 'IA Clarington Inhance Canadian Equity SRI Class', value: 25}
      ],
      intStocks: [
        {title: 'IA Clarington Inhance Global Equity SRI Class, Series I', value: 32}
      ]
    },

    //MAX GROWTH/AGGRESSIVE
    {
      tag: 'aggressive',
      title: 'Max Growth Portfolio by Blackrock',
      fixedIncome: [],
      usStocks: [],
      canStocks: [
        { title: 'XIC: IShares Core S&P#TSX Capped Composite Index ETF', value: 45 }
      ],
      intStocks: [
        { title: 'XAW: IShares Core MSCI All Country World ex Canada Index ETF', value: 55 }
      ]
    }, {
      tag: 'aggressive',
      title: 'Aggressive Growth portfolio by ModernAvisor',
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
      tag: 'aggressive',
      title: 'Aggressive Growth portfolio by Invisor',
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

    var filteredPortfolioList = portfolioList.filter(function(portfolio){ 
      return portfolio.tag == resultData.investorProfile.profile;
    });
    
    var chartData = filteredPortfolioList.map(buildChartDataFromPortfolio);

    $$('.swiper-wrapper').html('');

    chartData.forEach(function (datum, index) {
      appendResultSliderSlide(datum, filteredPortfolioList[index]);
    });
  };

  return {
    appear: appear,
    disappear: disappear,
    identifier: '#results',
    setResult: setResult
  }
};
