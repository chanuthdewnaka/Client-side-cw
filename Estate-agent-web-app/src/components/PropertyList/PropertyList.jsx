// Propert list component to display a list of properties
import PropertyCard from '../PropertyCard/PropertyCard.jsx'
import './PropertyList.css'

const PropertyList = ({ properties, favourites, onAddFavourite }) => {
  return (
    <section className="property-list-section" aria-labelledby="results-heading">
      <h2 id="results-heading">Search results</h2>
      {/* Show message if no properties found */}
      {properties.length === 0 ? (
        <p>No properties match your search.</p>
      ) : (
        /* Display grid of property cards */
        <div className="property-list-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              isFavourite={favourites.some((p) => p.id === property.id)}
              onAddFavourite={onAddFavourite}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default PropertyList