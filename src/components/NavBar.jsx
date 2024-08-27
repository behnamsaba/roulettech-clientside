import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const NavItem = ({ to, children }) => {
    const getNavLinkClass = ({ isActive }) => {
        let baseClasses = "text-gray-600 mx-2 md:mx-4 hover:text-orange-900 text-sm md:text-base";
        if (isActive) {
            baseClasses += " border-b-2 border-red-500 pb-1";
        }
        return baseClasses;
    };

    return (
        <NavLink
            className={getNavLinkClass}
            end={to === '/'}
            to={to}>
            {children}
        </NavLink>
    );
};

// Define prop types for NavItem
NavItem.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
};

const NavBar = () => {
    return (
        <nav className='flex flex-wrap justify-between items-center bg-orange-100 p-4 md:px-12'>
            <div className='flex justify-center w-full md:w-auto'>
                <img
                    src='src/assets/logo.png'
                    alt='kangacook'
                    className='w-20 md:w-32 h-auto'
                />
            </div>
            <div className='flex flex-wrap justify-around w-full md:w-auto mt-4 md:mt-0'>
                <NavItem to='/'>Home</NavItem>
                <NavItem to='/cuisines'>Cuisines</NavItem>                
                <NavItem to='/auth/register'>Register</NavItem>
                <NavItem to='/auth/login'>Login</NavItem>
            </div>
        </nav>
    );
};

export default NavBar;
