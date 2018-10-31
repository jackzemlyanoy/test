import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as clientsActions from '../../store/clients/actions';
import { getEditableClient } from '../../store/clients/selectors';


class ClientForm extends PureComponent {
    static propTypes = {
        addClient: PropTypes.func.isRequired,
        updateEditableClient: PropTypes.func.isRequired,
        resetEditableClient: PropTypes.func.isRequired,
        updateClientById: PropTypes.func.isRequired,
        editableClient: PropTypes.shape({
            id: PropTypes.string,
            email: PropTypes.string.isRequired,
        }).isRequired,
    };

    handleChange = ({ target: { name, value } }) => {
        const { updateEditableClient } = this.props;

        updateEditableClient({
            [name]: value,
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { editableClient, addClient, resetEditableClient, updateClientById } = this.props;

        if (editableClient.id === null) {
            addClient(editableClient);
        } else {
            updateClientById(editableClient);
        }

        resetEditableClient();
    };

    render() {
        console.log('Render Client Form');

        const {
            editableClient: { email },
        } = this.props;
        return (
            <form action="/" className="ClientForm" onSubmit={this.handleSubmit}>
                <fieldset className="ClientForm-fieldSet">
                    <div className="ClientForm-field">
                        <label htmlFor="clientEmail">Email:</label>
                        <input
                            id="clientEmail"
                            type="email"
                            name="email"
                            value={email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </fieldset>
            </form>
        );
    }
}

const mapStateToProps = state => ({
    editableClient: getEditableClient(state),
});

export default connect(
    mapStateToProps,
    clientsActions,
)(ClientForm);