function findFloor(arr, num) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);
    let midVal = arr[midIdx];

    if ((midVal < num && arr[midIdx + 1] > num) || midIdx === arr.length - 1) {
      return midVal;
    } else if (midVal > num) {
      rightIdx = midIdx - 1;
    } else {
      leftIdx = midIdx + 1;
    }
  }
  return -1;
}

module.exports = findFloor;
