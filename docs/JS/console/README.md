---
title: 개발자로서 개발자도구 console 활용하기
meta:
- name: description
  content:  개발자로서 개발자도구 console 활용하기
- property: og:title
  content:  개발자로서 개발자도구 console 활용하기
- property: og:description
  content:  개발자로서 개발자도구 console 활용하기
- property: og:url
  content: https://wendypop.github.io/blog/JS/console
  tags: ["console", "chrome", "dev-tools", "console.log"]
---

## console 활용

콘솔 객체를 뒤져보면 자주쓰이는 log 메서드부터 외에도 다양한 메서드가 보입니다. 

![before](~@source/.vuepress/assets/img/js/console/consoleObj.png)

<br/>

자주 사용하는 메서드  
- console.log()  
- console.warn()  
- console.error()    
- console.info()  
- console.dir()    
- console.clear()  

낯설지만 우리가 활용하면 좋은 속성과 메서드들도 많습니다.  
- console.count()  
- console.countReset()  
- console.time()  
- console.timeLog()  
- console.timeEnd()  
- console.table()  
- console.group()  
- console.groupEnd()  
- console.groupCollapsed()  

실무에서 주로 활용해본 방법과, 앞으로 써먹어도 좋을 것 같은 메서드들을
공부해보려고 합니다.


---


### 1 컬러로 찍기
프로덕션 개발 시 강조하고 싶은 내용을 주로 컬러 로그를 찍어서 활용할 수 있습니다.
```shell
console.log('%c 중요한 내용', 'color:red')  
console.log('%c hi green content', 'color:green')
```
결과  
<img src="~@source/.vuepress/assets/img/js/console/coloredLog.png" width="500">


<br />
<br />

### 2 치환하기
```shell
let a = 1
let b = 'hello'
console.log('%d는 숫자 %s는 문자열', a, b)
console.log(`${a}는 숫자 ${b}는 문자열`)
console.log(a + '는 숫자 ', b + '는 문자열')
```
결과  
<img src="~@source/.vuepress/assets/img/js/console/converting.png" width="500">

여러가지 값을 함께 로그를 찍을때는 `탬플릿 리터럴`이나 숫자`%d`,문자`%s`를 구분해서 치환해준다던가
`,(콤마)`를 이용해서 로그를 찍기도 합니다.

<br />
<br />


### 3 함수나 변수의 호출 횟수를 알고싶을때 count
사용자화를 위하여 (마케팅용 데이터 수집과 사용자 관심도 측정) 데이터를 수집할 때 
많이 사용합니다.
사용자가 배너 클릭하는 횟수등을 카운팅하는 용도로 주로 활용했던 것 같습니다.

```js
function someFunc() { return true }

console.count(someFunc()) // true: 1
console.count(someFunc()) // true: 2
console.count(someFunc()) // true: 3
console.count(someFunc()) // true: 4

```

카운트를 리셋할 수도 있습니다.
```js{5}
function someFunc() { return true }

console.count(someFunc()) // true: 1
console.count(someFunc()) // true: 2
console.countReset(someFunc()) // 같은 함수를 인자로 보내야 리셋이 됩니다.

console.count(someFunc())  // true: 1
console.count(someFunc())  // true: 2
```

<br />
<br />

### 4. 코드의 수행시간을 알고 싶을 때 time, timeEnd

코드의 성능(수행시간의 속도)을 측정할 때 사용합니다
```js
console.time('타이머');
for (var i = 0; i < 100; i++) {
  variable += i;
}
console.timeEnd('타이머');
// 타이머: 5119.9140625 ms

```

<br />
<br />

### 5. 객체 데이터를 테이틀향으로 보기좋게 로그 찍기

```js{7}
const obj = {
  name: 'melon',
  weight: 4350,
  price: 16500,
  isFresh: true
}
console.table(obj)
```
결과  
<img src="~@source/.vuepress/assets/img/js/console/table.png" width="300">
<br />

배열도 출력할 수 있습니다.
```js
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}

const tyrone = new Person("Tyrone", "Jones")
const janet = new Person("Janet", "Smith")
const maria = new Person("Maria", "Cruz")

console.table([tyrone, janet, maria])
```
결과  
<img src="~@source/.vuepress/assets/img/js/console/table2.png" width="300">

<br />
<br />

### 6. 그루핑도 가능합니다.
```js
console.groupCollapsed('%c you must check before update', 'color:red')
console.log("1. check codebuild");
console.log("2. check server status");
console.groupEnd();
```
결과
groupCollapsed 를 써서 토글이 접힌채로 로그가 찍힙니다.  
<img src="~@source/.vuepress/assets/img/js/console/gouping.png" width="300">

토글 열었을 때  
<img src="~@source/.vuepress/assets/img/js/console/groupingExpanded.png" width="300">


depth 를 깊이 들어갈 수도 있습니다. 이렇게까지 사용하진 않았지만...
MDN에서 소개를 하고 있어서 기록해봅니다.
```js
console.log("This is the outer level")
    console.group()   // groupCollapsed 를 사용하면 expand 된 채로 로그가 찍힙니다.
    console.log("Level 2")
        console.group()
        console.log("Level 3")
        console.warn("More of level 3")
        console.groupEnd()
    console.log("Back to level 2")
    console.groupEnd()
console.log("Back to the outer level")
```
결과  
<img src="~@source/.vuepress/assets/img/js/console/groupLevel.png" width="300">

<br />
<br />

### stack 보기
```js
function foo() {
  function bar() {
    function baz() {
        function faz() {
            console.trace();
        }
        faz()
    }
    baz()
  }
  bar();
}
foo();
```
결과  
<img src="~@source/.vuepress/assets/img/js/console/callStack.png" width="300">

