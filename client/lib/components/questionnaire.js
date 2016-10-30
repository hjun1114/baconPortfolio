var BaconQuestionnaire = function(dom, questions, investorProfiles) {
  var $$ = dom;
  var profiles = investorProfiles;
  var questionList = questions.map(function(question) {
    question.selectedIndex = -1;
    return question;
  });
  var currentQuestionIndex = 0;
  var listeners = []; 
  function questionnaireTableViewCell(title, index) {
    var checked = currentQuestion()['selectedIndex'] == index ? 'checked' : '';
    var cell = $$('<label class="label-radio item-content">' +
      '<input type="radio" name="my-radio" value="' + title + '" ' + checked + '>' +
      '<div class="item-inner">' +
      '<div class="item-title">' + title + '</div>' +
      '</div></label>');
    
    cell.prop('checked', checked);
    cell.on('click', function(e) {
      didSelectAnswer(title);
    });

    return cell;           
  }
  
  function prepareQuestion() {
    $$('.question').html(currentQuestion().text);
    var answers = $$('.answers ul');
    answers.html('');
    currentQuestion().values.forEach(function(value, index) {
      answers.append(questionnaireTableViewCell(value.text, index));
    });
  }
  
  function addListener(func) {
    listeners.push(func);
  }

  function didSelectAnswer(answer) {
    var index = currentQuestion().values.findIndex(function(element, index, array) {
      return element.text == answer; 
    });
    currentQuestion().selectedIndex = index;
    listeners.forEach(function (func) {
      func();
    });
  }

  function currentQuestionAnswered() { return currentQuestion().selectedIndex != -1; }
  function numberOfQuestions() { return questionList.length; }
  function numberOfEthicalQuestions() {
    return questionList.filter(function (question) { return question.tag == 'ethical' }).length;
  }

  function numberOfInvestmentQuestions() {
    return questionList.filter(function (question) { return question.tag == 'normal' }).length;
  }

  var progress = function() { return (currentQuestionIndex+1) / numberOfQuestions(); }
  var currentQuestion = function() { return questionList[currentQuestionIndex]; }
  var next = function(answerIndex) {
    if (currentQuestionIndex < numberOfQuestions() - 1) {
      currentQuestion().answerIndex = answerIndex;
      ++currentQuestionIndex;
      prepareQuestion();  
    }
    
    return currentQuestion();
  };

  var back = function() {
    if (currentQuestionIndex > 0) {
      --currentQuestionIndex;
      prepareQuestion();
    }

    return currentQuestion();
  };
  
  var done = function() {
    // TODO get to the next window, who computes results ?
  }
  
  var result = function() {
    return {
      equity: computeEquity(),
      fixedIncome: computeFixedIncome(),
      investorProfile: computeInvestorProfile(),
      ethicalScore: ethicalScore(),
      investorScore: investorScore()
    }
  }

  function ethicalScore() {
    return questions.filter(function (question) {
      return question.tag == 'ethical' && question.selectedIndex != -1;
    }).reduce(function (a, b) {
      var nextValue = b.values[b.selectedIndex].value;
      return a + nextValue;
    }, 0);
  }

  function investorScore() {
    return questions.filter(function (question) {
      return question.tag == 'normal' && question.selectedIndex != -1;
    }).reduce(function (a, b) {
      var nextValue = b.values[b.selectedIndex].value;
      return a + nextValue;
    }, 0);
  }

  function computeEquity() {
    return ((investorScore() - 3) / 72 * 80) + 10
  }

  function computeFixedIncome() {
    return 100 - computeEquity();
  }

  function computeInvestorProfile() {
    var score = investorScore();
    return investorProfiles.filter(function (profile) {
      return profile.from <= score && score <= profile.to; 
    })[0];
  }
  
  prepareQuestion();

  return {
    numberOfQuestions: numberOfQuestions,
    next: next,
    back: back,
    done: done,
    progress: progress,
    result: result,
    currentQuestionAnswered: currentQuestionAnswered,
    addListener: addListener
  };
}
