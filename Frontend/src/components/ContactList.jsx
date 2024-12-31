import React from "react";

const ContactList = ({ contacts, onEdit, onDelete }) => {
  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <div key={contact._id} className="p-4 bg-gray-100 rounded-md shadow-md flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">{contact.fullname}</h2>
            <p className="text-gray-600">{contact.email}</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={() => onEdit(contact)}
              className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(contact._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
