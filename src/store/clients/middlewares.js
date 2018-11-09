import { CLIENTS_FETCH_LIST, fetchClientsListSuccess, fetchClientsListError } from './actions';

export default store => next => action => {
    next(action);


    // http://www.json-generator.com/api/json/get/cvPPQvtyiG?indent=2

    if (action.type === CLIENTS_FETCH_LIST) {
        fetch('https://api.myjson.com/bins/enufa')
            .then(result => result.json())
            .then(clientsList => {
                next(fetchClientsListSuccess(clientsList));
            })
            .catch(error => {
                next(fetchClientsListError(error));
            });
    }
};