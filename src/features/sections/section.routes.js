// import express from 'express';
// import SectionController from './section.controller.js';

// // Initialize Express router
// const sectionRoute = express.Router();

// const sectionController = new SectionController();

// // Define routes
// sectionRoute.get('/', sectionController.getSections);
// sectionRoute.post('/', sectionController.addSection);
// sectionRoute.put('/:id', sectionController.updateSection);
// sectionRoute.delete('/:id', sectionController.deleteSection);
// sectionRoute.get('/:id', sectionController.getOneSection);

// export default sectionRoute

import express from 'express';
import SectionController from './section.controller.js';

const router = express.Router();

router.get('/', SectionController.getSections);
router.post('/', SectionController.addSection);
router.delete('/:id', SectionController.deleteSection);

export default router;
