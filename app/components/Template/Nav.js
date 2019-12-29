import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import data from '../../data/contact';

const Nav = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${BASE_PATH}/images/me_icon.jpg`} alt="" />
      </Link>
      <header>
        <h2>Stephan Xie</h2>
        <p><a href="mailto:stephanxie78@gmail.com">stephanxie78@gmail.com</a></p>
      </header>

      <ul className="icons">
        {data.map((s) => (
          <li key={s.label}>
            <a href={s.link}>
              <FontAwesomeIcon icon={s.icon} />
            </a>
          </li>
        ))}
      </ul>

      <h2>About</h2>
      <p>Hi, I&apos;m Stephan. I&apos;m a high school senior at Clements High school.
       I enjoy piano, wushu, science & technology, and everyday life. </p>
    </section>

  </section>
);

export default Nav;
