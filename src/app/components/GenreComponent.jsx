const GenreComponent = ({ genre }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            <h3 className="text-lg font-medium">{genre.name}</h3>
        </div>
    );
};

export default GenreComponent;