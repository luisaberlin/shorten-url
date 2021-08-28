'use strict';
const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.get('/', controller.get_shorten_url);

module.exports = router;