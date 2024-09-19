import React from 'react';
import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

function ContactList({ onDelete }) {
	// Получаем список контактов и значение фильтра из Redux
	const contacts = useSelector(state => state.contacts.items) || [];
	const filter = useSelector(state => state.filter.filters) || ''; // Устанавливаем пустую строку, если filter undefined или null

	// Фильтруем контакты на основе значения фильтра
	const filteredContacts = contacts.filter(
		contact => contact?.name?.toLowerCase().includes(filter.toLowerCase()) // Проверяем, что contact и contact.name не undefined
	);

	return (
		<div className={styles.contact_list}>
			{filteredContacts.map(contact => (
				<Contact key={contact.id} data={contact} onDelete={onDelete} />
			))}
		</div>
	);
}

export default ContactList;
