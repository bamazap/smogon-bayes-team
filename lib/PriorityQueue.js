/**
 * A "Priority Queue"
 * This is not by any means an efficient implementation
 * but it was quick to write, is easy to understand, and does what I need.
 * I couldn't find a library with a PQ that works for this use case.
 */
class PriorityQueue {
  constructor(highestFirst = true) {
    this.elements = [];
    this.highestFirst = highestFirst;
  }

  /**
   * @typedef PriorityQueueElement
   * @prop {*} data
   * @prop {number} priority
   */

  /**
   * Add an element to the priority queue
   * @param {*} data
   * @param {Number} priority
   */
  push(data, priority) {
    this.elements.push({ data, priority });
  }

  /**
   * Get and remove the data of the highest priority element
   * @return {*}
   */
  pull() {
    return this.elements.pop().data;
  }

  /**
   * Get the data of the highest priority element without removing it
   * @return {*}
   */
  peek() {
    return this.elements[this.elements.length - 1].data;
  }

  /**
   * Get array of the n highest priority elements
   * @param {number} n - number of elements to get
   * @return {PriorityQueueElement[]}
   */
  peekN(n) {
    return this.elements.slice(this.elements.length - n).reverse();
  }

  /**
   * Actually order by priority.
   * You must call this after each set of updates or you will be sad.
   */
  order() {
    this.elements.sort(({ priority: pA }, { priority: pB }) => {
      if (this.highestFirst) return pA - pB;
      return pB - pA;
    });
  }
}

module.exports = PriorityQueue;
