const express = require('express');
const questionRoute = require('./question.route');
const optionRoute = require('./option.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/question',
    route: questionRoute,
  },
  {
    path: '/option',
    route: optionRoute,
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
