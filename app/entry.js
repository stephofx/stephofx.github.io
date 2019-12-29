import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';

// Featured
import Index from './views/Index';
import Projects from './views/Projects';

import NotFound from './views/NotFound';

// All of our CSS
import './static/css/main.scss';

ReactDOM.render(
  <Router basename={BASE_PATH}>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route path="/projects" component={Projects} />
      {/* Only useful in development mode */}
      <Route component={NotFound} status={404} />
    </Switch>
  </Router>,
  document.getElementById('root'),
);
