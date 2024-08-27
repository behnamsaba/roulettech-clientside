import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../UserContext';

const FoodDetails = () => {
    const { handle } = useParams();
    const { foods } = useContext(UserContext);
    
    const selectedFood = foods.find((food) => food.id === parseInt(handle));


    // Ensure selectedFood exists before destructuring
    if (!selectedFood) {
        return <div>Food not found</div>;
    }

    const { title, image } = selectedFood;

    return (
        <div>
            <h3>{title}</h3>
            {image && <img src={image} alt={`Image of ${title}`} style={{ width: '100%', height: 'auto' }} />}
        </div>
    );
};

export default FoodDetails;
