const routes = [
  "Vue",
  "React",
  "JS",
  "MarkDown",
]

const getAside = () => {
  const sidebar = {};
  for (const route of routes) {
    // ../Vue/index.js 파일을 읽는다.
    Object.assign(sidebar, require("../" + route));
  }
  return sidebar;
};

module.exports = {
  title: '개발로그',
  description: 'Exploring Web Front End',
  base: "/blog/",
  themeConfig: {
    searchPlaceholder: '검색',
    lastUpdated: 'Last Updated',
    sidebar: getAside(),
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'React', link: '/React/' },
      { text: 'Vue', link: '/Vue/' },
      { text: "JS", link: "/JS/" },
      { text: "MarkDown", link: "/MarkDown/"}
      // { text: 'About', link: '/about/' },
      //   text: 'About',
      //   items: [
      //     { text: 'About Me', link: '/about/me' },
      //     { text: 'About Blog', link: '/about/blog' }
      //   ]
      // }
    ]
  },

  plugins: [
    '@vuepress/last-updated',
    '@vuepress/back-to-top',
    '@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: true
    }
  ]
}
