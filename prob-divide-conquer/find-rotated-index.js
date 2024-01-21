function findRotatedIndex(arr, num) {
  let rotIdx = findRotation(arr);

  if (num >= arr[0] && num <= arr[rotIdx - 1]) {
    return binarySearchWithRotation(arr, num, 0, rotIdx - 1);
  } else {
    return binarySearchWithRotation(arr, num, rotIdx, arr.length - 1);
  }
}

function binarySearchWithRotation(arr, num, firstIdx, lastIdx) {
  while (firstIdx <= lastIdx) {
    let midIdx = Math.floor((firstIdx + lastIdx) / 2);
    let midVal = arr[midIdx];

    if (midVal === num) {
      return midIdx;
    } else if (midVal > num) {
      lastIdx = midIdx - 1;
    } else {
      firstIdx = midIdx + 1;
    }
  }
  return -1;
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
}

module.exports = findRotatedIndex;
