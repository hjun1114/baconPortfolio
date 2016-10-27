var BaconQuestionnaire = function(dom, questions) {
  var $$ = dom;
  var questionList = questions.map(function(question) {
    question.selectedIndex = -1;
    return question;
  });
  var currentQuestionIndex = 0;
   
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
      answers.append(questionnaireTableViewCell(value, index));
    });
  }
  
  function didSelectAnswer(answer) {
    var index = currentQuestion().values.findIndex(function(element, index, array) {
      return element == answer; 
    });
    currentQuestion()['selectedIndex'] = index;
  }

  var numberOfQuestions = function() { return questionList.length; }
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
  
  var ethicalScore = function() {
    return questions.filter(function (question) {
      return question.tag == 'ethical';
    }).map(function (question) {

    });
  };

  var investorScore = function() {
    return questions.filter(function (question) {
      return question.tag == 'normal';
    }).map(function (question) {
      
    });
  };

  prepareQuestion();

  return {
    numberOfQuestions: numberOfQuestions,
    next: next,
    back: back,
    done: done,
    progress: progress
  };
}
