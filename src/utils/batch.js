/**
 * Chia mảng theo lô
 * @param {*} arr Mảng  đầu vào
 * @param {*} batLeng Kích thước 1 lô
 */

const batch = (arr, batLeng) => {
  const bat = [];
  let lastIndex = batLeng;
  const { length } = arr;

  while (lastIndex < length) {
    bat.push(arr.slice(lastIndex - batLeng, lastIndex));
    lastIndex += batLeng;
  }
  bat.push(arr.slice(lastIndex - batLeng, arr.length));

  return bat;
};

module.exports = { batch };
