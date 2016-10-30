var Builder = function($$) {
  // TODO Get new object arrays from backend ?
  // TODO Find a better name
  var data = [
    { label: 'Wow', value: 10, category: ASSET_CATEGORIES.US_STOCKS }, 
    { label: 'Ok', value: 40, category: ASSET_CATEGORIES.CAN_STOCKS }, 
    { label: 'Bleh', value: 15, category: ASSET_CATEGORIES.INT_STOCKS },
    { label: 'Oh', value: 35, category: ASSET_CATEGORIES.FIXED_INCOME }
  ];

  var otherData = [
    { label: 'Wow', value: 35, category: ASSET_CATEGORIES.US_STOCKS }, 
    { label: 'Ok', value: 40, category: ASSET_CATEGORIES.CAN_STOCKS }, 
    { label: 'Bleh', value: 25, category: ASSET_CATEGORIES.INT_STOCKS },
    { label: 'Oh', value: 0, category: ASSET_CATEGORIES.FIXED_INCOME }
  ];
  
  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  }

  var questions = [{  
      tag: 'normal',
      text: 'How old are you?', 
      values: [
        { text: 'Under thirty', value: 6 }, 
        { text: 'In my thirties', value: 5 },
        { text: 'In my forties', value: 4 },
        { text: 'In my fifties', value: 2 },
        { text: 'Older than sixty', value: 0 }
      ] 
    }, {
      tag: 'normal',
      text: 'How much do you know about investment?',
      values: [
        { text: 'Nothing', value: 0 },
        { text: 'I know what a stock is', value: 2 },
        { text: 'I know a few different ways to invest', value: 4 },
        { text: 'I know what value and growth investing', value: 6 },
        { text: 'I\'m an investing know-it-all', value: 8 }
      ]
    }, { 
      tag: 'normal',
      text: 'What is your net worth?', 
      values: [
        { text: 'Under 50,000', value: 1 },
        { text: '50,000 - 100,000', value: 2 },
        { text: '100,000 - 150,000', value: 4 },
        { text: '150,000 - 300,000', value: 6 },
        { text: 'More than 300,000', value: 8 }
      ] 
    }, { 
      tag: 'normal',
      text: 'When will you need the cash invested?', 
      values: [
        { text: 'In less than 5 years', value: 0 },
        { text: 'In 6 to 10 years',  value: 1 },
        { text: 'In 11 to 15 years', value: 2 },
        { text: 'In 16 to 20 years', value: 4 },
        { text: 'In 21 to 25 years', value: 5 },
        { text: 'In more than 25 years', value: 6 }
      ] 
    }, { 
      tag: 'normal',
      text: 'What is your main goal with this portfolio?', 
      values: [
        { text: 'Safety of my money is my first priority', value: 0 },
        { text: 'Growth without unstable returns', value: 2 },
        { text: 'Balance between growth and safety', value: 3 },
        { text: 'My primary concern is growth', value: 4 },
        { text: 'My sole objective is maximum growth', value: 5 }
      ] 
    }, {
      tag: 'normal',
      text: "Over 1 year, what money loss could you stand?",
      values: [
        { text: 'I don\'t want to loose any money', value: 0 },
        { text: 'Between 1% and 6%', value: 1 },
        { text: 'Between 6% and 11%', value: 6 },
        { text: 'Between 11% and 15%', value: 12 },
        { text: 'Between 15% and 21%', value: 16 }
      ]
    }, {
      tag: 'normal',
      text: 'Your investment loose value. How long do you wait to bounce them?',
      values: [
        { text: 'Less than three months', value: 0 },
        { text: 'Three to six months', value: 4 },
        { text: 'Six month to one year', value: 8 },
        { text: 'One to two years', value: 16 }
      ]
    }, {
      tag: 'ethical',
      text: 'How much would you pay for 100% recycled toilet paper?',
      values: [
        { text: 'I don\'t care about recycled toilet paper', value: 0 },
        { text: 'If it\'s the same price, I would buy it', value: 1 },
        { text: 'I\'d pay a little more for recycled paper', value: 3 },
        { text: 'I only buy recycled toilet paper', value: 4 }
      ]
    }, {
      tag: 'ethical',
      text: 'Would you invest in a company that pollutes if it was a good investment?',
      values: [
        { text: 'Yes', value: 0 },
        { text: 'No', value: 1 }
      ]
    }, {
      tag: 'ethical',
      text: 'Would you compromise your returns to avoid investing in unethical companies?',
      values: [
        { text: 'No way', value: 0 },
        { text: 'Yes, but only if the downside is minimal', value: 1 },
        { text: 'Yes, I\'m ready to compromise my return', value: 2 },
        { text: 'Yes, I\'d never invest in unethical companies', value: 4 }
      ]
    }, {
      tag: 'ethical',
      text: 'Would you invest in a company based on what they do for the planet?',
      values: [
        { text: 'I would never do that', value: 0 },
        { text: 'I might do that', value: 1 },
        { text: 'That\'s something I would do', value: 2 },
        { text: 'Absolutely', value: 4 }
      ]
    }
  ]

  var investorProfiles = [
    { from: 3, to: 37, profile: 'conservative' },
    { from: 38, to: 46, profile: 'balanced' },
    { from: 47, to: 55, profile: 'growth' },
    { from: 56, to: 75, profile: 'aggressive' }
  ]

  // Shuffle our questions
  shuffle(questions);

  // Initialise our questionnaire with a dom accessor and the questions
  var baconQuestionnaire = BaconQuestionnaire($$, questions, investorProfiles);

  // Initialise our chart with a parent and initial size
  var baconChart = BaconPieChart('div.chart', 165);
  
  function buildDataFromResult(result) {
    var data = [
      { label: 'Wow', value: result.equity/3, category: ASSET_CATEGORIES.US_STOCKS }, 
      { label: 'Ok', value: result.equity/3, category: ASSET_CATEGORIES.CAN_STOCKS }, 
      { label: 'Bleh', value: result.equity/3, category: ASSET_CATEGORIES.INT_STOCKS },
      { label: 'Oh', value: result.fixedIncome, category: ASSET_CATEGORIES.FIXED_INCOME }
    ];

    return data;
  }

  function updateChart(data) {
    var datum = buildDataFromResult(data)
    baconChart.update(buildDataFromResult(data), data.ethicalScore);
  }

  return {
    updateChart: updateChart,
    questionnaire: baconQuestionnaire
  }
}
