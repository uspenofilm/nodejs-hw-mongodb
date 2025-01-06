import ContactCollection from "../db/models/Contact.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";
import { SORT_ORDER } from "../constants/contacts.js";

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = "_id",
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find();
  const contactsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return { data: contacts, ...paginationData };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addMovie = (payload) => ContactCollection.create(payload);

export const updateContact = async (contactId, payload) => {
  const result = await ContactCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
    }
  );
  return result;
};

export const deleteContact = async (contactId) => {
  const result = await ContactCollection.findOneAndDelete({ _id: contactId });
  return result;
};
