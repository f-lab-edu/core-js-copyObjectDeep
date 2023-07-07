/**
 * 개선 코드 v2
 * @param {any} target
 * @returns
 */
const deepCopyAny = function (target) {
  // 타입에 따른 복사 방법 분류
  const targetType = {
    date: (value) => new Date(value),
    array: (value, deepCopyAny) => value.map(deepCopyAny),
    regexp: (value) => new RegExp(value.source, value.flags),
    map: (value, deepCopyAny) =>
      new Map(Array.from(value, ([key, val]) => [key, deepCopyAny(val)])),
    set: (value, deepCopyAny) =>
      new Set(Array.from(value, (val) => deepCopyAny(val))),
    object: (value, deepCopyAny) => {
      const result = {};
      for (let prop in value) {
        result[prop] = deepCopyAny(value[prop]);
      }
      return result;
    },
    default: (value) => value,
  };

  // 복사 가능한 오브젝트 객체의 종류
  const checkType = (target) => {
    // target이 날짜일 경우
    if (target instanceof Date) {
      return "date";
    }
    // target이 배열일 경우
    else if (Array.isArray(target)) {
      return "array";
    }
    // target이 정규 표현식일 경우
    else if (target instanceof RegExp) {
      return "regexp";
    }
    // target이 Map일 경우
    else if (target instanceof Map) {
      return "map";
    }
    // target이 Set일 경우
    else if (target instanceof Set) {
      return "set";
    }
    // target이 null이 아닌 객체일 경우
    else if (typeof target === "object" && target !== null) {
      return "object";
    }
    // target이 원시 타입이나 그 외의 타입일 경우
    else {
      return "default";
    }
  };

  const type = checkType(target);
  const targetMethod = targetType[type];
  return targetMethod(target, deepCopyAny);
};
module.exports = deepCopyAny;
