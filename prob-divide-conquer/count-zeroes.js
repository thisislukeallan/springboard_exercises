// Given an array of 1s and 0s which has all 1s followed by all 0s, write a function called
// countZeroes, which returns the number of zeroes in the array
function countZeroes(arr) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  if (arr[0] == 0) return arr.length;

  while (leftIdx <= rightIdx) {
    let midIdx = Math.floor((leftIdx + rightIdx) / 2);
    let midVal = arr[midIdx];

    if (midVal != 0) {
      leftIdx = midIdx + 1;
    } else if (midVal == 0 && arr[midIdx - 1] != 1) {
      rightIdx = midIdx - 1;
    } else {
      return arr.length - midIdx;
    }
  }
  return 0;
}

module.exports = countZeroes;
