const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: 'Raymond Wang\'s CSE15L Homepage',
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /* base: "/CSE15L/", */

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" }],
    ["script", { async: true, src: "https://www.googletagmanager.com/gtag/js?id=G-2V30EYKRT4" }],
    ["script", null, "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-2V30EYKRT4');"]
  ],

  // <!-- Global site tag (gtag.js) - Google Analytics -->
  // <script async src="https://www.googletagmanager.com/gtag/js?id=G-2V30EYKRT4"></script>
  // <script>
  //   window.dataLayer = window.dataLayer || [];
  //   function gtag(){dataLayer.push(arguments);}
  //   gtag('js', new Date());
  //   gtag('config', 'G-2V30EYKRT4');
  // </script>

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    displayAllHeaders: true,
    nav: [
      {
        text: 'GitHub',
        link: 'https://github.com/waymondrang/CSE15L'
      }
    ],
    logo: "https://i.imgur.com/LiFjrJl.png",
    sidebar: [
      '/',
      '/week_two'
    ]
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
}
