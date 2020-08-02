module.exports = {
  title: 'Musings',
  tagline: "Let's create something together",
  url: 'https://jai-the-seeker.github.io',
  baseUrl: '/rosh/',
  favicon: 'img/symbol.png',
  onBrokenLinks: 'ignore', 
  organizationName: 'jai-the-seeker', // Usually your GitHub org/user name.
  projectName: 'rosh', // Usually your repo name.  
  themeConfig: {
    
    colorMode: {
      // "light" | "dark"
      defaultMode: 'dark',

      // Hides the switch in the navbar
      // Useful if you want to support a single color mode
      disableSwitch: true,

      // Should we use the prefers-color-scheme media-query,
      // using user system preferences, instead of the hardcoded defaultMode
      respectPrefersColorScheme: false,
    },
    

    navbar: {
      title: 'Musings',
      logo: {
        alt: 'My Site Logo',
        src: 'img/symbol.png',
      },
      items: [
        {
          to: 'docs/hunting/field-manual',
          //activeBaseRegex: 'hunting',
          //activeBasePath: 'docs',
          label: 'Red Hunters',
          position: 'left',
        },
        {
          to: 'docs/web_security/sessions',
          //activeBaseRegex : 'web_security',
          //activeBasePath: 'docs/web_security',
          label: 'Web Security',
          position: 'left',
        },
        {to: 'blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Videos',
          /*items: [
            {
              label: 'Youtube',
              href: '' //'https://stackoverflow.com/questions/tagged/docusaurus',
            },            
          ],*/
        },
        {
          title: 'Community',
          /*items: [
            {
              label: 'Github',
              href: '' //'https://stackoverflow.com/questions/tagged/docusaurus',
            },            
          ],*/
        },
        {
          title: 'Social Media',
          /*items: [
            {
              label: 'Twitter',
              href: '' //'https://github.com/facebook/docusaurus',
            },            
          ],*/
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} jai-the-seeker.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          //homePageId: 'field-manual',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        //web_security: {
          // It is recommended to set document id as docs home page (`docs/` path).
        //  homePageId: 'web_security/sessions',
        //  sidebarPath: require.resolve('./sidebars_web_security.js'),
          // Please change this to your repo.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/edit/master/website/',
        //},
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          //editUrl:
          //  'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },        
        
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
