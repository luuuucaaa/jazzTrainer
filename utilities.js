var isChords7Task = true, isChords9Task = false, isChords11Task = false, isChords13Task = false;
var isScalesMajorTask = false, isScalesHarmonicMinorTask = false, isScalesMelodicMinorTask = false, isScalesHarmonicMajorTask = false;
var chords7Checkbox, chords9Checkbox, chords11Checkbox, chords13Checkbox;
var scalesMajorCheckbox, scalesMelodicMinorCheckbox, scalesHarmonicMinorCheckbox, scalesHarmonicMajorCheckbox;

function createCheckboxes(x, y) {
  chords7Checkbox = createCheckbox('7th Chords', true);
  chords7Checkbox.position(x, y);
  chords7Checkbox.changed(checkChords7);

  chords9Checkbox = createCheckbox('9th Chords', false);
  chords9Checkbox.position(x, y + 20);
  chords9Checkbox.changed(checkChords9);

  chords11Checkbox = createCheckbox('11th Chords', false);
  chords11Checkbox.position(x, y + 40);
  chords11Checkbox.changed(checkChords11);

  chords13Checkbox = createCheckbox('13th Chords', false);
  chords13Checkbox.position(x, y + 60);
  chords13Checkbox.changed(checkChords13);

  scalesMajorCheckbox = createCheckbox('Major Modes', false);
  scalesMajorCheckbox.position(x + 180, y);
  scalesMajorCheckbox.changed(checkScalesMajor);

  scalesMelodicMinorCheckbox = createCheckbox('Melodic Minor Modes', false);
  scalesMelodicMinorCheckbox.position(x + 180, y + 20);
  scalesMelodicMinorCheckbox.changed(checkScalesMelodicMinor);

  scalesHarmonicMinorCheckbox = createCheckbox('Harmonic Minor Modes', false);
  scalesHarmonicMinorCheckbox.position(x + 180, y + 40);
  scalesHarmonicMinorCheckbox.changed(checkScalesHarmonicMinor);

  scalesHarmonicMajorCheckbox = createCheckbox('Harmonic Major Modes', false);
  scalesHarmonicMajorCheckbox.position(x + 180, y + 60);
  scalesHarmonicMajorCheckbox.changed(checkScalesHarmonicMajor);
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
      noteNameStack.push(e.note.name);
      noteNameQueue.push(e.note.name);
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
