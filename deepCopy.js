/**
 *
 * @param {any} target
 * @returns
 */
var newCopyObjectDeep = function (target) {
  var result;

  // 배열일 경우 배열 자료형을 반환할 수 있도록 처리
  if (Array.isArray(target)) {
    result = [];
    result = target.map((v) => {
      return v;
    });
  } else if (typeof target === "object" && target !== null) {
    result = {};
    for (var prop in target) {
      result[prop] = newCopyObjectDeep(target[prop]); // 재귀함수?
    }
  } else {
    console.log("target", target);
    result = target;
  }
  return result;
};

var obj = {
  a: 1,
  b: { c: null, d: [1, 2] },
};

var obj2 = newCopyObjectDeep(obj);

obj.b.c = "adf";
obj.b.d = "edf";

console.log(obj, obj2);
