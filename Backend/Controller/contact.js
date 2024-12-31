import contactModal from "../Models/contact.js";

// Add a contact
export const addContact = async (req, res) => {
  const { fullname, email } = req.body;

  try {

    if (!fullname || !email) {
      return res.status(400).json({ success: false, message: "Full name and email are required" });
    }

    const result = await contactModal.create({ fullname, email });
    res.status(201).json({ success: true, message: "Contact added successfully", result });
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ success: false, message: "Failed to add contact" });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await contactModal.find();
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ success: false, message: "Failed to fetch contacts" });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const result = await contactModal.deleteOne({ _id: id });

    if (result.deletedCount === 1) {
      res.status(200).json({ success: true, message: "Contact deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Contact not found" });
    }
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ success: false, message: "Failed to delete contact" });
  }
};

// Update a contact
export const updateContact = async (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  console.log(id)
  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const result = await contactModal.updateOne(
      { _id: id },
      { $set: req.body },
    );

    if (result) {
      console.log('hogaya updated successfully')
      res.status(200).json({ success: true, message: "Contact updated successfully" });
    } else {
      console.log('not hogaya updated successfully')

      res.status(404).json({ success: false, message: "Contact not found or no changes made" });
    }
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ success: false, message: "Failed to update contact" });
  }
};

// Get a single contact by ID
export const getSingleContact = async (req, res) => {
  const { id } = req.params;

  try {

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const contact = await contactModal.findById(id);

    if (contact) {
      res.status(200).json({ success: true, contact });
    } else {
      res.status(404).json({ success: false, message: "Contact not found" });
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ success: false, message: "Failed to fetch contact" });
  }
};
