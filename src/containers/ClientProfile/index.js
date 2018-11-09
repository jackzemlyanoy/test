import React from 'react';
import { branch, renderNothing, compose } from 'recompose';
import { connect } from 'react-redux';

import clientShape from '../../shapes/client';
import { getCurrentViewableClient } from '../../store/clients/selectors';

import './style.scss';

const enhance = compose(
    connect(store => ({
        client: getCurrentViewableClient(store),
    })),
    branch(({ client }) => typeof client === 'undefined', renderNothing),
);

const ClientProfile = ({ client: {  general, job  }}) => (
    <div className="ClientProfile">
        <img src={general.avatar} alt="" />
        <div className="ClientProfile-name">
            <strong>Client Name: { general.firstName } <br /> {general.lastName}</strong>
        </div>
    </div>
);

ClientProfile.propTypes = {
    client: clientShape.isRequired,
};

export default enhance(ClientProfile);