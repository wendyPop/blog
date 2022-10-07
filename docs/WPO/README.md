## 웹 성능 최적화

- 웹 성능을 끌어올리기 위해 공부한 이론들과 검증내용들 정리
- 랜더링 성능 ( 화면을 더 빠르게 그릴 것인지 )
- 로딩 성능 ( 각 리소스들을 불러오는 성능, 다운로드 양을 줄이기 )

#### 목차
1. 브라우저 동작의 이해 ( critical rendering path )
   1. 브라우저 랜더링
   2. repaint, reflow 줄이기
   
2. 이미지 최적화
   1. 이미지 사이즈 최적화 (적절한 사이즈로 변환)
   2. 이미지 CDN 을 통한 최적화 
   3. 이미지 preload
   4. 이미지 lazy load
3. HTML/돔 최적화
4. CSS 최적화
5. JavaScript 최적화
   1. 병목 (bottleneck) 코드 줄이기
   2. 번들된 파일 지연로드하기
      1. 구성 요소를 지연 로드하면 초기 JavaScript 페이로드를 수백 킬로바이트까지 줄일 수 있습니다.
6. 웹 성능 최적화 지표 구하기
7. 도구 사용해보기
   - DOM monster
   - webpack-bundle-analyze (웹팩 라이브러리)
   - 크롬 개발자도구 performance panel
   - 크롬 개발자도구 light house panel
   - 크롬 개발자도구 Network panel
8. 텍스트 압축
9. 캐싱
10. 컴포넌트 preload
11. 컴포넌트 lazy load
12. React Code splitting

<Comment />
