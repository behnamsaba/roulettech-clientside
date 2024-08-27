import * as Yup from 'yup';

// Enhanced validation schema
const validationSchema = Yup.object({
    username: Yup.string()
        .matches(/^[A-Za-z ']+$/, "Only letters, spaces, and ' are allowed")
        .min(2, 'Must be at least 2 characters')
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .matches(/^(?=.*[a-z])/, 'Must contain at least one lowercase letter')
        .matches(/^(?=.*[A-Z])/, 'Must contain at least one uppercase letter')
        .matches(/^(?=.*[0-9])/, 'Must contain at least one number')
        .matches(/^(?=.*[!@#$%^&*])/, 'Must contain at least one special character')
        .required('Required')
});

export default validationSchema;
