import './FavouritesList.css'

const FavouritesList = ({
  favourites,
  onRemoveFavourite,
  onClear,
  onDrop,
  onDragOver,
  onDropRemove
}) => {
  return (
    <aside className="favourites-panel" aria-labelledby="favourites-heading">
      <h2 id="favourites-heading">Favourite properties</h2>

      <div
        className="favourites-drop-area"
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <p>Drag a property card here or click favourite.</p>
      </div>

      {favourites.length === 0 ? (
        <p className="favourites-empty">No favourites yet.</p>
      ) : (
        <ul className="favourites-list">
          {favourites.map((p) => (
            <li key={p.id} className="favourites-item">
              <span>{p.type} - £{p.price.toLocaleString()}</span>
              <button type="button" onClick={() => onRemoveFavourite(p.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        className="favourites-clear-btn"
        onClick={onClear}
        disabled={favourites.length === 0}
      >
        Clear favourites
      </button>

      <div
        className="favourites-remove-drop"
        onDrop={onDropRemove}
        onDragOver={onDragOver}
      >
        <p>Drag here to remove from favourites</p>
      </div>
    </aside>
  )
}

export default FavouritesList