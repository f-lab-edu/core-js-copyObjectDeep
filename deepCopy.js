var copyObjectDeep = function (target) {
  var result = {};
  // 타겟이 오브젝트이면서 null이 아닐 때에만
  if (typeof target === "object" && target !== null) {
    for (var prop in target) {
      result[prop] = copyObjectDeep(target[prop]); // 재귀함수?
    }
  } else {
    result = target;
  }
  return result;
};

var obj = {
  a: 1,
  b: { c: null, d: [1, 2] },
};

var obj2 = copyObjectDeep(obj);

obj.b.c = "adf";
console.log(obj, obj2);
