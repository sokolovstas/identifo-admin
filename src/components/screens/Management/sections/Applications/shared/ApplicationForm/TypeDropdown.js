import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from '~/components/shared/Input';
import Dropdown from '~/components/shared/Dropdown';

class TypeDropdown extends Component {
  constructor() {
    super();

    this.state = {
      options: [
        {
          title: 'Single Page Application (Web)',
          value: 'web',
        },
        {
          title: 'Android Client',
          value: 'android',
        },
        {
          title: 'iOS Client',
          value: 'ios',
        },
      ],
    };

    this.renderDropdownOption = this.renderDropdownOption.bind(this);
  }

  getDisplayValue(value) {
    const option = this.state.options.find(o => o.value === value);
    return option ? option.title : '';
  }

  renderDropdownOption(option, onClick) {
    const { selectedValue, onChange } = this.props;

    const handleClick = () => {
      onClick();
      onChange(option.value);
    };

    const className = classnames({
      'iap-db-dropdown__option': true,
      'iap-db-dropdown__option--active': selectedValue === option.value,
    });

    return (
      <button
        type="button"
        key={option.value}
        className={className}
        onClick={handleClick}
      >
        {option.title}
      </button>
    );
  }

  render() {
    const { options } = this.state;
    const { selectedValue, disabled } = this.props;

    return (
      <Dropdown>
        {({ open, close, isOpen }) => (
          <div className="iap-db-dropdown">
            <Input
              placeholder="Select database type"
              style={{ caretColor: 'transparent' }}
              value={this.getDisplayValue(selectedValue)}
              disabled={disabled}
              onFocus={open}
            />
            {isOpen && (
              <div className="iap-db-dropdown__options">
                {options.map(option => this.renderDropdownOption(option, close))}
              </div>
            )}
          </div>
        )}
      </Dropdown>
    );
  }
}

TypeDropdown.propTypes = {
  disabled: PropTypes.bool,
  selectedValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

TypeDropdown.defaultProps = {
  disabled: false,
};

export default TypeDropdown;
