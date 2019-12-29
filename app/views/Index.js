import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main>
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2><Link to="/">About</Link></h2>
        </div>
      </header>
      <p> Welcome to my website.       </p>
    </article>
  </Main>
);

export default Index;
