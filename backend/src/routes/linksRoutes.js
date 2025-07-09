const express = require('express');
const linksController = require('../controller/linksController');
const authMiddleware = require('../middleware/authMiddleware');
const authorize = require('../middleware/authorizeMiddleware');
const router = express.Router();


router.get('/r/:id',linksController.redirect);

router.use(authMiddleware.protect);
//This endpoint needs to be above GET /:id to avoid case where ;analytics' can
//be treated as :id.
router.get('/analytics',authorize('link:read'), linksController.analytics);
router.post('/',authorize('link:create'),linksController.create);
router.get('/',authorize('link:read'),linksController.getAll);
router.get('/:id',authorize('link:read'),linksController.getById);
router.put('/:id',authorize('link:update'),linksController.update);
router.delete('/:id',authorize('link:delete'),linksController.delete);

module.exports=router;