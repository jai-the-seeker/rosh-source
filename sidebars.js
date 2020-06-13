/*module.exports = {
  someSidebar: {
    NetworkRecon: [
      {
        type: 'category',
        label: '02. Introduction',
        items: ['network_recon/proxy', 'network_recon/SMTP', 'doc3']
      },
    ],
  }
};*/



/*module.exports = {
  someSidebar: {
    //NetworkRecon: ['network_recon/proxy', 'network_recon/SMTP', 'doc3'],
    //Scripts: ['scripts/bash_scripts', 'scripts/python_scripts'],
    //Utilities: ['utilities/curl'],
    Web: ['mdx'],
  },
};
*/

module.exports = {
  someSidebar: {
    'Network Recon': [
      'network_recon/proxy',
      'network_recon/SMTP'
    ],
    Scripts: [
      'scripts/bash_scripts', 
      'scripts/python_scripts'
    ],
    Utilities: [
      'utilities/curl',
      'utilities/nc',
      'utilities/nmap',
      'utilities/ssh',
      'utilities/tshark',
    ],
    Web: [
      'web/sql_injection',
      'web/web_recon',
    ],
    Misc: [
      'forensics',
      'linux_deb_backdoor',
      'linux_priv_esc',
      'MITRE',
      'password_cracking',
      'persistence',
    ],
    

  },
};