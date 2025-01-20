import { Router } from "express";
import * as contactsControllers from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import * as contactsSchemas from "../validation/contactsSchema.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get(
  "/:contactId",
  isValidId,
  ctrlWrapper(contactsControllers.getContactByIdController)
);

contactsRouter.post(
  "/",
  upload.single("photo"),
  validateBody(contactsSchemas.addContactSchema),
  ctrlWrapper(contactsControllers.addContactController)
);

contactsRouter.patch(
  "/:contactId",
  isValidId,
  upload.single("photo"),
  validateBody(contactsSchemas.updateContactSchema),
  ctrlWrapper(contactsControllers.updateContactController)
);

contactsRouter.delete(
  "/:contactId",
  isValidId,
  ctrlWrapper(contactsControllers.deleteContactController)
);

export default contactsRouter;
