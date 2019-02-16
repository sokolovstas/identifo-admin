import React from 'react';
import PropTypes from 'prop-types';
import ApplicationRow from './ApplicationRow';
import ApplicationHeader from './ApplicationHeader';

import './ApplicationList.css';

const datagrid = {
  icon: {
    title: 'Type',
    width: '36%',
  },
  clientId: {
    title: 'Client ID',
    width: '50%',
  },
  settings: {
    title: '',
    width: '14%',
  },
};

const renderRow = application => (
  <ApplicationRow
    key={application.id}
    data={application}
    config={datagrid}
  />
);

const ApplicationList = (props) => {
  const { applications, loading } = props;

  return (
    <div className="iap-applications-list">
      <ApplicationHeader config={datagrid} />
      <main>
        {!loading && applications.map(renderRow)}
      </main>
    </div>
  );
};

ApplicationList.propTypes = {
  applications: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  loading: PropTypes.bool,
};

ApplicationList.defaultProps = {
  loading: false,
};

export default ApplicationList;
