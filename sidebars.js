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



module.exports = {
  huntingSidebar: {
    Hunting:[
      'hunting/field-manual',
    ],
    'Network Recon': [
      'hunting/network_recon/proxy',
      'hunting/network_recon/SMTP'
    ],
    Scripts: [
      'hunting/scripts/bash_scripts', 
      'hunting/scripts/python_scripts'
    ],
    Utilities: [
      'hunting/utilities/curl',
      'hunting/utilities/nc',
      'hunting/utilities/nmap',
      'hunting/utilities/ssh',
      'hunting/utilities/tshark',
    ],
    Web: [
      'hunting/web/sql_injection',
      'hunting/web/web_recon',
    ],
    Misc: [
      'hunting/forensics',
      'hunting/linux_deb_backdoor',
      'hunting/linux_priv_esc',
      'hunting/MITRE',
      'hunting/password_cracking',
      'hunting/persistence',
    ],
    Vulnhub: [
      'hunting/vulnhub/DC-9',      
    ],
    OverTheWire: [
      'hunting/bandit',      
    ],

  },

  web_securitySidebar: {
    Sessions:[
      'web_security/sessions',      
    ],
    DVWA:[
      'web_security/dvwa/bruteforcing',      
    ],

  },
};
