import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  alterApplication,
  deleteApplicationById,
  fetchApplicationById,
  resetApplicationError,
} from '~/modules/applications/actions';
import { compose } from '~/utils/fn';
import ApplicationForm from '../shared/ApplicationForm';
import ActionsButton from '~/components/shared/ActionsButton';

const goBackPath = '/management/applications';

class EditApplicationView extends Component {
  constructor(props) {
    super();

    this.state = {};

    this.availableActions = [{
      title: 'Delete Application',
      onClick: () => props.deleteApplicationById(props.id),
    }];

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.props.fetchApplicationById(this.props.id);
  }

  componentDidUpdate(prevProps) {
    if (!this.props.saving && prevProps.saving) {
      this.goBack();
    }
  }

  handleSubmit(changes) {
    const { id } = this.props;

    this.props.alterApplication(id, changes);
  }

  handleCancel() {
    this.props.resetError();
    this.goBack();
  }

  goBack() {
    this.props.history.push(goBackPath);
  }

  render() {
    const { id, saving, fetching, application, error } = this.props;

    return (
      <section className="iap-management-section">
        <header>
          <div>
            <Link to={goBackPath} className="iap-management-section__back">
              ← &nbsp;Applications
            </Link>
          </div>
          <div className="iap-management-section__title">
            Application Details
            <ActionsButton loading={saving} actions={this.availableActions} />
          </div>
          <p className="iap-management-section__description">
            <span className="iap-section-description__id">
              id:&nbsp;
              {id}
            </span>
          </p>
        </header>
        <main>
          <ApplicationForm
            error={error}
            loading={saving || fetching}
            application={application}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit}
          />
        </main>
      </section>
    );
  }
}

EditApplicationView.propTypes = {
  saving: PropTypes.bool,
  fetching: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  alterApplication: PropTypes.func.isRequired,
  deleteApplicationById: PropTypes.func.isRequired,
  fetchApplicationById: PropTypes.func.isRequired,
  resetError: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  application: PropTypes.shape(),
  error: PropTypes.instanceOf(Error),
};

EditApplicationView.defaultProps = {
  saving: false,
  fetching: false,
  application: null,
  error: null,
};

const mapStateToProps = (state, props) => ({
  id: props.match.params.appid,
  fetching: state.selectedApplication.fetching,
  saving: state.selectedApplication.saving,
  application: state.selectedApplication.application,
  error: state.selectedApplication.error,
});

const actions = {
  alterApplication,
  deleteApplicationById,
  fetchApplicationById,
  resetError: resetApplicationError,
};

export default compose(
  withRouter,
  connect(mapStateToProps, actions),
)(EditApplicationView);
