---
title: 밀리세컨드 변환하기
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

## 밀리세컨드 변환
<img src="./milliSeconds.png" width="500">

new Date() 로 나오는 값은 
밀리세컨드


천분의 1초를 가리킴 
1000ms == 1초 == 1sec


1) 시 ( Hours ) 표현:
```js
( ms / (1000 * 60 *60)) % 24
```


2) 분 ( Minutes ) 표현 :
```js
( ms / (1000 * 60 )) % 60 
```

3) 초로 ( Seconds ) 표현 :
```js{6}
let startTime = new Date().getTime()

// 몇 초뒤
let endTime = new Date().getTIme()
let ms = endTime - startTime; // ms : 6400
console.log(( ms / 1000 ) % 60)// 6.4 초
```
