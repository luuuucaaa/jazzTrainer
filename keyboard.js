class Key{
  constructor(id, x, y, w, h, color, pressedColor, rightColor, wrongColor) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.isPressed = false;
    this.color = color;
    this.pressedColor = pressedColor;
    this.rightColor = rightColor;
    this.wrongColor = wrongColor;
    this.rightValidationColorAlpha = 0;
    this.wrongValidationColorAlpha = 0;
  }

  display() {
    stroke(1);
    if (this.isPressed) {
      fill(this.pressedColor);
    } else {
      fill(this.color);
    }
    rect(this.x, this.y, this.w, this.h);


    noStroke();
    this.rightColor.setAlpha(this.rightValidationColorAlpha);
    fill(this.rightColor);
    rect(this.x, this.y, this.w, this.h);

    this.wrongColor.setAlpha(this.wrongValidationColorAlpha);
    fill(this.wrongColor);
    rect(this.x, this.y, this.w, this.h);

    if (this.rightValidationColorAlpha > 0) {
      this.rightValidationColorAlpha -= 5;
    }
    if (this.wrongValidationColorAlpha > 0) {
      this.wrongValidationColorAlpha -= 5;
    }
    fill(0);
    stroke(1);
  }
}

class Keyboard{
  constructor(x, y, w, h, pressedColor, rightColor, wrongColor) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.pressedColor = pressedColor;
    this.rightColor = rightColor;
    this.wrongColor = wrongColor;

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
        let key = new Key(this.ids[j], this.x + (posIndex * (this.w / this.nWhiteKeys)), this.y, this.w / this.nWhiteKeys, this.h, 255, this.pressedColor, this.rightColor, this.wrongColor);
        this.whiteKeys.push(key);
        posIndex++;
      }
    }

    this.blackKeys = [];
    posIndex = 0;
    for (let j = 0; j < this.nKeys; j++) {
      if (this.keyBins[j] == 1) {
        let key = new Key(this.ids[j], (this.x + (j * this.w / (this.nWhiteKeys))) - (posIndex * this.w / (this.nWhiteKeys)) - this.whiteKeys[0].w / 4, this.y, this.whiteKeys[0].w / 2, 2 * this.h / 3, 0, this.pressedColor, this.rightColor, this.wrongColor);
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

  validationFlash(keyNumbers, isRight) {
    if (isRight) {
      for (let i = 0; i < keyNumbers.length; i++) {
        var keyNumber = keyNumbers[i];
        this.keys[keyNumber - 21].rightValidationColorAlpha = 255;
      }
    } else if (!isRight) {
      for (let i = 0; i < keyNumbers.length; i++) {
        var keyNumber = keyNumbers[i];
        this.keys[keyNumber - 21].wrongValidationColorAlpha = 255;
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
