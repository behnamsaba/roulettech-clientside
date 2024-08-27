import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import NotFound from './NotFound';
import Register from './Register';
import Login from './Login';
import FoodList from './FoodList';
import FoodDetails from './FoodDetails';
import UnProtectedRoute from './UnprotectedRoute';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import LogOut from './LogOut';

const Roulettech = () => {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />

                    <Route
                        path='auth/register'
                        element={
                            <UnProtectedRoute>
                                <Register />
                            </UnProtectedRoute>
                        }
                    />

                    <Route
                        path='auth/login'
                        element={
                            <UnProtectedRoute>
                                <Login />
                            </UnProtectedRoute>
                        }
                    />

                    <Route
                        path='auth/profile'
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='auth/logout'
                        element={
                            <ProtectedRoute>
                                <LogOut />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/cuisines'
                        element={<FoodList />}
                    />
                    <Route
                        path='/cuisines/:handle'
                        element={<FoodDetails />}
                    />
                    <Route
                        path='*'
                        element={<NotFound />}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Roulettech;
