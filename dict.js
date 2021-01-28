var idCount = 0;

function getJazzDict() {
  var jazzDictObject = new JazzDict();

  jazzDictObject.createChordNodes();
  jazzDictObject.createScaleNodes();
  jazzDictObject.createStructure();
  jazzDictObject.assignNodes();

  var jazzDict = jazzDictObject.get();

  console.log(jazzDict);
  return jazzDict;
}

class JazzDict{
  constructor() {
    this.chords7Nodes = [];
    this.chords9Nodes = [];
    this.chords11Nodes = [];
    this.chords13Nodes = [];

    this.scalesMajorNodes = [];
    this.scalesMelodicMinorNodes = [];
    this.scalesHarmonicMinorNodes = [];
    this.scalesHarmonicMajorNodes = [];
  }

  createChordNodes() {
    for (var i = 0; i < 12; i++) {
      this.chords7Nodes.push(

        chordNode(i, id(), 'Δ7', ["C", "E", "G", "B", "D", "F#", "A"], ["C", "G", "D", "F#", "A"]),

        chordNode(i, id(), '-7', ["C", "D#", "G", "A#", "D", "F", "A"], ["C", "G", "D", "F", "A"]),

        // fill in all chord types in C ...

      );
    }
  }

  createScaleNodes() {
    for (var i = 0; i < 12; i++) {
      this.scalesMajorNodes.push(

        scaleNode(i, id(), 'Ioanian', ["C", "D", "E", "F", "G", "A", "B", "C"], ["F"]),

        // fill in all scale types in C ...

      );
    }
  }

  createStructure() {
    this.jazzDict = {
      chords: {
        chords7: [{}],
        chords9: [{}],
        chords11: [{}],
        chords13: [{}]
      },
      scales: {
        scalesMajor: [{}],
        scalesMelodicMinor: [{}],
        scalesHarmonicMinor: [{}],
        scalesHarmonicMajor: [{}]
      }
    }
  }

  assignNodes() {
    for (var i = 0; i < this.chords7Nodes.length; i++) {
      this.jazzDict.chords.chords7[i] = this.chords7Nodes[i];
    }

    for (var i = 0; i < this.chords9Nodes.length; i++) {
      this.jazzDict.chords.chords9[i] = this.chords9Nodes[i];
    }

    for (var i = 0; i < this.chords11Nodes.length; i++) {
      this.jazzDict.chords.chords11[i] = this.chords11Nodes[i];
    }

    for (var i = 0; i < this.chords13Nodes.length; i++) {
      this.jazzDict.chords.chords13[i] = this.chords13Nodes[i];
    }

    for (var i = 0; i < this.scalesMajorNodes.length; i++) {
      this.jazzDict.scales.scalesMajor[i] = this.scalesMajorNodes[i];
    }

    for (var i = 0; i < this.scalesMelodicMinorNodes.length; i++) {
      this.jazzDict.scales.scalesMelodicMinor[i] = this.scalesMelodicMinorNodes[i];
    }

    for (var i = 0; i < this.scalesHarmonicMinorNodes.length; i++) {
      this.jazzDict.scales.scalesHarmonicMinor[i] = this.scalesHarmonicMinorNodes[i];
    }

    for (var i = 0; i < this.scalesHarmonicMajorNodes.length; i++) {
      this.jazzDict.scales.scalesHarmonicMajor[i] = this.scalesHarmonicMajorNodes[i];
    }
  }

  get() {
    return this.jazzDict;
  }
}

function chordNode(i, id, name, notesInC, optNotesInC) {
  var noteNumbers = notes2numbers(notesInC);
  var optNoteNumbers = notes2numbers(optNotesInC);

  noteNumbers = noteNumbers.map(function(x) {return x + i});
  optNoteNumbers = optNoteNumbers.map(function(x) {return x + i});

  var notes = numbers2notes(noteNumbers);
  var optNotes = numbers2notes(optNoteNumbers);

  var rootNoteNumber = noteNumbers[0];
  var chordName = number2note(rootNoteNumber) + name;

  var chordNode = {
    id: id,
    name: chordName,
    notes: notes,
    optNotes: optNotes,
    rootNoteIndex: rootNoteNumber,
  }

  return chordNode;
}

function scaleNode(i, id, name, notesInC, avoidNoteInC) {
  var noteNumbers = notes2numbers(notesInC);
  var avoidNoteNumber = note2number(avoidNoteInC);

  noteNumbers = noteNumbers.map(function(x) {return x + i});
  avoidNoteNumber += i;

  var notes = numbers2notes(noteNumbers);
  var avoidNote = number2note(avoidNoteNumber);

  var rootNoteNumber = noteNumbers[0];
  var scaleName = number2note(rootNoteNumber) + ' ' + name + ' Scale';

  var scaleNode = {
    id: id,
    name: scaleName,
    notes: notes,
    avoidNote: avoidNote,
    rootNoteIndex: rootNoteNumber,
  }

  return scaleNode;
}

function id() {
  idCount++;
  return idCount;
}

function note2number(note) {
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return noteNames.findIndex((x) => x == note);
}

function notes2numbers(notes) {
  var numbers = [];
  for (var i = 0; i < notes.length; i++) {
    numbers[i] = note2number(notes[i]);
  }
  return numbers;
}

function number2note(number) {
  if(number > 11) {
    number -= 12;
  }
  const noteNames = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return noteNames[number];
}

function numbers2notes(numbers) {
  var notes = [];
  for (var i = 0; i < numbers.length; i++) {
    notes[i] = number2note(numbers[i]);
  }
  return notes;
}
