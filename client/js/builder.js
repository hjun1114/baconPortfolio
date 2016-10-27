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
        'Under 50,000', 
        '50,000 - 100,000', 
        '100,000 - 150,000', 
        '150,000 - 200,000', 
        'More than 200,000'
      ] 
    }, { 
      tag: 'normal',
      text: 'When will you need the cash invested?', 
      values: [
        'In less than 5 years', 
        'In 6 to 10 years', 
        'In 11 to 15 years', 
        'In 16 to 20 years',
        'In more than 20 years'
      ] 
    }, { 
      tag: 'normal',
      text: 'What is your main goal with this portfolio?', 
      values: [
        'Safety of my money is my first priority', 
        'Growth without unstable returns', 
        'Balance between growth and safety', 
        'My primary concern is growth', 
        'My sole objective is maximum growth over the long run'
      ] 
    }, {
      tag: 'normal',
      text: 'Over a 1 year period, what\'s the maximum value loss you could stand?',
      values: [
        'I don\'t want to loose any money',
        'Between 1% and 6%',
        'Between 6% and 11%',
        'Between 11% and 15%',
        'Between 15% and 21%'
      ]
    }, {
      tag: 'normal',
      text: 'If your investment loose value, how long do you wait to bounce them back?',
      values: [
        'Less than three months',
        'Three to six months',
        'Six month to one year',
        'One to two years'
      ]
    }, {
      tag: 'ethical',
      text: 'How much would you pay for a pack of 100% recycled toilet paper?',
      values: [
        'I don\' care about recycled toilet paper',
        'If it\' the same price than regular toilet paper, I would buy it',
        'I would pay a few more cents for recycled toilet paper',
        'I would buy the recycled option, no matter what'
      ]
    }, {
      tag: 'ethical',
      text: 'Would you invest in a company that pollutes if it was a good investment?',
      values: [
        'Yes',
        'No'
      ]
    }
  ]

  // Initialise our questionnaire with a dom accessor and the questions
  var baconQuestionnaire = BaconQuestionnaire($$, questions);

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
