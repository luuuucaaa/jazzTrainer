var idCount = 0;
var chordTypeNames = [], scaleTypeNames = [];

function getJazzDict() {
  var jazzDictObject = new JazzDict();

  jazzDictObject.createChordNodes();
  jazzDictObject.createScaleNodes();
  jazzDictObject.createChordProgressionNodes();
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

    this.chordProgressionsNodes = [];
  }

  createChordNodes() {
    for (var i = 0; i < 12; i++) {
      this.chords7Nodes.push(

        chordNode(i, id(), 'Δ7', ["C", "E", "G", "B", "D", "F#", "A"], ["C", "G", "D", "F#", "A"]),

        chordNode(i, id(), '7', ["C", "E", "G", "A#", "C#", "D", "D#", "F#", "G#", "A"], ["C", "G", "C#", "D", "D#", "F#", "G#", "A"]),

        chordNode(i, id(), 'm7', ["C", "D#", "G", "A#", "D", "F", "A"], ["C", "G", "D", "F", "A"]),

        chordNode(i, id(), 'Δ6', ["C", "E", "G", "A", "D", "F#"], ["C", "G", "D", "F#"]),

        chordNode(i, id(), 'm6', ["C", "D#", "G", "A", "D"], ["C", "G", "D"]),

        chordNode(i, id(), 'mΔ7', ["C", "D#", "G", "B", "D", "A"], ["C", "G", "D", "A"])

        // fill in all chord types in C ...

      );
    }
  }

  createScaleNodes() {
    for (var i = 0; i < 12; i++) {
      this.scalesMajorNodes.push(

        scaleNode(i, id(), 'Ioanian', ["C", "D", "E", "F", "G", "A", "B", "C"], ["F"]),

        scaleNode(i, id(), 'Dorian', ["C", "D", "D#", "F", "G", "A", "A#", "C"]),

        scaleNode(i, id(), 'Phrygian', ["C", "C#", "D#", "F", "G", "G#", "A#", "C"]),

        scaleNode(i, id(), 'Lydian', ["C", "D", "E", "F#", "G", "A", "B", "C"]),

        scaleNode(i, id(), 'Mixolydian', ["C", "D", "E", "F", "G", "A", "A#", "C"], ["F"]),

        scaleNode(i, id(), 'Aeolian', ["C", "D", "D#", "F", "G", "G#", "A#", "C"]),

        scaleNode(i, id(), 'Locrian', ["C", "C#", "D#", "F", "F#", "G#", "A#", "C"], ["C#"]),

        // fill in all scale types in C ...

      );
    }
  }

  createChordProgressionNodes() {
    this.chordProgressionsNodes.push(

      chordProgressionNode('ii-V-I', [2, 7, 0], ['m7', '7', 'Δ7'])

      // fill in chord progressions with root note distances from root of final chord ...

    );
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
      },
      chordProgressions: [{}]
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

    for (var i = 0; i < this.chordProgressionsNodes.length; i++) {
      this.jazzDict.chordProgressions[i] = this.chordProgressionsNodes[i];
    }
  }

  get() {
    return this.jazzDict;
  }
}

function chordNode(i, id, name, notesInC, optNotesInC) {
  chordTypeNames.push(name);
  var chordTypeId = chordTypeNames.findIndex((x) => x == name);

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
    chordTypeId: chordTypeId,
    notes: notes,
    optNotes: optNotes,
    rootNoteIndex: rootNoteNumber,
  }

  return chordNode;
}

function scaleNode(i, id, name, notesInC, avoidNoteInC="none") {
  var noteNumbers = notes2numbers(notesInC);
  noteNumbers = noteNumbers.map(function(x) {return x + i});
  var notes = numbers2notes(noteNumbers);

  var avoidNote;
  if (avoidNoteInC == "none") {
    avoidNote = avoidNoteInC;
  } else {
    var avoidNoteNumber = note2number(avoidNoteInC);
    avoidNoteNumber += i;
    avoidNote = number2note(avoidNoteNumber);
  }

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

function chordProgressionNode(chordProgressionName, semitoneDistancesToRoot, chordNames) {
  var chordProgressionNode = {
    name: chordProgressionName,
    semitones: semitoneDistancesToRoot,
    chordNames: chordNames,
  }

  return chordProgressionNode;
}

function getRandomChord(dictPath, filterChordTypeName='none') {
  if (filterChordTypeName == 'none') {
    var taskId = int(random(eval(dictPath + '.length')));

    var rootNoteIndex = eval(dictPath + '[' + taskId + '].rootNoteIndex');
    var task = eval(dictPath + '[' + taskId + '].name');
    var solution = eval(dictPath + '[' + taskId + '].notes');
    var options = eval(dictPath + '[' + taskId + '].optNotes');

  } else {
    var filterChordTypeId = chordName2chordTypeId(filterChordTypeName);
    var filteredChords = eval(dictPath + '.filter(x => x.chordTypeId == ' + filterChordTypeId.toString() + ')');

    var taskId = int(random(filteredChords.length));

    var rootNoteIndex = filteredChords[taskId].rootNoteIndex;
    var task = filteredChords[taskId].name;
    var solution = filteredChords[taskId].notes;
    var options = filteredChords[taskId].optNotes;
  }

  return [rootNoteIndex, task, solution, options];
}

function getRandomScale(dictPath) {
  var taskId = int(random(eval(dictPath + '.length')));

  var task = eval(dictPath + '[' + taskId + '].name');
  var solution = eval(dictPath + '[' + taskId + '].notes');
  var options = eval(dictPath + '[' + taskId + '].avoidNote');

  return [task, solution, options];
}

function getChordProgressionInRandomKey(chordProgressionName) {
  var task, solution = [], options = [];

  var progression = searchChordProgression(chordProgressionName);
  var semitones = progression[1];
  var chordTypes = progression[2];

  var finalChordType = chordTypes.slice(-1)[0];
  var finalChordTypeId = chordName2chordTypeId(finalChordType);

  var finalChordPool = [];

  finalChordPool.push(dict.chords.chords7.filter(x => x.chordTypeId == finalChordTypeId));
  finalChordPool.push(dict.chords.chords9.filter(x => x.chordTypeId == finalChordTypeId));
  finalChordPool.push(dict.chords.chords11.filter(x => x.chordTypeId == finalChordTypeId));
  finalChordPool.push(dict.chords.chords13.filter(x => x.chordTypeId == finalChordTypeId));

  finalChordPool = finalChordPool.flat();
  var id = int(random(finalChordPool.length));
  var finalChord = finalChordPool[id];

  var semitonesRanged = semitones.slice(0);
  for (var i = 0; i < semitones.length; i++) {
    if (semitones[i] + finalChord.rootNoteIndex > 11) {
      semitonesRanged[i] = semitones[i] - 12;
    }
  }

  var solutionChords = [];
  for (var i = 0; i < semitones.length - 1; i++) {
    solutionChords.push(dict.chords.chords7.filter(x => x.chordTypeId == chordName2chordTypeId(chordTypes[i]) && x.rootNoteIndex == finalChord.rootNoteIndex + semitonesRanged[i]));
    solutionChords.push(dict.chords.chords9.filter(x => x.chordTypeId == chordName2chordTypeId(chordTypes[i]) && x.rootNoteIndex == finalChord.rootNoteIndex + semitonesRanged[i]));
    solutionChords.push(dict.chords.chords11.filter(x => x.chordTypeId == chordName2chordTypeId(chordTypes[i]) && x.rootNoteIndex == finalChord.rootNoteIndex + semitonesRanged[i]));
    solutionChords.push(dict.chords.chords13.filter(x => x.chordTypeId == chordName2chordTypeId(chordTypes[i]) && x.rootNoteIndex == finalChord.rootNoteIndex + semitonesRanged[i]));
  }

  solutionChords = solutionChords.flat();
  solutionChords.push(finalChord);

  for (var i = 0; i < solutionChords.length; i++) {
    solution[i] = solutionChords[i].notes;
    options[i] = solutionChords[i].optNotes;
  }

  task = progression[0] + ' to ' + finalChord.name;

  return [solutionChords, task, solution, options];
}

function searchChord(dictPath, rootNoteIndex, chordName) {
  while (rootNoteIndex > 12) {
    rootNoteIndex -= 12;
  }

  var chordTypeId = chordName2chordTypeId(chordName);
  var searchFunction = dictPath + '.find(x => x.rootNoteIndex == ' + rootNoteIndex + ' && x.chordTypeId == ' + chordTypeId + ')';
  var name = eval(searchFunction + '.name');
  var notes = eval(searchFunction + '.notes');
  var optNotes = eval(searchFunction + '.optNotes');

  return [name, notes, optNotes];
}

function searchScale(dictPath, rootNoteIndex, scaleName) {
  while (rootNoteIndex > 11) {
    rootNoteIndex -= 12;
  }

  var scaleTypeId = scaleName2scaleTypeId(scaleName);
  var searchFunction = dictPath + '.find(x => x.rootNoteIndex == ' + rootNoteIndex + ' && x.scaleTypeId == ' + scaleTypeId + ')';
  var name = eval(searchFunction + '.name');
  var notes = eval(searchFunction + '.notes');
  var avoidNote = eval(searchFunction + '.avoidNote');

  return [name, notes, avoidNote];
}

function searchChordProgression(chordProgressionName) {
  var search = dict.chordProgressions.find(x => x.name == chordProgressionName);
  var name = search.name;
  var semitones = search.semitones;
  var chordNames = search.chordNames;

  return [name, semitones, chordNames];
}

function id() {
  idCount++;
  return idCount;
}

function chordName2chordTypeId(chordName) {
  return chordTypeNames.findIndex((x) => x == chordName);
}

function chordTypeId2chordName(chordTypeId) {
  return chordTypeNames[chordTypeId];
}

function scaleName2scaleTypeId(scaleName) {
  return scaleTypeNames.findIndex((x) => x == scaleName);
}

function scaleTypeId2scaleName(scaleTypeId) {
  return scaleTypeNames[scaleTypeId];
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
