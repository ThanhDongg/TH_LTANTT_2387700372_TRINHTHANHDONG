// @ts-check
// Docusaurus config for DevSecOps Pipeline Tutorial Project
// Thuc hanh Lab 06 - 6.2.2: Tao pipeline CI/CD phuc tap
// Sinh vien: Trinh Thanh Dong - MSSV: 2387700372

const config = {
  title: 'DevSecOps Pipeline Tutorial',
  tagline: 'CI/CD & Security Gates with GitLab and GitHub',
  url: 'https://thanhdongg.gitlab.io/',
  baseUrl: '/my-pipeline-tutorial-project/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'ThanhDongg',
  projectName: 'my-pipeline-tutorial-project',

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig: {
    navbar: {
      title: 'DevSecOps Project',
      items: [
        {type: 'docSidebar', sidebarId: 'tutorialSidebar', position: 'left', label: 'Tutorial'},
        {href: 'https://github.com/ThanhDongg/TH_LTANTT_2387700372_TRINHTHANHDONG', label: 'GitHub', position: 'right'},
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © 2026 Trịnh Thành Đông (2387700372) - HUTECH. Built with Docusaurus.`,
    },
  },
};

module.exports = config;
