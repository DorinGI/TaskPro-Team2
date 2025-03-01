import React from 'react';

const ThemeDropdown = ({ onThemeChange }) => {
  const handleChange = event => {
    onThemeChange(event.target.value);
  };

  return (
    <div>
      <select onChange={handleChange}>
        <option value="Light">Light</option>
        <option value="Violet">Violet</option>
        <option value="Dark">Dark</option>
      </select>
    </div>
  );
};

export default ThemeDropdown;
