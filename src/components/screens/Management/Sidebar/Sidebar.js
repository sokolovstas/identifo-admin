import React, { Component } from 'react';
import Section from './Section';
import * as icons from '~/components/icons/sidebar';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      sections: [
        {
          title: 'Getting started',
          path: '/management',
          exact: true,
          Icon: icons.GettingStartedIcon,
        },
        {
          title: 'Users',
          path: '/management/users',
          Icon: icons.UsersIcon,
        },
        {
          title: 'Account',
          path: '/management/account',
          Icon: icons.AdminIcon,
        },
        {
          title: 'Storages',
          path: '/management/database',
          Icon: icons.DatabaseIcon,
        },
        {
          title: 'Applications',
          path: '/management/applications',
          Icon: icons.ApplicationsIcon,
        },
        {
          title: 'Login Types',
          path: '/management/settings',
          Icon: icons.LoginTypesIcon,
        },
        {
          title: 'External Services',
          path: '/management/email_integration',
          Icon: icons.ExternalServicesIcon,
        },
        {
          title: 'Multi-factor Auth',
          path: '/management/multi-factor_auth',
          Icon: icons.MultiFactorAuthIcon,
        },
        {
          title: 'Static Files',
          path: '/management/static',
          Icon: icons.StaticFilesIcon,
        },
        {
          title: 'Hosted Pages',
          path: '/management/hosted_pages',
          Icon: icons.HostedPagesIcon,
        },
      ],
    };
  }

  render() {
    const { sections } = this.state;

    return (
      <aside className="iap-management-sidebar">
        {sections.map(section => <Section key={section.title} {...section} />)}
      </aside>
    );
  }
}

export default Sidebar;
