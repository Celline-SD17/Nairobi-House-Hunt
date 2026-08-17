function SearchBar({ searchTerm, onSearchChange }) {
    return (
        <div className="search-container">
            <h3>Search By Location: </h3>
            <input
            type="text"
            placeholder="Search by location, area, or property..."
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            />
        </div>
       
    );
}
export default SearchBar;