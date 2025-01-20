import * as contactServices from "../services/contacts.js";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { saveFileToCloudinary } from "../utils/saveFileToCloudinary.js";
import { getEnvVar } from "../utils/getEnvVar.js";

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { _id: userId } = req.user;
  const data = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
  });
  res.json({ status: 200, message: "Successfully found contacts!", data });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.getContact({ _id: contactId, userId });
  if (!data) {
    throw createHttpError(404, "Contact not found");
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }
  const data = await contactServices.addContact({
    ...req.body,
    photo: photoUrl,
    userId,
  });
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data,
  });
};

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const photo = req.file;
  let photoUrl;
  if (photo) {
    photoUrl = await saveFileToCloudinary(photo);
  }
  const data = await contactServices.updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
  });
  if (!data) {
    throw createHttpError(404, "Contact not found");
  }
  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const data = await contactServices.deleteContact(contactId, userId);

  if (!data) {
    throw createHttpError(404, "Contact not found");
  }
  res.status(204).send();
};
