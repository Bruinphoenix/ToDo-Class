class ToDo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";
  constructor(title) {
    this.title = title;
    this._isDone = false;
  }

  toString() {
    let marker = this.isDone ? ToDo.DONE_MARKER : ToDo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this._isDone = true;
  }

  markUndone() {
    this._isDone = false;
  }

  isDone() {
    return this._isDone;
  }

  getTitle() {
    return this.title;
  }

  log() {
    console.log(this.toString());
  }
}

module.exports = ToDo;