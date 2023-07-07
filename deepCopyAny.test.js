const deepCopyAny = require("./deepCopyAny");

/**
 * 테스트 코드
 * @param {any} original - 원본
 * @param {any} modifyFn - 복제된 객체를 조작하는 함수
 *
 */
function testDeepCopy(original, modifyFn) {
  const copy = deepCopyAny(original);
  console.log("---------", original);
  console.log(original, copy); //
  console.log(original === copy); // true
  modifyFn(copy);
  console.log(original, copy); //
  console.log(original !== copy); // true
}

testDeepCopy(new Date(), (copy) => copy.setTime(0));
testDeepCopy(/test/g, (copy) => (copy.source = ""));
testDeepCopy([1, 2, [3, 4]], (copy) => (copy[2][0] = 9));
testDeepCopy(new Map().set("key", "value"), (copy) =>
  copy.set("key", "new value")
);
testDeepCopy(new Set([1, 2, 3]), (copy) => copy.add(4));
