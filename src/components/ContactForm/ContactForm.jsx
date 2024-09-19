import React from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { ErrorMessage } from 'formik';
import styles from './ContactForm.module.css';
import { addContact } from '../../redux/contactsOps';

const ContactSchema = Yup.object().shape({
	username: Yup.string()
		.min(3, 'Too Short!')
		.max(50, 'Too Long!')
		.required('Required'),
	number: Yup.string()
		.matches(/^\d{3}-\d{2}-\d{2}$/, 'Number must be in the format 459-12-56')
		.required('Required'),
});

const initialValues = {
	username: '',
	number: '',
};

function ContactForm() {
	const dispatch = useDispatch();
	const nameId = nanoid();
	const numberId = nanoid();

	const handleSubmit = (values, actions) => {
		const newContact = {
			id: nanoid(),
			name: values.username,
			number: values.number,
		};
		dispatch(addContact(newContact));
		actions.resetForm();
	};

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={handleSubmit}
			validationSchema={ContactSchema}
		>
			{() => (
				<Form className={styles.form_block}>
					<label htmlFor={nameId}>Name</label>
					<Field
						className={styles.input}
						type='text'
						name='username'
						id={nameId}
					/>
					<ErrorMessage
						name='username'
						component='span'
						className={styles.error}
					/>

					<label htmlFor={numberId}>Number</label>
					<Field
						className={styles.input}
						type='text'
						name='number'
						id={numberId}
					/>
					<ErrorMessage
						name='number'
						component='span'
						className={styles.error}
					/>

					<button className={styles.btn} type='submit'>
						Add Contact
					</button>
				</Form>
			)}
		</Formik>
	);
}

export default ContactForm;
