// src/ContactList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get('http://localhost:5000/api/contacts');
      setContacts(response.data);
    };

    fetchContacts();
  }, []);

  const addContact = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    const response = await axios.post('http://localhost:5000/api/contacts', { name, phone });
    setContacts([...contacts, response.data]);
    setName('');
    setPhone('');
  };

  return (
    <div className="contact-container">
      <h1>Personal Phone Directory</h1>
      <form onSubmit={addContact}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <button type="submit">Add Contact</button>
      </form>
      <div className="contact-list">
        {contacts.map((contact) => (
          <div key={contact.id} className="contact">
            <h2>{contact.name}</h2>
            <p>{contact.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
