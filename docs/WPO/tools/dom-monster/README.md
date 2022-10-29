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
  content: https://wendypop.github.io/blog/WPO/tools/dom-monster/
  tags: ["wpo","dom-wpo", "DOM-monster"]
---


1. [돔 몬스터](http://mir.aculo.us/dom-monster/) 사이트에 가서, 브라우저 즐겨찾기로 추가
2. 원하는 웹페이지에서 즐겨찾기된 'DOM Monster!'를 클릭하면 돔몬스터가 페이지를 분석 시작후 최적화 팁을 제공
  
<img src="~@source/.vuepress/assets/img/wpo/dom-monster.png" width="700">

## 돔 몬스터가 제공하는 warn, tips, info 등을 분석해봅시다

> tips 요약  
- <b> 중첩태그를 줄이고 15 levels 이하로 태그 중첩하길 권장하고 있습니다. </b>  
- <b> 빈 노드가 60개 이상이며 전체의 3%는 공백이 존재합니다. </b>  
- <b> 외부 스타일 시트가 3개 나 로드되어 있고 줄이기를 권장합니다. 인라인 스타일을 자제하고, 투명처리는 css opacity 를 이용하세요 </b>  
- <b> 인라인 자바스크립트가 117 bytes 나 존재하니 지우고, \<head>\에 로드한 script 는 문서 아래쪽으로 이동시키길 권장합니다.</b>  

---


- Nesting depth is very high. Some of the nodes are nested more than 15 levels deep (these are marked with a dashed red border).
- Nesting depth is a little high. Reducing it might increase performance.
- DOM size is higher than 250k. Performance might improve if you reduce the amount of HTML.
- Nesting depth is very high. Some of the nodes are nested more than 15 levels deep (these are marked with a dashed red border).
- Element count seems excessively high. Performance might improve if you reduce the number of nodes.
- Nesting depth is a little high. Reducing it might increase performance.

- There are 60 empty nodes. Removing them might improve performance.
- 3.0% of nodes are whitespace-only text nodes. Reducing the amount of whitespace, like line breaks and tab stops, can help improve the loading and DOM API performance of the page.
  - 3% 노드는 개행이나 탭등의 공백이 존재합니다.
- There are 61 empty nodes. Removing them might improve performance.
- 33.4% of nodes are whitespace-only text nodes. Reducing the amount of whitespace, like line breaks and tab stops, can help improve the loading and DOM API performance of the page.

- Reduce the number of <link rel="stylesheet"> tags. There are 3 external stylesheets loaded on the page.
- Reduce the number of tags that use the style attribute, replacing it with external CSS definitions. 98 nodes use the style attribute, for a total of 3942 bytes.
- Some nodes use transparency. To improve rendering performance, try not to use the CSS opacity property (found 7 nodes, marked with a dashed blue border).
- Reduce the number of tags that use the style attribute, replacing it with external CSS definitions. 403 nodes use the style attribute, for a total of 18636 bytes.
- Reduce the number of <link rel="stylesheet"> tags. There are 4 external stylesheets loaded on the page.
- Some nodes use transparency. To improve rendering performance, try not to use the CSS opacity property (found 8 nodes, marked with a dashed blue border).
- Reduce the number of tags that use the style attribute, replacing it with external CSS definitions. 1 nodes use the style attribute, for a total of 47 bytes.

- There are 117 bytes of inline JavaScript code in 5 HTML nodes. Removing the inline JavaScript, or updating the attributes will improve the loading speed of the page.
- Found 1 \<script> tags in HEAD. For better perceived loading performance move script tags to end of document; or use a non-blocking JS loader library. 
- Found 24 JavaScript globals. Cutting back on globals can increase JavaScript performance. See JavaScript console for details. 
- Check the JavaScript console of your browser for detailed information on some of the tips.


<Comment />
