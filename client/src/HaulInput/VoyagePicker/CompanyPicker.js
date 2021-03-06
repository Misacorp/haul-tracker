import React from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

function CompanyPicker(props) {
  const { company } = props;

  return (
    <div>
      <RadioButtonGroup
        name="voyageCompany"
        defaultSelected={company}
        valueSelected={company}
        onChange={props.handleChange}
      >
        <RadioButton
          value="goldHoarders"
          label="Gold Hoarders"
        />
        <RadioButton
          value="orderOfSouls"
          label="Order of Souls"
        />
      </RadioButtonGroup>
    </div>
  );
}

CompanyPicker.propTypes = {
  company: PropTypes.string,
  handleChange: PropTypes.func,
};

CompanyPicker.defaultProps = {
  company: 'Gold Hoarders',
  handleChange: () => console.log('Company picked'),
};

export default CompanyPicker;
