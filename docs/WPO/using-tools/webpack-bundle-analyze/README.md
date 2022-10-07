---
title: 웹팩 코드 분할 기법 적용 번들 파일 확인
meta:
- name: description
  content: webpack bundle analyzer
- property: og:title
  content: 웹팩 코드 분할
- property: og:description
  content: 웹팩 코드 분할
- property: og:url
  content: https://wendypop.github.io/blog/WPO/using-tools/webpack-bundle-analyze/
  tags: ["webpack-bundle-analyzer", "code-split", "code-spliting"]
---


[[toc]]

---

## 컴포넌트 lazy load 를 위한 code split 적용

- [코드 분할 기법 공식문서](https://ko.reactjs.org/docs/code-splitting.html#reactlazy)


로드될 페이지에서 불필요한 내용들.
즉 미리 로드될 필요가 없는 파일들을, 분리해서 로드하는 전략으로써
다운로드 받을 `파일의 용량을 줄임`으로서 `로딩속도 개선`에 도움이 된다. 

<br/>
React 프로젝트의 경우는 라우터를 구성하는 파일에 적용

```js {4-7}

// router/index.jsx

// 라우트 설정에서 리액트에서 제공하는 lazy 함수로 컴포넌트를 등록한다.
import React, { lazy }  from 'react'
const Main = lazy(() => import('pages/main'))
const User = lazy(() => import('pages/usePage'))
...

return useRoutes([
      {
        element: <Layout />,
        children: [
          { path: '/', element: <Main /> },
          { path: '/user', element: <User /> },
          // ...
        ]
      }]
)
```
로딩이 늦어질 경우를 대비한 대체 화면도 준비해둔다.
레이아웃을 구성하는 프레임에 fallback 적용! 

```js {2,5-6,8}
// layout.jsx
import React, { Suspense } from 'react'

<main>
    {/* 컴포넌트가 로드되지 않았을 경우에 로드될 suspense fallback 컴포넌트도 추가한다. */}
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
</main>
```

<br/>
<br/>

## 성능 개선 확인

### 브라우저로 확인
브라우저 개발자도구 네트워크 탭에서 `컴포넌트 lazy load` 적용이 잘 되었는지 확인해보자.

:arrow_down: 적용 전  
하나로 묶인 bundle.js 파일이 로드되는데 시간이 가장 오래 소요되었고 용량도 2.1MB나 된다.

![before](~@source/.vuepress/assets/img/wpo/code-spliting-before.png)

<br/>

:arrow_down: 적용 후  
코드 스플리팅 적용 후 처음 로드되는 bundle.js 용량이 2.1MB 에서 1.1MB로 1MB나 감소했으며
다운로드해야할 파일의 용량은 줄고 다운로드 속도는 더 빨라졌다.
![after](~@source/.vuepress/assets/img/wpo/code-spliting-after.png)



<br/>
<br/>

### webpack-bundle-analyzer로 bundle 파일의 사이즈 확인
`webpack-bundle-analyzer` 로 개별로 번들링된 번들 파일의 사이즈를 체크해보자

<br/>

먼저 `webpack-bundle-analyzer` 를 설치!
개발단계에서만 필요한 모듈이므로 `-D` 또는 `--save-dev` 옵션으로 개발용으로 설치
```shell
$ npm install -D webpack-bundle-analyzer
```

<br/>

CRA 의 경우 `cra-bundle-analyzer` 도 설치
```shell
$ npm install -D cra-bundle-analyzer
```

 <br/>

아래 명령어를 실행하면 /build/report.html 가 static 파일로 생성되고 브라우저에 실행된다.
```shell
$ npx cra-bundle-analyzer
```


:arrow_down: 적용 후  
![bundle_before](https://i.ibb.co/6wLsK3F/bundled-before.png)
하나의 덩어리로 번들된 index.js가 보인다.  <br/>
당장에 필요없는 페이지의 컴포넌트들도 전부 로드된 것


:arrow_down: 적용 후  
![bundle_after](https://i.ibb.co/Lv7WqyN/bundled-after.png)
우측의 파란 박스들은 각 페이지별로 chunk 된 번들파일이다. <br/>
각 페이지별로 차지하는 요소 용량만큼 번들링 된 것을
웹팩이 제공하는 리포트로 확인 가능하다.

<Comment />
