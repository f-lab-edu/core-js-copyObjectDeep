# Deep Copy 코어 자바스크립트 예제 보완

이슈
- 복사한 객체의 자료형이 달라지는 현상이 발생한다.
  - 아래 책의 예제 코드에서 obj.b.d 의 자료형은 배열이지만
  - 깊은 복사를 수행한 obj2.b.d 의 자료형은 객체이다.

원인
- copyObjectDeep 함수 안에서 `result` 변수로 빈 객체를 생성한 후에 복사한 값을 `result` 객체에 추가한 값을 반환받기 때문에 객체 타입으로 복사가 이루어진다.


```js
// 예제1-17 코드
var copyObjectDeep = function (target) {
  var result = {};
  if (typeof target === "object" && target !== null) {
    // 타겟이 오브텍느이면 copyObjectDeep 함수를 재귀적으로 호출
    for (var prop in target) {
      result[prop] = copyObjectDeep(target[prop]); // 재귀함수?
    }
  } else {
    // 기본형이면 그냥 복사
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
```

해결 방법
- 자료형에 따라 복사한 객체도 동일한 자료형을 반환할 수 있도록 처리하기.
