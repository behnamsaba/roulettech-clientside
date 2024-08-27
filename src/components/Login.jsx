import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import loginValidation from '../utils/loginValidation';


// Form field component
const FormField = ({ label, error, ...props }) => (
    <>
        <label htmlFor={props.id}>{label}</label>
        <input {...props} />
        {error ? <p>{error}</p> : null}
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

// Login component
const Login = () => {
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: values => {
            console.log(values)
            alert(JSON.stringify(values, null, 2));
        },
        loginValidation
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
                label="Password:"
                id="password"
                type="password"
                error={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps('password')}
            />
            <button type="submit">Log In</button>
        </form>
    );
};

export default Login;
