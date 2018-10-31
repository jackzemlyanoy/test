import PropTypes from 'prop-types';

const clientShape = PropTypes.shape({
    id: PropTypes.number,
    general: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
    }),
    job: PropTypes.shape({
        company: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    }),
    contact: PropTypes.shape({
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
    }),
    address: PropTypes.shape({
        street: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        zipCode: PropTypes.string.isRequired,
        country: PropTypes.string.isRequired,
    }),
});

export default clientShape;