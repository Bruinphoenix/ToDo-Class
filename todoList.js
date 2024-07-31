const ToDo = require('./todo');

class ToDoList {
  title;
  todos;
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(...titleArgs) {
    titleArgs.forEach(title => {
      if (!(typeof title === 'string')) {
        throw TypeError('the title argument must be a string');
      }

      this.todos.push(new ToDo(title));
    })
  }

  push(...todoArgs) {
    todoArgs.forEach(todo => {
      if (!(todo instanceof ToDo)) {
        throw new TypeError('can only push ToDo objects')
      }
      this.todos.push(todo);
    })
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    const lastIndex = this.size() - 1;
    return this.todos[lastIndex];
  }

  itemAt(index) {
    if (!this.#validIndex(index)) {
      throw new ReferenceError('invalid index');
    }

    return this.todos[index];
  }

  markDoneAt(index) {
    if (!this.#validIndex(index)) {
      throw new RangeError(`no such index '${index}' in ${this.title}`);
    }

    this.todos[index].markDone();
  }

  markUndoneAt(index) {
    if (!this.#validIndex(index)) {
      throw new RangeError(`no such index '${index}' in ${this.title}`);
    }

    this.todos[index].markUndone()
  }

  isDone() {
    return this.todos.every(todo => {
      return todo.isDone() === true;
    })
  }

  displayAll() {
    console.log(this.title + ': ');
    this.todos.forEach(todo => {
      todo.log();
    })
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    if (!this.#validIndex(index)) {
      throw new RangeError(`no such index '${index}' in ${this.title}`);
    }

    return this.todos.splice(index, 1);
  }

  toString() {
    console.log('calling custom toString');
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(callBack) {
    this.todos.forEach(callBack);
  }

  filter(callBack, title = 'filtered') {
    let filtered = new ToDoList(title);
    filtered.push(...this.todos.filter(callBack));
    return filtered;
  }

  findByTitle(title) {
    return this.filter(todo => {
      return todo.getTitle() === title;
    }).first();
  }

  allDone() {
    return this.filter(todo => {
      return todo.isDone();
    })
  }

  allNotDone() {
    return this.filter(todo => {
      return !todo.isDone();
    })
  }

  markDone(title) {
    let toDo = this.findByTitle(title);
    toDo ? toDo.markDone() : null;
  }

  markAllDone() {
    this.todos.forEach(todo => {
      todo.markDone();
    })
  }

  markAllUndone() {
    this.todos.forEach(todo => {
      todo.markUndone();
    })
  }

  toArray() {
    return [...this.todos];
  }

  #validIndex(index) {
    return ((index !== undefined) && (index in this.todos));
  }
}

let chores = new ToDoList('Chores');

chores.add('clean room', 'clean kitchen', 'bathroom', 'water the garden');

chores.markDoneAt(0);
chores.markDoneAt(1);
chores.markDone('bathroom')

console.log(
  chores.toArray()
)