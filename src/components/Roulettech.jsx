import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import NotFound from './NotFound';
import Register from './Register';
import Login from './Login';
import FoodList from './FoodList';
import FoodDetails from './FoodDetails';
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
                        path='/auth/register'
                        element={<Register />}
                    />
                    <Route
                        path='/auth/login'
                        element={<Login />}
                    />
                    <Route
                        path='/cuisines'
                        element={<FoodList />}
                    />
                    <Route
                        path='/cuisines'
                        element={<FoodList />}
                    />
                    <Route
                        path='cuisines/:handle'
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
