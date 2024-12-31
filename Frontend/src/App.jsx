import React, { useState, useEffect } from "react";
import { getContacts, addContact, deleteContact, updateContact } from "./services/api";
import ContactForm from "./components/ContactForm";
import toast,{ Toaster  } from "react-hot-toast";

const App = () => {
  const [contacts, setContacts] = useState([]); // Stores the contacts
  const [editingContact, setEditingContact] = useState(null); // Tracks the contact being edited
  const [showForm, setShowForm] = useState(false); // Toggles between table and form views

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const { data } = await getContacts();
      setContacts(data.contacts || []); // Handle empty data gracefully
    } catch (error) {
      toast.error("Failed to fetch contacts");
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle add/update contact
  const handleAddOrUpdateContact = async (contact) => {
    try {
      if (editingContact) {
        await updateContact(editingContact._id, contact); // Update contact
        toast.success("Contact updated successfully");
      } else {
        await addContact(contact); // Add new contact
        toast.success("Contact added successfully");
      }
      fetchContacts();
      setEditingContact(null);
      setShowForm(false); // Return to table view
    } catch (error) {
      toast.error("Failed to save contact");
    }
  };

  // Handle delete contact
  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id);
      toast.success("Contact deleted successfully");
      fetchContacts();
    } catch (error) {
      toast.error("Failed to delete contact");
    }
  };

  // Handle edit button
  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true); // Show the form with pre-filled data
  };

  // Show form
  const handleShowForm = () => {
    setEditingContact(null);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Contact Management</h1>
          <button
            onClick={handleShowForm}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Contact
          </button>
        </div>

        {showForm ? (
          <ContactForm
            onSubmit={handleAddOrUpdateContact}
            initialData={editingContact}
            buttonText={editingContact ? "Update Contact" : "Add Contact"}
          />
        ) : (
          <div>
            {contacts.length === 0 ? (
              <p className="text-center text-gray-500 text-lg">No data found</p>
            ) : (
              <table className="w-full border-collapse border border-gray-300 shadow-md">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 px-4 py-2">Full Name</th>
                    <th className="border border-gray-300 px-4 py-2">Email</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2">{contact.fullname}</td>
                      <td className="border border-gray-300 px-4 py-2">{contact.email}</td>
                      <td className="border border-gray-300 px-4 py-2 text-center">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 mx-1"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 mx-1"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default App;
