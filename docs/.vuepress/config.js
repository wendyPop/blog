const routes = [
  "html",
  "WPO",
  "JS",
  "UI",
  "React",
  "Vue",
  "MarkDown",
]

const getAside = () => {
  const sidebar = {};
  for (const route of routes) {
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
      // { text: 'React', link: '/React/' },
      { text: "WPO", link: "/WPO/"},
      { text: "UI", link: "/UI/" },
      // { text: "JS", link: "/JS/" },
      // { text: "HTML/DOM", link: "/html/" },
      // { text: 'Home', link: '/' },
      // { text: 'Vue', link: '/Vue/' },
      // { text: "MarkDown", link: "/MarkDown/"}
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
  ],
  head: [
    [
      "script",
      {
        async: true,
        src: "https://www.googletagmanager.com/gtag/js?id=G-C43W54E093",
      },
    ],
    ["script", {}, ["window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-C43W54E093');"]],
  ],
}
