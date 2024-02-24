/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  push(val) {
    let newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }

    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    let newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
    }

    this.head = newNode;

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    if (this.length === 0) {
      throw new Error("Linked List is empty!");
    }

    let currentNode = this.head;
    let secondToLast = this.head;

    while (currentNode.next) {
      secondToLast = currentNode;
      currentNode = currentNode.next;
    }
    secondToLast.next = null;
    this.tail = secondToLast;
    this.length -= 1;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return currentNode.val;
  }

  /** shift(): return & remove first item. */

  shift() {
    if (!this.head) {
      throw new Error("Linked List is empty!");
    }

    let head = this.head;
    this.head = this.head.next;
    this.length -= 1;

    if (this.length == 0) {
      this.tail = null;
    }

    return head.val;
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (this.length === 0) {
      throw new Error("Linked List is empty!");
    }
    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      if (count === idx) {
        return currentNode.val;
      } else {
        currentNode = currentNode.next;
        count += 1;
      }
    }
    throw new Error("Index is invalid!");
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let newNode = new Node(val);
    if (this.length === 0 && idx === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length += 1;
    }

    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      if (count === idx) {
        currentNode.val = val;
        return;
      }
      currentNode = currentNode.next;
      count += 1;
    }
    throw new Error("Index is invalid!");
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    let newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    }

    let currentNode = this.head;
    let count = 0;
    while (currentNode) {
      if (count + 1 === idx) {
        newNode.next = currentNode.next;
        currentNode.next = newNode;
      }
      currentNode = currentNode.next;
      count += 1;
    }
    this.length += 1;
    if ((idx = this.length + 1)) {
      this.tail = newNode;
    }
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (this.length === 0) {
      throw new Error("Linked List is empty!");
    }

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      if (this.length < 2) {
        this.tail = this.head;
        this.length -= 1;
        return val;
      }
    }

    let currentNode = this.head;
    let count = 0;
    let preNode;

    while (currentNode) {
      if (currentNode.next.next != null) {
        currentNode = currentNode.next;
        currentNode.next.next = null;
        return currentNode.next.val;
      } else if (count + 1 === idx) {
        preNode = currentNode;
      } else if (count === idx) {
        preNode.next = currentNode.next;
        return currentNode.val;
      }
      this.length -= 1;
    }
    throw new Error("Index is invalid!");
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) {
      return 0;
    }

    let sum = 0;
    let currentNode = this.head;

    while (currentNode) {
      sum += currentNode.val;
      currentNode = currentNode.next;
    }

    return sum / this.length;
  }
}

module.exports = LinkedList;
