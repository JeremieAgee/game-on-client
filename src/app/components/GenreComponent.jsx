const GenreComponent = ({ genre, onSelect }) => {
    return (
        <div 
            className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition" 
            onClick={onSelect}
            role="button"
            tabIndex="0"
            onKeyPress={(e) => e.key === 'Enter' && onSelect()}
        >
            <h3 className="text-lg font-bold">{genre.name}</h3>
            {/* Add more information if needed */}
        </div>
    );
};

export default GenreComponent;