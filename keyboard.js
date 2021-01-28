class Key{
  constructor(id, x, y, w, h, color, pressedColor) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.isPressed = false;
    this.color = color;
    this.pressedColor = pressedColor;
  }

  display() {
    if (this.isPressed) {
      fill(this.pressedColor);
    } else {
      fill(this.color);
    }
    rect(this.x, this.y, this.w, this.h);
  }
}

class Keyboard{
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.nWhiteKeys = 52;
    this.nBlackKeys = 36;
    this.nKeys = this.nWhiteKeys + this.nBlackKeys;

    this.ids = [];
    for (let i = 0; i < this.nKeys; i++) {
      this.ids[i] = i + 21;
    }

    this.keyBins = [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,
                    0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,
                    0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,
                    0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,
                    0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,
                    0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,
                    0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1,
                    0, 1, 0, 0];

    this.whiteKeys = [];
    let posIndex = 0;
    for (let j = 0; j < this.nKeys; j++) {
      if (this.keyBins[j] == 0) {
        let key = new Key(this.ids[j], this.x + (posIndex * (this.w / this.nWhiteKeys)), this.y, this.w / this.nWhiteKeys, this.h, 255, color(52, 149, 235));
        this.whiteKeys.push(key);
        posIndex++;
      }
    }

    this.blackKeys = [];
    posIndex = 0;
    for (let j = 0; j < this.nKeys; j++) {
      if (this.keyBins[j] == 1) {
        let key = new Key(this.ids[j], (this.x + (j * this.w / (this.nWhiteKeys))) - (posIndex * this.w / (this.nWhiteKeys)) - this.whiteKeys[0].w / 4, this.y, this.whiteKeys[0].w / 2, 2 * this.h / 3, 0, color(15, 105, 186));
        this.blackKeys.push(key);
        posIndex++;
      }
    }

    this.keys = [];
    let whiteIndex = 0;
    let blackIndex = 0;
    for (let i = 0; i < this.nKeys; i++) {
      if (this.keyBins[i] == 0) {
        this.keys.push(this.whiteKeys[whiteIndex]);
        whiteIndex++;
      } else {
        this.keys.push(this.blackKeys[blackIndex]);
        blackIndex++;
      }
    }
  }

  display() {
    for (let i = 0; i < this.nWhiteKeys; i++) {
      this.whiteKeys[i].display();
    }
    for (let i = 0; i < this.nBlackKeys; i++) {
      this.blackKeys[i].display();
    }
  }
}
