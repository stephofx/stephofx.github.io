const randomString = (length) => {
  const x = 36 ** (length + 1);
  const y = 36 ** length;
  return Math.round(x - (Math.random() * y)).toString(36).slice(1);
};

const pages = [
  {
    route: '/',
    title: 'Stephan Xie',
    heading: 'ABOUT THIS SITE',
  },
  {
    route: '/about',
    title: 'Stephan Xie',
    heading: 'ABOUT ME',
  },
  {
    route: '/projects',
    title: 'Stephan Xie',
    heading: 'PROJECTS',
  },
  {
    route: '/stats',
    title: 'Stephan Xie',
    heading: 'STATS',
  },
  {
    route: '/contact',
    title: 'Stephan Xie',
    heading: 'CONTACT',
  },
];

export { pages, randomString };
