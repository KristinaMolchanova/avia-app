import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/ticketsSlice';
import { DEFAULT_MESSAGES } from '../messages/messages';
import './../styles/Filter.scss';

const Filter: React.FC = () => {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState<number[]>([]);

  const handleFilterChange = (value: number) => {
    let newFilters: number[];
    if (value === -1) {
      newFilters = [];
    } else {
      newFilters = selectedFilters.includes(value)
        ? selectedFilters.filter((filter) => filter !== value)
        : [...selectedFilters, value];
    }

    setSelectedFilters(newFilters);
    dispatch(setFilters(newFilters));
  };

  return (
    <div className="filter">
      <h3>{DEFAULT_MESSAGES.NUMBER_OF_TRANSFERS}</h3>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={selectedFilters.length === 0}
          onChange={() => handleFilterChange(-1)}
        />
        <span className="checkmark"></span>
        {DEFAULT_MESSAGES.ALL}
      </label>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={selectedFilters.includes(0)}
          onChange={() => handleFilterChange(0)}
        />
        <span className="checkmark"></span>
        {DEFAULT_MESSAGES.WITHOUT_TRANSFERS}
      </label>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={selectedFilters.includes(1)}
          onChange={() => handleFilterChange(1)}
        />
        <span className="checkmark"></span>1 {DEFAULT_MESSAGES.TRANSFER}
      </label>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={selectedFilters.includes(2)}
          onChange={() => handleFilterChange(2)}
        />
        <span className="checkmark"></span>2 {DEFAULT_MESSAGES.TRANSFERS}
      </label>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={selectedFilters.includes(3)}
          onChange={() => handleFilterChange(3)}
        />
        <span className="checkmark"></span>3 {DEFAULT_MESSAGES.TRANSFERS}
      </label>
    </div>
  );
};

export default Filter;
