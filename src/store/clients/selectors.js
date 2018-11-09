import { createSelector } from 'reselect';

export const getClientsList = createSelector(
    state => state.clients.get('list'),
    clientsList => clientsList.toJS(),
);

export const getEditableClient = createSelector(
    state => state.clients.get('editableClient'),
    editableClient => editableClient.toJS(),
);

export const getCurrentViewableClientID = createSelector(
    state => state.clients.get('currentViewableClientID'),
    clientId => clientId,
);

export const getCurrentViewableClient = createSelector(
    getCurrentViewableClientID,
    state => state.clients.get('list'),
(clientId, clientsList) => {
        const foundClient = clientsList.findLast((client, i) => i.toString() === clientId);
        return foundClient && foundClient.toJS();
    },
);

export const getClientsSearchQuery = createSelector(
    state => state.clients,
    clientsState => clientsState.get('searchQuery'),
);

export const getFilteredClientsList = createSelector(
    getClientsSearchQuery,
    state => state.clients.get('list'),
    (searchQuery, clientsList) =>
        clientsList
            .filter(client =>
                client
                    .toString()
                    .toLowerCase()
                    .includes(searchQuery)
            )
            .toJS(),
);