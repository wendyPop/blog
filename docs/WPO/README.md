## 웹 성능 최적화

- 웹 성능을 끌어올리기 위해 공부한 이론들과 시도한 내용들 정리 
- 랜더링 성능 개선하기 → 화면을 더 빠르게 그리기 
- 로딩 성능 개선하기 -> 각 리소스들을 빠르게 다운로드하기, 지연 시간을 줄이기, 다운로드 양을 줄이기

### 시도할 수 있는 성능 개선
- 브라우저 동작을 이해하고 최적화하기
  1. 브라우저 랜더링  `(critical rendering path)` 
  2. `repaint`, `reflow` 줄이기

- HTML/DOM 최적화
- CSS 최적화
- JavaScript 최적화
     1. 병목 `(bottleneck)` 코드 줄이기
     2. 번들 파일 지연 로드하기
        1. 구성 요소를 지연 로드하면 초기 JavaScript 페이로드를 수백 킬로바이트 감소 가능
     3. 스크립트 파일 병합
     4. 스크립트 파일 압축 전달
- 이미지 최적화하기
   1. 이미지 사이즈 최적화
   2. 이미지 압축
   3. 이미지 CDN 을 통한 최적화
   4. 이미지 preload
   5. 이미지 lazy load
   6. 인라인 이미지 (css background-image 사용)
   7. CSS 스프라이트
   8. 브라우저가 선호하는 이미지 포맷 사용
- 웹 성능 최적화 지표 구하기
- 도구 사용해보기
  - DOM monster
  - webpack-bundle-analyze
  - 크롬 devTools performance panel
  - 크롬 devTools light house panel
  - 크롬 devTools Network panel
  - 크롬 devTools rendering 모듈
  - 크롬 Coverage 모듈
  - window.performance 객체
  - 구글 pageSpeed
- 텍스트 압축
- 캐싱
   1. 브라우저 캐싱
   2. 인터넷 캐싱
- 컴포넌트 preload
- 컴포넌트 lazy load `React Code splitting`
- HTTP 요청 수 줄이기

<Comment />
