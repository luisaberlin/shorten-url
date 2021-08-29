'use strict';
const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/', controller.post_url);

router.get('/:code', controller.get_url);

module.exports = router;