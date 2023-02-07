const express = require('express');

const router = express.Router();

const {
  toggleFavoriteSchema,
  updateContactSchema,
  addContactSchema,
} = require('../../schemas/validationContactsSchema');

const { validateBody } = require('../../middlewares/validateBody');

const {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactByIdController,
  toggleFavoriteByIdController,
  deleteContactByIdController,
} = require('../../controllers/contactsController');

const tryCatchWrapper = require('../../helpers/tryCatchWrapper');

const { authMiddleware } = require('../../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', tryCatchWrapper(getContactsController));

router.get('/:contactId', tryCatchWrapper(getContactByIdController));

router.post(
  '/',
  validateBody(addContactSchema),
  tryCatchWrapper(createContactController)
);

router.put(
  '/:contactId',
  validateBody(updateContactSchema),
  tryCatchWrapper(updateContactByIdController)
);

router.patch(
  '/:contactId/favorite',
  validateBody(toggleFavoriteSchema),
  tryCatchWrapper(toggleFavoriteByIdController)
);

router.delete('/:contactId', tryCatchWrapper(deleteContactByIdController));

module.exports = router;
