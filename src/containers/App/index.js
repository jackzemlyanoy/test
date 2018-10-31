import React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import * as clientsActions from '../../store/clients/actions';

// import ClientForm from '../ClientForm';
import ClientsList from '../ClientsList';
import ClientProfile from '../ClientProfile';
import ClientsSearchContainer from '../ClientsSearchContainer';

import './style.scss';


const enhance = compose(
    connect(
        null,
        clientsActions,
    ),
    lifecycle({
        componentDidMount() {
            const { fetchClientsList } = this.props;
            fetchClientsList();
        },
    }),
);

const App = () => (
    <div className="App">
        <div className="App-form">
            {/*<ClientForm />*/}
        </div>
        <div className="App-content">
            <div className="App-clientsList">
                <ClientsSearchContainer />
                <ClientsList />
            </div>
            <div className="App-clientsProfile">
                <ClientProfile />
            </div>
        </div>
    </div>
);

export default enhance(App);