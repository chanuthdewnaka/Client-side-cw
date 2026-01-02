// Property card component to display individual property details
import { Link } from 'react-router-dom'
import './PropertyCard.css'

const PropertyCard = ({ property, isFavourite, onAddFavourite }) => {
  // Handle drag start event to set property ID in data transfer
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', property.id)
  }
  // Handle click on "Add to favourites" button

  const handleAddClick = () => {
    onAddFavourite(property)
  }

  return (
    <article
      className="property-card"
      draggable
      onDragStart={handleDragStart}
      aria-label={`Property ${property.shortDescription}`}
    >
      {/* Property image */}
      <div className="property-card-image-wrapper">
        <img
          src={property.picture}
          alt={property.shortDescription}
          className="property-card-image"
        />
      </div>
      {/* Property details */}
      <div className="property-card-body">
        <h3 className="property-card-title">{property.type} - £{property.price.toLocaleString()}</h3>
        <p className="property-card-location">{property.location}</p>
        <p className="property-card-meta">
          {property.bedrooms} bedrooms • {property.tenure}
        </p>
        <p className="property-card-description">{property.shortDescription}</p>

        {/* Action buttons */}
        <div className="property-card-actions">
          <Link to={`/property/${property.id}`} className="property-card-link">
            View details
          </Link>
          <button
            type="button"
            onClick={handleAddClick}
            disabled={isFavourite}
            aria-disabled={isFavourite}
          >
            {isFavourite ? 'In favourites' : '★ Favourite'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default PropertyCard