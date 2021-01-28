class Task{
  constructor(taskType, dictSource, taskDisplayX, taskDisplayY) {
    this.taskType = taskType; // keyword for task type ('chord', 'chordProgression', 'scale', 'chordWithScale')
    this.dictSource = dictSource; // id for dictionary item ('chords7', 'chords9', 'chords11', 'chords13', 'scalesChurch', ...)
    this.dictPath = 'dict.' + this.dictSource;
    this.taskId = undefined;
    this.task = undefined;
    this.solution = undefined;
    this.options = undefined;
    this.isTask = false;
    this.isTaskSolved = false;
    this.timeCounter = 0;
    this.checkAnswerDelay = 1;

    this.taskDisplayX = taskDisplayX;
    this.taskDisplayY = taskDisplayY;
  }

  getTask() {
    if (!this.isTask) {
      if (this.taskType == 'chord') {

        this.taskId = int(random(eval(this.dictPath + '.length')));
        this.task = eval(this.dictPath + '[' + this.taskId + '].name');
        this.solution = eval(this.dictPath + '[' + this.taskId + '].notes');
        this.options = eval(this.dictPath + '[' + this.taskId + '].optNotes');

      } else if (this.taskType == 'chordProgression') {

        console.log('Task type not implemented yet.');

      } else if (this.taskType == 'scale') {

        this.taskId = int(random(eval(this.dictPath + '.length')));
        this.task = eval(this.dictPath + '[' + this.taskId + '].name');
        this.solution = eval(this.dictPath + '[' + this.taskId + '].notes');

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

  checkAnswer(answerStack, answerQueue) {
    this.answerStack = answerStack;
    this.answerQueue = answerQueue;

    if (this.isTask) {
      var isRight = false;

      if (this.taskType == 'chord') {

        var answerStackSorted = this.answerStack.sort();
        var solutionSorted = this.solution.sort();

        var difference = arrayDifference(answerStackSorted, solutionSorted);
        isRight = checker(this.options, difference) && answerStackSorted.length >= solutionSorted.length - this.options.length;

        if (isRight) {
          this.timeCounter++;
          if (this.timeCounter > this.checkAnswerDelay * frameRate()) {
            this.isTaskSolved = true;
            this.isTask = false;
          }
        } else {
          this.timeCounter = 0;
        }

      } else if (this.taskType == 'chordProgression') {

        console.log('Task type not implemented yet.');

      } else if (this.taskType == 'scale') {

        if (this.answerQueue.length > this.solution.length) {
          this.answerQueue.shift();
        }

        var answerQueue = this.answerQueue;
        var solution = this.solution;

        isRight = (answerQueue.length == solution.length) && answerQueue.every(function(element, index) {
          return element === solution[index];
        });

        if (isRight) {
          this.isTaskSolved = true;
          this.isTask = false;
        }

      } else if (this.taskType == 'chordWithScale') {

        console.log('Task type not implemented yet.');

      } else {

        console.log('Invalid task type.');

      }
    }
  }
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
