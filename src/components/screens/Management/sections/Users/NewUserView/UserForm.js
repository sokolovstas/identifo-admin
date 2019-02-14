import React, { Component } from 'react';
import update from '@madappgang/update-by-path';
import PropTypes from 'prop-types';
import Input from '~/components/shared/Input';
import Field from '~/components/shared/Field';
import Button from '~/components/shared/Button';
import saveIcon from '~/assets/icons/save.svg';

import './UserForm.css';

class UserForm extends Component {
  constructor() {
    super();

    this.state = {
      fields: {
        name: '',
        email: '',
      },
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput({ target }) {
    this.setState(state => ({
      fields: update(state.fields, {
        [target.name]: target.value,
      }),
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const { fields } = this.state;

    this.props.onSubmit(fields);
  }

  render() {
    const { email, name } = this.state.fields;

    return (
      <form className="iap-users-form" onSubmit={this.handleSubmit}>
        <Field label="Name">
          <Input
            name="name"
            value={name}
            placeholder="Enter name"
            onChange={this.handleInput}
          />
        </Field>

        <Field label="Email">
          <Input
            name="email"
            value={email}
            placeholder="Enter email"
            onChange={this.handleInput}
          />
        </Field>

        <footer className="iap-users-form__footer">
          <Button icon={saveIcon} type="submit">
            Save User
          </Button>
          <Button transparent onClick={this.props.onCancel}>
            Cancel
          </Button>
        </footer>
      </form>
    );
  }
}

UserForm.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

UserForm.defaultProps = {
  onCancel: () => {},
  onSubmit: () => {},
};

export default UserForm;
