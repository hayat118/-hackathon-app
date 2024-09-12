import React, { useState } from "react";

const FilterBar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: "all",
    level: "all",
  });

  // Handle filter changes for status and level
  const handleFilterChange = (e) => {
    const { name, value } = e.target;

    // Update the  (status or level)
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    // Trigger filter update in parent component
    onFilterChange(updatedFilters.status, updatedFilters.level);
  };

  return (
    <div>
      <select
        className="filter"
        id="filterDropdown"
        name="status"
        value={filters.status}
        onChange={handleFilterChange}
      >
        <option value="all">Filter</option>
        <optgroup label="Status">
          <hr />
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </optgroup>

        <optgroup label="Level">
          <hr />
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </optgroup>
      </select>
    </div>
  );
};

export default FilterBar;
