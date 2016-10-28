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
        { text: 'I can differentiate value and growth investing', value: 6 },
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
        { text: 'My sole objective is maximum growth over the long run', value: 5 }
      ] 
    }, {
      tag: 'normal',
      text: 'Over a 1 year period, what\'s the maximum value loss you could stand?',
      values: [
        { text: 'I don\'t want to loose any money', value: 0 },
        { text: 'Between 1% and 6%', value: 1 },
        { text: 'Between 6% and 11%', value: 6 },
        { text: 'Between 11% and 15%', value: 12 },
        { text: 'Between 15% and 21%', value: 16 }
      ]
    }, {
      tag: 'normal',
      text: 'If your investment loose value, how long do you wait to bounce them back?',
      values: [
        { text: 'Less than three months', value: 0 },
        { text: 'Three to six months', value: 4 },
        { text: 'Six month to one year', value: 8 },
        { text: 'One to two years', value: 16 }
      ]
    }, {
      tag: 'ethical',
      text: 'How much would you pay for a pack of 100% recycled toilet paper?',
      values: [
        { text: 'I don\' care about recycled toilet paper', value: 0 },
        { text: 'If it\' the same price than regular toilet paper, I would buy it', value: 1 },
        { text: 'I would pay a few more cents for recycled toilet paper', value: 3 },
        { text: 'I would buy the recycled option, no matter what', value: 4 }
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
      text: 'Would you compromise the returns of the portfolio to avoid investing in unethical companies?',
      values: [
        { text: 'No way', value: 0 },
        { text: 'Yes, but only if the downside in terms of return is minimal', value: 1 },
        { text: 'Yes, I\'m ready to compromise my return up to a certain point', value: 2 },
        { text: 'Yes, I would never invest in unethical companies', value: 4 }
      ]
    }, {
      tag: 'ethical',
      text: 'How likely would you invest in a company based on what they are doing for the planet?',
      values: [
        { text: 'I would never do that', value: 0 },
        { text: 'I might do that', value: 1 },
        { text: 'That\'s something I would do', value: 2 },
        { text: 'I only invest in companies that actively making the world a better place', value: 4 }
      ]
    }
  ]

  var investorProfiles = [
    { from: 3, to: 37, profile: 'conservative' },
    { from: 38, to: 46, profile: 'balanced' },
    { from: 47, to: 55, profile: 'growth' },
    { from: 56, to: 75, profile: 'aggressive' }
  ]

  // Initialise our questionnaire with a dom accessor and the questions
  var baconQuestionnaire = BaconQuestionnaire($$, questions, investorProfiles);

  // Initialise our chart with a parent and initial size
  var baconChart = BaconPieChart('div.chart', 207);

  function test() {
    baconChart.update(data);
  }

  function test2() {
    baconChart.update(otherData);
  }

  return {
    test: test,
    test2: test2,
    questionnaire: baconQuestionnaire
  }
}
