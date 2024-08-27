import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

const FoodList = () => {
    const { foods } = useContext(UserContext);

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold text-center my-6">All Chinese Foods</h1>
            <ul className="list-none">
                {foods.map((food) => (
                    <li key={food.id} className="mb-2">
                        <Link 
                            to={`/cuisines/${food.id}`}
                            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
                        >
                            {food.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FoodList;
