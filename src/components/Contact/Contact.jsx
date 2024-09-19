import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './Contact.module.css';
import { FaUser } from 'react-icons/fa';
import { FaPhone } from 'react-icons/fa6';
import { deleteContact } from '../../redux/contactsOps';

function Contact({ data: { id, name, number } }) {	
	const dispatch = useDispatch();

	// Обработчик удаления контакта
	const handleDelete = () => {
		dispatch(deleteContact(id));
	};

	return (
		<div className={styles.card_block}>
			<div className={styles.content}>
				<div className={styles.descr}>
					<FaUser />
					<p>{name}</p>
				</div>
				<div className={styles.descr}>
					<FaPhone />
					<p>{number}</p>
				</div>
			</div>
			<button className={styles.btn} onClick={handleDelete}>
				Delete
			</button>
		</div>
	);
}

export default Contact;
