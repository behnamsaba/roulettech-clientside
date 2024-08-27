import Roulettech from './components/Roulettech';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import getFoods from './API/externalAPI';
import useLocalStorage from './hooks/useLocalStorage';
import RoulettechAPI from './API/djangoAPI';
import { jwtDecode } from 'jwt-decode';

function App() {
    const [foods, setFoods] = useState(null);
    const [token, setToken] = useLocalStorage('roulettech-token', null);
    const [user, setUser] = useState(null);
    const [foodIds, setfoodIds] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);

    const login = async (data) => {
        const newToken = await RoulettechAPI.login(data);
        setToken(newToken);
    };

    const register = async (data) => {
        const newToken = await RoulettechAPI.signUp(data);
        setToken(newToken);
    };

    const logOut = () => {
        setUser(null);
        setToken(null);
        setfoodIds(new Set());
    };

    const hasSavedRecipe = (id) => foodIds.has(id);
    const addRecipe = async (id) => {
        if (hasSavedRecipe(id)) return;
        await RoulettechAPI.addRecipe(user.username, id);
        setfoodIds(new Set([...setfoodIds, id]));
    };

    // Effect to load user information.
    useEffect(() => {
        async function getCurrentUser() {
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const user_id = decoded.user_id;
                    RoulettechAPI.token = token;
                    const { username, saved_recipes } =
                        await RoulettechAPI.getCurrentUser(user_id);
                    setUser(username);
                    setfoodIds(new Set(saved_recipes));
                } catch (error) {
                    console.error(
                        'Error in token decoding or user fetching:',
                        error
                    );
                    setUser(null);
                }
            }
            setIsLoading(false); // Set loading to false only after all async operations
        }

        getCurrentUser();
    }, [token]);

    useEffect(() => {
        async function loadFoods() {
            try {
                const fetchedFoods = await getFoods();
                setFoods(fetchedFoods);
                console.log(fetchedFoods);
            } catch (error) {
                console.error('Error fetching foods:', error);
                setIsLoading(false);
            }
            setIsLoading(false);
        }

        loadFoods();
    }, []);

    if (isLoading) {
        return <Loading />;
    } else if (!foods) {
        return <div>Loading foods or error...</div>;
    }

    return (
        <UserContext.Provider
            value={{ foods, login, register, logOut, addRecipe, user, foodIds }}>
            <Roulettech />
        </UserContext.Provider>
    );
}

export default App;
