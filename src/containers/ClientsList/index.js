import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import * as clientsActions from '../../store/clients/actions';
import { getFilteredClientsList, getCurrentViewableClientID } from '../../store/clients/selectors';
import clientShape from '../../shapes/client';

import './style.scss';

class ClientsList extends Component {
    static propTypes = {
        setEditableClientById: PropTypes.func.isRequired,
        setViewableClientById: PropTypes.func.isRequired,
        clientsList: PropTypes.arrayOf(clientShape).isRequired,
        currentViewableClientID: PropTypes.string,
    };

    static defaultProps = {
        currentViewableClientID: null,
    };

    handleEditClick = event => {
        event.stopPropagation();

        const { target } = event;
        const { setEditableClientById } = this.props;

        setEditableClientById(target.dataset.clientId);
    };

    handleShowClick = ({ target }) => {
        const { setViewableClientById } = this.props;

        setViewableClientById(target.dataset.clientId);
    };


    render() {
        const { clientsList, currentViewableClientID } = this.props;

        return (
            <ul className="ClientsList">
                {clientsList.map(({ general, job }, i) => {

                    const listItemClassName = classNames('ClientsList-item', {
                        isActive: i.toString() === currentViewableClientID,
                    });

                    return (
                        <li
                            className={listItemClassName}
                            key={i}
                            data-client-id={i}
                            onClick={this.handleShowClick}
                        >
                            <div className="ClientsList-item-container">
                                <img src={general.avatar} alt="" />
                                <div className="ClientsList-item-info">
                                    <strong>Client Name: { general.firstName } {general.lastName}</strong> <br />
                                    <b>Client Post: { job.title }</b>
                                </div>
                            </div>

                            <button type="button" data-client-id={i} onClick={this.handleEditClick}>
                                Edit
                            </button>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

const mapStateToProps = state => ({
    clientsList: getFilteredClientsList(state),
    currentViewableClientID: getCurrentViewableClientID(state),
});

export default connect(
    mapStateToProps,
    clientsActions,
)(ClientsList);