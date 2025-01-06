import { Router } from "express";
import * as contactsControllers from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import * as contactsSchemas from "../validation/contactsSchema.js";

const contactsRouter = Router();

contactsRouter.get("/", ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get(
  "/:contactId",
  isValidId,
  ctrlWrapper(contactsControllers.getContactByIdController)
);

contactsRouter.post(
  "/",
  validateBody(contactsSchemas.addContactSchema),
  ctrlWrapper(contactsControllers.addContactController)
);

contactsRouter.patch(
  "/:contactId",
  isValidId,
  validateBody(contactsSchemas.updateContactSchema),
  ctrlWrapper(contactsControllers.updateContactController)
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  ctrlWrapper(contactsControllers.deleteContactController)
);

export default contactsRouter;
