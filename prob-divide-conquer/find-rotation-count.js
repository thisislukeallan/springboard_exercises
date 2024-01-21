function findRotationCount(arr) {
  let rotIdx = findRotation(arr);
  return rotIdx;
}

function findRotation(arr) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);
    let midVal = arr[midIdx];
    let rightOfMid = arr[midIdx + 1];

    if (rightOfMid < midVal) {
      return midIdx + 1;
    } else if (arr[leftIdx] <= midVal) {
      leftIdx = midIdx + 1;
    } else {
      rightIdx = midIdx - 1;
    }
  }
  return 0;
}
module.exports = findRotationCount;
