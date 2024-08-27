import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import registerValidation from '../utils/registerValidation';
import UserContext from '../UserContext';
import { useContext } from 'react';

const FormField = ({ label, error, ...props }) => (
    <>
        <label htmlFor={props.id}>{label}</label>
        <input {...props} />
        {error ? <p>{error}</p> : null}
    </>
);

// Define propTypes for FormField component
FormField.propTypes = {
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    id: PropTypes.string.isRequired
};

// Default props for optional props
FormField.defaultProps = {
    error: ''
};

const Register = () => {
    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        onSubmit: values => {
            console.log(values)
            alert(JSON.stringify(values, null, 2));
            register(values)
        },
        registerValidation
    });

    const {register} = useContext(UserContext)

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
        </form>
    );
};

export default Register;
