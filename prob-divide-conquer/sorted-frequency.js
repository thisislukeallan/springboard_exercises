// Given a sorted array and a number, write a function called sortedFrequency
// that counts the occurrences of the number in the array
function sortedFrequency(arr, num) {
  let first = leftIndex(arr, num);
  let last = rightIndex(arr, num);
  if (first == -1) return -1;

  return last - first + 1;
}

function leftIndex(arr, num) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);
    let midVal = arr[midIdx];

    if ((midVal == num && arr[midIdx - 1] < num) || midIdx == 0) {
      return midIdx;
    } else if (midVal < num) {
      leftIdx = midIdx + 1;
    } else {
      rightIdx = midIdx - 1;
    }
  }
  return -1;
}

function rightIndex(arr, num) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);
    let midVal = arr[midIdx];

    if ((midVal == num && arr[midIdx + 1] > num) || midIdx == arr.length - 1) {
      return midIdx;
    } else if (midVal > num) {
      rightIdx = midIdx - 1;
    } else {
      leftIdx = midIdx + 1;
    }
  }
  return -1;
}

module.exports = sortedFrequency;
