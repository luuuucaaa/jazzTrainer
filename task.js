var timeCounter;

class Task{
  constructor(taskType, dictSource, taskDisplayX, taskDisplayY) {
    this.taskType = taskType; // keyword for task type ('chord', 'chordProgression', 'scale', 'chordWithScale')
    this.dictSource = dictSource; // id for dictionary item ('chords7', 'chords9', 'chords11', 'chords13', 'scalesChurch', ...)
    this.dictPath = 'dict.' + this.dictSource;
    this.task = undefined;
    this.solution = undefined;
    this.options = undefined;
    this.isTask = false;
    this.isTaskSolved = false;
    this.timeCounter = 0;
    this.checkAnswerDelayChords = 1;
    this.checkAnswerDelayProgressions = 0.5;

    this.taskDisplayX = taskDisplayX;
    this.taskDisplayY = taskDisplayY;
  }

  getTask() {
    if (!this.isTask) {
      if (this.taskType == 'chord') {

        var randomChord = getRandomChord(this.dictPath);
        this.task = randomChord[1];
        this.solution = randomChord[2];
        this.options = randomChord[3];

      } else if (this.taskType == 'chordProgression') {

        var chordProgression = getChordProgressionInRandomKey(this.dictSource); // dictSource gets used as progression name
        this.solutionChords = chordProgression[0];
        this.task = chordProgression[1];
        this.solution = chordProgression[2];
        this.options = chordProgression[3];

      } else if (this.taskType == 'scale') {

        var randomScale = getRandomScale(this.dictPath);
        this.task = randomScale[0];
        this.solution = randomScale[1];
        this.options = randomScale[2];

      } else if (this.taskType == 'chordWithScale') {

        console.log('Task type not implemented yet.');

      } else {

        console.log('Invalid task type.');
      }

      this.isTask = true;
      this.isTaskSolved = false;
    }

    text(this.task, this.taskDisplayX, this.taskDisplayY);
  }

  checkAnswer(answerStack, answerQueue, numberStack, numberQueue) {
    this.answerStack = answerStack;
    this.answerQueue = answerQueue;
    this.numberStack = numberStack;
    this.numberQueue = numberQueue;

    if (this.isTask) {
      var isRight = false;

      if (this.taskType == 'chord') {

        if (checkChordAnswer(this.answerStack, this.solution, this.options, this.checkAnswerDelayChords, this.numberStack)) {
          this.isTaskSolved = true;
          this.isTask = false;
        };

        if (isDisplaySolution) {
          displayChordSolution(this.solution, this.options, this.taskDisplayX, this.taskDisplayY + 40);
        }

      } else if (this.taskType == 'chordProgression') {

        if (checkChordProgressionAnswer(this.answerStack, this.solution, this.options, this.checkAnswerDelayChords, this.numberStack)) {
          this.isTaskSolved = true;
          this.isTask = false;
        };

        if (isDisplaySolution) {
          displayChordProgressionSolution(this.solutionChords, this.taskDisplayX, this.taskDisplayY + 40);
        }

      } else if (this.taskType == 'scale') {

        if (checkScaleAnswer(this.answerQueue, this.solution, this.numberQueue)) {
          this.isTaskSolved = true;
          this.isTask = false;
        };

        if (isDisplaySolution) {
          displayScaleSolution(this.solution, this.options, this.taskDisplayX, this.taskDisplayY + 40);
        }

      } else if (this.taskType == 'chordWithScale') {

        console.log('Task type not implemented yet.');

      } else {

        console.log('Invalid task type.');

      }
    }
  }
}

function checkChordAnswer(answerStack, solution, options, checkAnswerDelay, numberStack) {
  var answerStackSorted = answerStack.sort();
  var solutionSorted = solution.slice(0).sort();

  var difference = arrayDifference(answerStackSorted, solutionSorted);
  var isRight = checker(options, difference) && answerStackSorted.length >= solutionSorted.length - options.length;

  if (answerStack.length > 0) {

    if (isRight) {
      timeCounter++;
      if (timeCounter > checkAnswerDelay * frameRate()) {
        keyboard.validationFlash(numberStack, true);
        timeCounter = -100;

        return true;
      }
    }

    if(!isRight) {
      timeCounter++;
      if (timeCounter > checkAnswerDelay * frameRate()) {
        keyboard.validationFlash(numberStack, false);
        timeCounter = -100;
      }
    }
  } else {
    timeCounter = 0;
  }
}

function checkScaleAnswer(answerQueue, solution, numberQueue) {
  if (answerQueue.length > solution.length) {
    answerQueue.shift();
    numberQueue.shift();
  }

  var isRight = (answerQueue.length == solution.length) && answerQueue.every(function(element, index) {
    return element === solution[index];
  });

  if (isRight) {
    keyboard.validationFlash(numberQueue, true);
    return true;
  }
}

function checkChordAnswerInProgression(answerStack, solution, options, numberStack) {
  var answerStackSorted = answerStack.sort();
  var solutionSorted = solution.slice(0).sort();

  var difference = arrayDifference(answerStackSorted, solutionSorted);
  var isRight = checker(options, difference) && answerStackSorted.length >= solutionSorted.length - options.length;

  if (answerStack.length > 0) {

    if (isRight) {
      return true;
    }
  }
}

var chordProgressionIndex = 0;
function checkChordProgressionAnswer(answerStack, solution, options, checkAnswerDelayChords, numberStack) {
  var solutionFlat = solution.flat();

  if (checkChordAnswerInProgression(answerStack, solution[chordProgressionIndex], options[chordProgressionIndex], numberStack)) {
    chordProgressionIndex++;
  };

  if (chordProgressionIndex > solution.length - 1) {
    chordProgressionIndex = 0;
    keyboard.validationFlash(numberStack, true);
    return true;
  }
}

function displayChordSolution(solution, options, posX, posY) {
  var size = 24;
  textSize(size);
  noStroke();

  posX -= (2 * solution.length * size) / 2 - size;
  for (var i = 0; i < solution.length; i++) {

    if (options.includes(solution[i])) {
      fill(color(52, 149, 235));
    } else {
      fill(color(69, 161, 35));
    }

    text(solution[i], posX, posY);
    posX += 2 * size;
  }
  textSize(80);
  strokeWeight(1);
  fill(0);
}

function displayScaleSolution(solution, options, posX, posY) {
  var size = 24;
  textSize(size);
  noStroke();

  posX -= (2 * solution.length * size) / 2 - size;
  for (var i = 0; i < solution.length; i++) {

    if (options == solution[i]) {
      fill(color(214, 71, 24));
    } else {
      fill(color(52, 149, 235));
    }

    text(solution[i], posX, posY);
    posX += 2 * size;
  }
  textSize(80);
  strokeWeight(1);
  fill(0);
}

function displayChordProgressionSolution(solutionChords, posX, posY) {
  var size = 24;
  textSize(size);
  noStroke();

  posX -= (4 * solutionChords.length * size) / 2 - (2 * size);
  for (var i = 0; i < solutionChords.length; i++) {

    if (i < solutionChords.length - 1) {
      fill(color(52, 149, 235));
    } else {
      fill(color(color(69, 161, 35)));
    }

    text(solutionChords[i].name, posX, posY);
    posX += 4 * size;
  }
  textSize(80);
  strokeWeight(1);
  fill(0);
}

let checker = (arr, target) => target.every(v => arr.includes(v));

function arrayDifference(a1, a2) {
    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}
