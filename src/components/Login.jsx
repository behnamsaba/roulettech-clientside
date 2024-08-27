import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import loginValidation from '../utils/loginValidation';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useState } from 'react';

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

const Login = () => {
    const { login } = useContext(UserContext);
    const [serverError, setServerError] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: loginValidation,
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await login(values);
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
                label="Username"
                id="username"
                type="text"
                error={formik.touched.username && formik.errors.username}
                {...formik.getFieldProps('username')}
            />
            <FormField
                label="Password"
                id="password"
                type="password"
                error={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps('password')}
            />
            <button type="submit">Log In</button>
            {serverError && <p>{serverError}</p>}
            <p>Dont have an account? Create {<Link to='/auth/register'>here</Link>}!</p>
        </form>
    );
};

export default Login;