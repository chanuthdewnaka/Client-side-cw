// Property page component to display detailed information about a property
import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import './PropertyPage.css'

// Define tab constants
const TABS = {
  DESCRIPTION: 'DESCRIPTION',
  FLOORPLAN: 'FLOORPLAN',
  MAP: 'MAP'
}

const PropertyPage = ({ properties, favourites, onAddFavourite, onRemoveFavourite }) => {
  // Get property ID from URL parameters
  const { id } = useParams()

  // Find the property by ID
  const property = useMemo(
    () => properties.find((p) => p.id === id),
    [properties, id]
  )
  // State: active image index for gallery and active tab

  const [activeImageIndex, setActiveImageIndex] = useState(0)

  // State: active tab
  const [activeTab, setActiveTab] = useState(TABS.DESCRIPTION)

  // Handle case when property not found

  if (!property) {
    return (
      <div>
        <p>Property not found.</p>
        <Link to="/">Back to search</Link>
      </div>
    )
  }
  // Check if property is in favourites

  const isFavourite = favourites.some((p) => p.id === property.id)

  // Handlers for adding/removing favourites

  const handleAddFavourite = () => onAddFavourite(property)
  const handleRemoveFavourite = () => onRemoveFavourite(property.id)

  // Handle thumbnail click to change active image

  const handleThumbnailClick = (index) => setActiveImageIndex(index)

  // Determine main image to display

  const mainImage = property.images && property.images.length > 0
    ? property.images[activeImageIndex]
    : property.picture

  return (
    <section className="property-page">
      {/* Property header with basic info and favourite actions */}
      <header className="property-page-header">
        <Link to="/" className="back-link">← Back to search</Link>
        <h2>{property.type} - £{property.price.toLocaleString()}</h2>
        <p className="property-page-location">{property.location}</p>
        <p className="property-page-meta">
          {property.bedrooms} bedrooms • {property.tenure}
        </p>
        <div className="property-page-fav-actions">
          {!isFavourite ? (
            <button type="button" onClick={handleAddFavourite}>
              ★ Add to favourites
            </button>
          ) : (
            <button type="button" onClick={handleRemoveFavourite}>
              Remove from favourites
            </button>
          )}
        </div>
      </header>
      {/* Property gallery and tabbed content */}

      <div className="property-page-layout">
        {/* Image gallery */}
        <div className="property-page-gallery">
          {/* Main image */}
          <div className="property-page-main-image">
            <img src={mainImage} alt={property.shortDescription} />
          </div>

          {/* Thumbnails */}
          <div className="property-page-thumbnails">
            {(property.images || []).map((img, index) => (
              <button
                key={img}
                type="button"
                className={`thumbnail-btn ${index === activeImageIndex ? 'active' : ''}`}
                onClick={() => handleThumbnailClick(index)}
              >
                <img src={img} alt={`${property.type} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Tabbed content */}

        <div className="property-page-tabs">
          {/* Tabs navigation */}
          <div className="tabs-header" role="tablist">
            <button
              type="button"
              className={activeTab === TABS.DESCRIPTION ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(TABS.DESCRIPTION)}
              role="tab"
              aria-selected={activeTab === TABS.DESCRIPTION}
            >
              Description
            </button>
            <button
              type="button"
              className={activeTab === TABS.FLOORPLAN ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(TABS.FLOORPLAN)}
              role="tab"
              aria-selected={activeTab === TABS.FLOORPLAN}
            >
              Floor plan
            </button>
            <button
              type="button"
              className={activeTab === TABS.MAP ? 'tab active' : 'tab'}
              onClick={() => setActiveTab(TABS.MAP)}
              role="tab"
              aria-selected={activeTab === TABS.MAP}
            >
              Map
            </button>
          </div>

          {/* Tabs body */}

          <div className="tabs-body">
            {/* Description tab */}
            {activeTab === TABS.DESCRIPTION && (
              <div className="tab-panel">
                <h3>Full description</h3>
                <p>{property.longDescription}</p>
              </div>
            )}

            {/* Floor plan tab */}

            {activeTab === TABS.FLOORPLAN && (
              <div className="tab-panel">
                <h3>Floor plan</h3>
                {property.floorPlans && property.floorPlans.length > 0 ? (
                  <div className="floorplan-images">
                    {property.floorPlans.map((plan) => (
                      <img
                        key={plan}
                        src={plan}
                        alt="Floor plan"
                        className="floorplan-image"
                      />
                    ))}
                  </div>
                ) : (
                  <p>No floor plan available.</p>
                )}
              </div>
            )}
            
            {/* Map tab */}

            {activeTab === TABS.MAP && (
              <div className="tab-panel">
                <h3>Location map</h3>
                <div className="map-container">
                  <iframe
                    title="Property location"
                    src={property.mapEmbedUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyPage