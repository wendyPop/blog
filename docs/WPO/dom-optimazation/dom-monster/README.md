---
title: DOM monster 로 DOM 최적화
meta:
- name: description
  content: 돔을 최적화하는 도구 DOM monster 를 활용해보자
- property: og:title
  content: using DOM monster 
- property: og:description
  content: using DOM monster
- property: og:url
  content: https://wendypop.github.io/blog/WPO/dom-optimazation/dom-monster/
  tags: ["dom-wpo", "DOM-monster"]
---

[[toc]]

[돔 몬스터 설치](http://mir.aculo.us/dom-monster/)
1. 위 사이트에 가서, 브라우저 즐겨찾기로 추가
2. 원하는 웹페이지에서 즐겨찾기된 'DOM Monster!'를 클릭하면 돔몬스터가 페이지를 분석!

### 돔 몬스터가 제공하는 warn, tips, info 등을 분석
<b> 중첩태그를 줄여라. 15 levels 이하로 태그 중첩하길 권장! </b>
- Nesting depth is very high. Some of the nodes are nested more than 15 levels deep (these are marked with a dashed red border).
- Nesting depth is a little high. Reducing it might increase performance.
- DOM size is higher than 250k. Performance might improve if you reduce the amount of HTML.
- Nesting depth is very high. Some of the nodes are nested more than 15 levels deep (these are marked with a dashed red border).
- Element count seems excessively high. Performance might improve if you reduce the number of nodes.
- Nesting depth is a little high. Reducing it might increase performance.


<b> 빈 노드가 60개 이상이다. 3% 나 차지한다. 등등. </b>

- There are 60 empty nodes. Removing them might improve performance.
- 3.0% of nodes are whitespace-only text nodes. Reducing the amount of whitespace, like line breaks and tab stops, can help improve the loading and DOM API performance of the page.
  - 3% 노드는 개행이나 탭등의 공백이 존재합니다.
- There are 61 empty nodes. Removing them might improve performance.
- 33.4% of nodes are whitespace-only text nodes. Reducing the amount of whitespace, like line breaks and tab stops, can help improve the loading and DOM API performance of the page.


<b> 스타일 관련 : 외부 스타일 시트가 3개나 로드되어 있다. 줄여라. 인라인 스타일을 자제하라. 투명처리는 css opacity 를 써라 </b>

- Reduce the number of <link rel="stylesheet"> tags. There are 3 external stylesheets loaded on the page.
- Reduce the number of tags that use the style attribute, replacing it with external CSS definitions. 98 nodes use the style attribute, for a total of 3942 bytes.
- Some nodes use transparency. To improve rendering performance, try not to use the CSS opacity property (found 7 nodes, marked with a dashed blue border).
- Reduce the number of tags that use the style attribute, replacing it with external CSS definitions. 403 nodes use the style attribute, for a total of 18636 bytes.
- Reduce the number of <link rel="stylesheet"> tags. There are 4 external stylesheets loaded on the page.
- Some nodes use transparency. To improve rendering performance, try not to use the CSS opacity property (found 8 nodes, marked with a dashed blue border).
- Reduce the number of tags that use the style attribute, replacing it with external CSS definitions. 1 nodes use the style attribute, for a total of 47 bytes.


<b> 자바스크립트 관련</b>

- There are 117 bytes of inline JavaScript code in 5 HTML nodes. Removing the inline JavaScript, or updating the attributes will improve the loading speed of the page.
  - 로딩 스피드를 올리기 위해 인라인 자바스크립트 코드를 없애
- Found 1 \<script> tags in HEAD. For better perceived loading performance move script tags to end of document; or use a non-blocking JS loader library. 
  - 헤드에 로드해둔 자바스크립트는 로딩 퍼포먼스를 위해 문서 아래쪽으로 이동시켜랏. 아니면 non-blocking loader 라이브러리를 사용하라
- Found 24 JavaScript globals. Cutting back on globals can increase JavaScript performance. See JavaScript console for details. 
- Check the JavaScript console of your browser for detailed information on some of the tips.
- Empty node
- Inline style

### 검증




### 요약

<Comment />
