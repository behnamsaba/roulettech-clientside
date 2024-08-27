const Home = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Maximizing Your Ingredients and Tools for Authentic Asian Recipes
            </h1>
            <p className="text-lg text-gray-600 mb-6">
                Kangacook invites you to share your cooking ideas, explore recipes from all over the world, and enjoy the pleasure of cooking and sharing! Get a chance to win a $15 Amazon gift card! We are preparing our website, help us improve our service by answering a few questions!
            </p>
            <a
                href='mailto:info@kangacook.com'
                target='_blank'
                className='text-blue-500 hover:text-blue-700 transition-colors duration-300 font-semibold'
                rel='noopener noreferrer'>
                Contact Us
            </a>
        </div>
    );
};

export default Home;
