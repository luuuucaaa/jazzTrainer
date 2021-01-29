WebMidi.enable(function (err) {

  if (err) {
    console.log("WebMidi could not be enabled.", err);
  }

  // Viewing available inputs and outputs
  console.log(WebMidi.inputs);
  console.log(WebMidi.outputs);

  // Reacting when a new device becomes available
  WebMidi.addListener("connected", function(e) {
    console.log(e);
  });

  // Reacting when a device becomes unavailable
  WebMidi.addListener("disconnected", function(e) {
    console.log(e);
  });
});

var frame;
var keyboard, dict;
var noteNumberStack = [], noteNumberQueue = [], noteNameStack = [], noteNameQueue = [];
var chords7Task, chords9Task, chords11Task, chords13Task;
var scalesMajorTask, scalesHarmonicMinorTask, scalesMelodicMinorTask, scalesHarmonicMajorTask;
var progressions251Task;
var isTask = false, taskTypeId, taskTypeIdStack = [0];

function preload() {
  font = loadFont('assets/SeanHand.ttf'); // i have to load something, otherwise the script doesnt work? maybe because i need the time delay?
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  textAlign(CENTER);
  textSize(80);

  midinoteListener(WebMidi.getInputByName("FP-10 Bluetooth"));

  keyboard = new Keyboard(0, 0, width, 100, color(52, 149, 235), color(69, 161, 35), color(214, 71, 24));
  createCheckboxes(20, keyboard.h + 20);

  chords7Task = new Task('chord', 'chords.chords7', width/2, keyboard.h + 90);
  chords9Task = new Task('chord', 'chords.chords9', width/2, keyboard.h + 90);
  chords11Task = new Task('chord', 'chords.chords11', width/2, keyboard.h + 90);
  chords13Task = new Task('chord', 'chords.chords13', width/2, keyboard.h + 90);

  scalesMajorTask = new Task('scale', 'scales.scalesMajor', width/2, keyboard.h + 90);
  scalesHarmonicMinorTask = new Task('scale', 'scales.scalesHarmonicMinor', width/2, keyboard.h + 90);
  scalesMelodicMinorTask = new Task('scale', 'scales.scalesMelodicMinor', width/2, keyboard.h + 90);
  scalesHarmonicMajorTask = new Task('scale', 'scales.scalesHarmonicMajor', width/2, keyboard.h + 90);

  progressions251Task = new Task('chordProgression', 'ii-V-I', width/2, keyboard.h + 90);

  dict = getJazzDict();
}

function draw() {
  background(255);
  keyboard.display();
  getTask();
}

function getTask() {
  if (!isTask) {
    taskTypeId = int(random(taskTypeIdStack));
  }

  if (taskTypeId == 0) {

    chords7Task.getTask();
    chords7Task.checkAnswer(noteNameStack, noteNameQueue, noteNumberStack, noteNumberQueue);
    isTask = chords7Task.isTask;

  } else if (taskTypeId == 1) {

    chords9Task.getTask();
    chords9Task.checkAnswer(noteNameStack, noteNameQueue, noteNumberStack, noteNumberQueue);
    isTask = chords9Task.isTask;

  } else if (taskTypeId == 2) {

    chords11Task.getTask();
    chords11Task.checkAnswer(noteNameStack, noteNameQueue, noteNumberStack, noteNumberQueue);
    isTask = chords11Task.isTask;

  } else if (taskTypeId == 3) {

    chords13Task.getTask();
    chords13Task.checkAnswer(noteNameStack, noteNameQueue, noteNumberStack, noteNumberQueue);
    isTask = chords13Task.isTask;

  } else if (taskTypeId == 4) {

    scalesMajorTask.getTask();
    scalesMajorTask.checkAnswer(noteNameStack, noteNameQueue, noteNumberStack, noteNumberQueue);
    isTask = scalesMajorTask.isTask;

  } else if (taskTypeId == 5) {

    scalesHarmonicMinorTask.getTask();
    scalesHarmonicMinorTask.checkAnswer(noteNameStack, noteNameQueue, noteNumberStack, noteNumberQueue);
    isTask = scalesHarmonicMinorTask.isTask;

  } else if (taskTypeId == 6) {

    scalesMelodicMinorTask.getTask();
    scalesMelodicMinorTask.checkAnswer(noteNameStack, noteNameQueue, noteNumberStack, noteNumberQueue);
    isTask = scalesMelodicMinorTask.isTask;

  } else if (taskTypeId == 7) {

    scalesHarmonicMajorTask.getTask();
    scalesHarmonicMajorTask.checkAnswer(noteNameStack, noteNameQueue, noteNumberStack, noteNumberQueue);
    isTask = scalesHarmonicMajorTask.isTask;

  } else if (taskTypeId == 8) {

    progressions251Task.getTask();
    progressions251Task.checkAnswer(noteNameStack, noteNameQueue, noteNumberStack, noteNumberQueue);
    isTask = progressions251Task.isTask;
  }
}
