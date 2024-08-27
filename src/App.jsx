import Roulettech from './components/Roulettech';
import UserContext from './UserContext';
import { useState, useEffect } from 'react';
import Loading from './components/Loading';
import getFoods from './API/externalAPI';
import useLocalStorage from './hooks/useLocalStorage';
import RoulettechAPI from './API/djangoAPI';
import { jwtDecode } from "jwt-decode";





function App() {
    const [foods, setFoods] = useState(null);
    const [token, setToken] = useLocalStorage('roulettech-token', null);
    const [user, setUser] = useState(null);
    const [foodIds, setfoodIds] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);

    // Function to handle login.
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
    // Function to apply to a job.
    const addRecipe = async (id) => {
        if (hasSavedRecipe(id)) return;
        await RoulettechAPI.addRecipe(user.username, id);
        setfoodIds(new Set([...setfoodIds, id]));
    };

    // Effect to load user information.
    useEffect(() => {
        async function getCurrentUser() {
            if (token) {
                setIsLoading(true); // Set loading to true at the beginning of the condition
                try {
                    const { username } = jwtDecode(token);
                    RoulettechAPI.token = token;
                    const currentUser = await RoulettechAPI.getCurrentUser(username);
                    setUser(currentUser);
                    setfoodIds(new Set(currentUser.saved_recipes));
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
                console.error("Error fetching foods:", error);
                setIsLoading(false); // Ensure loading is set to false on error
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
        <UserContext.Provider value={{foods, login, register, logOut, addRecipe}}>
            <Roulettech />
        </UserContext.Provider>
    );
}

export default App;
