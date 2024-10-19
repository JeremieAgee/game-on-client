const GenreComponent = ({ genre, onSelect }) => {
    return (
        <div 
            className="bg-gray-100 shadow-lg rounded-lg p-4 cursor-pointer hover:bg-gray-200" 
            onClick={() => onSelect(genre)} // Call onSelect with the genre data
        >
            <h3 className="text-lg font-medium">{genre.name}</h3>
        </div>
    );
};

export default GenreComponent;