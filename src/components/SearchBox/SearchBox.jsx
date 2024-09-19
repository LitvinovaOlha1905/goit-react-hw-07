import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilterValue } from '../../redux/filtersSlice';
import styles from './SearchBox.module.css';

function SearchBox() {
	const dispatch = useDispatch();
	const filterValue = useSelector(state => state.filter.filters);

	const handleFilter = event => {
		const value = event.target.value;
		dispatch(setFilterValue(value));
	};

	return (
		<div className={styles.content}>
			<p>Find contacts by name</p>
			<input type='text' value={filterValue} onChange={handleFilter} />
		</div>
	);
}

export default SearchBox;
