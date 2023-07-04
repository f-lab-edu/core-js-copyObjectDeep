/**
 * 개선 코드
 * @param {any} target
 * @returns
 */
var newCopyObjectDeep = function (target) {
  var result;

  // target이 Date 객체일 경우
  if (target instanceof Date) {
    result = new Date(target.getTime());
  }
  // target이 배열일 경우
  else if (Array.isArray(target)) {
    result = target.map(newCopyObjectDeep);
  }
  // target이 함수일 경우
  else if (typeof target === "function") {
    result = function () {
      return target.apply(this, arguments); // 함수 복사하기
    };
  }
  // target이 정규 표현식일 경우
  else if (target instanceof RegExp) {
    result = new RegExp(target);
  }
  // target이 null이 아닌 객체일 경우
  else if (typeof target === "object" && target !== null) {
    result = {};
    for (var prop in target) {
      result[prop] = newCopyObjectDeep(target[prop]);
    }
  }
  // target이 원시 타입이나 그 외의 타입일 경우
  else {
    result = target;
  }
  return result;
};

console.log("--------------------------");
// 숫자 복사 테스트
var num = 42;
var copiedNum = newCopyObjectDeep(num);
console.log("------숫자 복사 테스트---------");
console.log(copiedNum === num); // true

// 문자열 복사 테스트
var str = "Hello, world!";
var copiedStr = newCopyObjectDeep(str);
console.log("------문자열 복사 테스트---------");
console.log(copiedStr === str); // true

// 배열 복사 테스트
var arr = [1, 2, { a: 3, b: 4 }, [5, 6]];
var copiedArr = newCopyObjectDeep(arr);
console.log("------배열 복사 테스트---------");
console.log(copiedArr !== arr); // true
console.log(copiedArr[2] !== arr[2]); // true
console.log(copiedArr[3] !== arr[3]); // true

// Date 객체 복사 테스트
var date = new Date();
var copiedDate = newCopyObjectDeep(date);
console.log("------Date 복사 테스트---------");
console.log(copiedDate !== date); // true
console.log(copiedDate.getTime() === date.getTime()); // true

// 함수 복사 테스트
var func = function () {
  console.log("함수 테스트");
};
var copiedFunc = newCopyObjectDeep(func);
console.log("------함수 복사 테스트---------");
console.log(copiedFunc !== func); // true
copiedFunc(); // "함수 테스트"

// 정규표현식 복사 테스트
var regex = /test/gi;
var copiedRegex = newCopyObjectDeep(regex);
console.log("------정규표현식 복사 테스트---------");
console.log(copiedRegex !== regex); // true
console.log(copiedRegex.source === regex.source); // true
console.log(copiedRegex.flags === regex.flags); // true

// 객체 복사 테스트
var obj = {
  a: 1,
  b: { c: null, d: [1, 2] },
  test: new Date(),
  func: function (a, b) {
    return a + b;
  },
  regex: /test/gi,
};
var copiedObj = newCopyObjectDeep(obj);
console.log("------객체 복사 테스트---------");
console.log(copiedObj !== obj); // true
console.log(copiedObj.b !== obj.b); // true
console.log(copiedObj.func !== obj.func); // true
console.log(copiedObj.regex !== obj.regex); // true

// 함수 복사
console.log(obj.func(1, 2), copiedObj.func(3, 4));
console.log(obj.func, copiedObj.func);
/* 
=> 함수 자체를 console.log 호출하면 값이 다른 이유가 뭔지 고민해보기.
ƒ (a, b) {
  return a + b;
} 
ƒ () {
    return target.apply(this, arguments); // 함수 복사하기
}

*/
