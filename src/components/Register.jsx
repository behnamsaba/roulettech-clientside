import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import registerValidation from '../utils/registerValidation';
import { useContext, useState } from 'react';
import UserContext from '../UserContext';

const FormField = ({ label, error, ...props }) => (
    <>
        <label htmlFor={props.id}>{label}</label>
        <input {...props} />
        {error && <p>{error}</p>}
    </>
);

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    id: PropTypes.string.isRequired
};

FormField.defaultProps = {
    error: ''
};

const Register = () => {
    const { register } = useContext(UserContext);
    const [serverError, setServerError] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: ''
        },
        validationSchema: registerValidation,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await register(values);
                setSubmitting(false);
            } catch (error) {
                setServerError(error.response?.data?.error || 'An unexpected error occurred');
                setSubmitting(false);
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <FormField
                label="Username:"
                id="username"
                type="text"
                error={formik.touched.username && formik.errors.username}
                {...formik.getFieldProps('username')}
            />
            <FormField
                label="Email:"
                id="email"
                type="email"
                error={formik.touched.email && formik.errors.email}
                {...formik.getFieldProps('email')}
            />
            <FormField
                label="Password:"
                id="password"
                type="password"
                error={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps('password')}
            />
            <button type="submit">Enter!</button>
            {serverError && <p>{serverError}</p>}
        </form>
    );
};

export default Register;
