var isDisplaySolution = true;
var isChords7Task = true, isChords9Task = false, isChords11Task = false, isChords13Task = false;
var isScalesMajorTask = false, isScalesHarmonicMinorTask = false, isScalesMelodicMinorTask = false, isScalesHarmonicMajorTask = false;
var isProgressions251Task = false;
var displaySolutionCheckbox;
var chords7Checkbox, chords9Checkbox, chords11Checkbox, chords13Checkbox;
var scalesMajorCheckbox, scalesMelodicMinorCheckbox, scalesHarmonicMinorCheckbox, scalesHarmonicMajorCheckbox;
var progressions251Checkbox;

function createCheckboxes(x, y) {
  displaySolutionCheckbox = createCheckbox('Display Solution', isDisplaySolution);
  displaySolutionCheckbox.position(x, y + 100);
  displaySolutionCheckbox.changed(checkDisplaySolution);

  chords7Checkbox = createCheckbox('7th Chords', isChords7Task);
  chords7Checkbox.position(x, y);
  chords7Checkbox.changed(checkChords7);

  chords9Checkbox = createCheckbox('9th Chords', isChords9Task);
  chords9Checkbox.position(x, y + 20);
  chords9Checkbox.changed(checkChords9);

  chords11Checkbox = createCheckbox('11th Chords', isChords11Task);
  chords11Checkbox.position(x, y + 40);
  chords11Checkbox.changed(checkChords11);

  chords13Checkbox = createCheckbox('13th Chords', isChords13Task);
  chords13Checkbox.position(x, y + 60);
  chords13Checkbox.changed(checkChords13);

  scalesMajorCheckbox = createCheckbox('Major Modes', isScalesMajorTask);
  scalesMajorCheckbox.position(x + 200, y);
  scalesMajorCheckbox.changed(checkScalesMajor);

  scalesMelodicMinorCheckbox = createCheckbox('Melodic Minor Modes', isScalesMelodicMinorTask);
  scalesMelodicMinorCheckbox.position(x + 200, y + 20);
  scalesMelodicMinorCheckbox.changed(checkScalesMelodicMinor);

  scalesHarmonicMinorCheckbox = createCheckbox('Harmonic Minor Modes', isScalesHarmonicMinorTask);
  scalesHarmonicMinorCheckbox.position(x + 200, y + 40);
  scalesHarmonicMinorCheckbox.changed(checkScalesHarmonicMinor);

  scalesHarmonicMajorCheckbox = createCheckbox('Harmonic Major Modes', isScalesHarmonicMajorTask);
  scalesHarmonicMajorCheckbox.position(x + 200, y + 60);
  scalesHarmonicMajorCheckbox.changed(checkScalesHarmonicMajor);

  progressions251Checkbox = createCheckbox('ii-V-I Progressions', isProgressions251Task);
  progressions251Checkbox.position(x + 400, y);
  progressions251Checkbox.changed(checkProgressions251);
}

function checkDisplaySolution() {
  if (!isDisplaySolution) {
    isDisplaySolution = true;
  } else {
    isDisplaySolution = false;
  }
}

function checkChords7() {
  if (!isChords7Task) {
    taskTypeIdStack.push(0);
    isChords7Task = true;
  } else {
    removeItemOnce(taskTypeIdStack, 0);
    isChords7Task = false;
  }
}

function checkChords9() {
  if (!isChords9Task) {
    taskTypeIdStack.push(1);
    isChords9Task = true;
  } else {
    removeItemOnce(taskTypeIdStack, 1);
    isChords9Task = false;
  }
}

function checkChords11() {
  if (!isChords11Task) {
    taskTypeIdStack.push(2);
    isChords11Task = true;
  } else {
    removeItemOnce(taskTypeIdStack, 2);
    isChords11Task = false;
  }
}

function checkChords13() {
  if (!isChords13Task) {
    taskTypeIdStack.push(3);
    isChords13Task = true;
  } else {
    removeItemOnce(taskTypeIdStack, 3);
    isChords13Task = false;
  }
}

function checkScalesMajor() {
  if (!isScalesMajorTask) {
    taskTypeIdStack.push(4);
    isScalesMajorTask = true;
  } else {
    removeItemOnce(taskTypeIdStack, 4);
    isScalesMajorTask = false;
  }
}

function checkScalesMelodicMinor() {
  if (!isScalesMelodicMinorTask) {
    taskTypeIdStack.push(5);
    isScalesMelodicMinorTask = true;
  } else {
    removeItemOnce(taskTypeIdStack, 5);
    isScalesMelodicMinorTask = false;
  }
}

function checkScalesHarmonicMinor() {
  if (!isScalesHarmonicMinorTask) {
    taskTypeIdStack.push(6);
    isScalesHarmonicMinorTask = true;
  } else {
    removeItemOnce(taskTypeIdStack, 6);
    isScalesHarmonicMinorTask = false;
  }
}

function checkScalesHarmonicMajor() {
  if (!isScalesHarmonicMajorTask) {
    taskTypeIdStack.push(7);
    isScalesHarmonicMajorTask = true;
  } else {
    removeItemOnce(taskTypeIdStack, 7);
    isScalesHarmonicMajorTask = false;
  }
}

function checkProgressions251() {
  if (!isProgressions251Task) {
    taskTypeIdStack.push(8);
    isProgressions251Task = true;
  } else {
    removeItemOnce(taskTypeIdStack, 8);
    isProgressions251Task = false;
  }
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

function midinoteListener(input) {
  input.addListener('noteon', "all", function (e) {
      var eNumber = WebMidi.noteNameToNumber(e.note.name + e.note.octave);
      noteNumberStack.push(eNumber);
      noteNumberQueue.push(eNumber);
      if (noteNumberQueue.length > 12) {
        noteNumberQueue.shift();
      }
      noteNameStack.push(e.note.name);
      noteNameQueue.push(e.note.name);
      if (noteNameQueue.length > 12) {
        noteNameQueue.shift();
      }
      keyboard.keys[eNumber - 21].isPressed = true;
    }
  );

  input.addListener('noteoff', "all", function (e) {
      var eNumber = WebMidi.noteNameToNumber(e.note.name + e.note.octave);
      noteNumberStack.pop(eNumber);
      noteNameStack.pop(e.note.name);
      keyboard.keys[eNumber - 21].isPressed = false;
    }
  );
}
