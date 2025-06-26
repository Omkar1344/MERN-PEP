const express = require('express');
const linksController = require('../controller/linksController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/r/:id',linksController.redirect);

router.use(authMiddleware.protect);
router.post('/',linksController.create);
router.get('/',linksController.getAll);
router.get('/:id',linksController.getById);
router.put('/:id',linksController.update);
router.delete('/:id',linksController.delete);

module.exports=router;