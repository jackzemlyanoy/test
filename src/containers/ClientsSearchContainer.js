import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import Search from '../components/Search';
import * as clientsActions from '../store/clients/actions';
import { getClientsSearchQuery } from '../store/clients/selectors';

const enhance = compose(
    connect(
        state => ({
            searchQuery: getClientsSearchQuery(state),
        }),
        dispatch => ({
            onSearchSubmit: event => {
                event.preventDefault();
                dispatch(clientsActions.applyClientsSearch());
            },
            onSearchChange: ({ target }) => {
                dispatch(clientsActions.updateClientsSearchQuery(target.value));
            },
        }),
    ),
);

const ClientsSearchContainer = props => <Search {...props} />;

export default enhance(ClientsSearchContainer);