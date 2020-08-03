import React from 'react';

const Select = ({selected, options, handleChange}) => (
    <select id="select-country" value={selected} onChange={handleChange}>
        {
            options.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
            ))
        }
    </select>
)

export default Select;
