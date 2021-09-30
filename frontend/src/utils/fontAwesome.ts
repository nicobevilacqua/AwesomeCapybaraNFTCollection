// available icons list https://fontawesome.com/v5.15/icons?d=gallery

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBell } from '@fortawesome/free-solid-svg-icons';
// import { faInstagram, faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
// import { } from '@fortawesome/free-regular-svg-icons';

[faBell].forEach((icon) => {
  library.add(icon);
});

export default FontAwesomeIcon;
