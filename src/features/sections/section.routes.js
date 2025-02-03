
import express from 'express';
import SectionController from './section.controller.js';

const router = express.Router();

router.get('/', SectionController.getSections);
router.post('/', SectionController.addSection);
router.delete('/:id', SectionController.deleteSection);
router.put('/:id', SectionController.updateSection);

export default router;
