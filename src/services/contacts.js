import ContactCollection from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

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
