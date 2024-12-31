import React, { useState, useEffect } from "react";

const ContactForm = ({ onSubmit, initialData, buttonText }) => {
  const [fullname, setFullname] = useState(initialData?.fullname || "");
  const [email, setEmail] = useState(initialData?.email || "");

  useEffect(() => {
    if (initialData) {
      setFullname(initialData.fullname);
      setEmail(initialData.email);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ fullname, email });
    setFullname("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-md shadow-md">
      <div>
        <label className="block text-gray-700">Full Name</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
          placeholder="Enter full name"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 border rounded-md"
          placeholder="Enter email"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        {buttonText || "Submit"}
      </button>
    </form>
  );
};

export default ContactForm;
