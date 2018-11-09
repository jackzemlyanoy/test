import { fromJS } from 'immutable';
import UUID from 'uuid/v4';

import {
    CLIENTS_ADD_CLIENT,
    CLIENTS_UPDATE_EDITABLE_CLIENT,
    CLIENTS_RESET_EDITABLE_CLIENT,
    CLIENTS_SET_EDITABLE_CLIENT_BY_ID,
    CLIENTS_SET_VIEWABLE_CLIENT_BY_ID,
    CLIENTS_FETCH_LIST_SUCCESS,
    CLIENTS_UPDATE_SEARCH_QUERY,
    CLIENTS_UPDATE_CLIENT_BY_ID,
} from './actions';

const initialState = fromJS({
    list: [],
    editableClient: {
        general: {
            firstName: '',
            lastName: '',
            avatar: '',
        },
        job: {
            company: '',
            title: '',
        },
        contact: {
            email: '',
            phone: '',
        },
        address: {
            street: '',
            city: '',
            zipCode: '',
            country: '',
        }
    },
    currentViewableClientID: null,
    searchQuery: '',
});

export default (state = initialState, action) => {
    switch (action.type) {
        case CLIENTS_ADD_CLIENT: {
            return state.updateIn(['list'], list => list.push(fromJS(action.payload).set('id', UUID())));
        }
        case CLIENTS_UPDATE_EDITABLE_CLIENT: {
            return state.mergeIn(['editableClient'], fromJS(action.payload));
        }
        case CLIENTS_RESET_EDITABLE_CLIENT: {
            return state.set('editableClient', initialState.get('editableClient'));
        }
        case CLIENTS_SET_EDITABLE_CLIENT_BY_ID: {
            const editableClient = state
                .get('list')
                .findLast(client => client.get('id') === action.payload);

            return state.set('editableClient', editableClient);
        }
        case CLIENTS_SET_VIEWABLE_CLIENT_BY_ID: {
            return state.set('currentViewableClientID', action.payload);
        }
        case CLIENTS_FETCH_LIST_SUCCESS: {
            return state.set('list', fromJS(action.payload));
        }
        case CLIENTS_UPDATE_SEARCH_QUERY: {
            return state.set('searchQuery', action.payload);
        }
        case CLIENTS_UPDATE_CLIENT_BY_ID: {
            return state.updateIn(['list'], list =>
                list.map(client => {
                    if (client.get('id') === action.payload.id) {
                        return fromJS(action.payload);
                    }
                    return client;
                }),
            );
        }
        default: {
            return state;
        }
    }
};