'use strict';
const { Router } = require('express');
const controller = require('./controller');
const router = Router();

router.post('/', controller.post_url);

router.get('/:code', controller.get_url);

router.get('/', controller.get_all);

router.delete('/', controller.delete_all);

module.exports = router;