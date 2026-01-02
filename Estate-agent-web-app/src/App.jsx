/* Main application component for the Estate Agent Web App */

import { useState, useMemo, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import propertiesData from './data/properties.json'
import SearchForm from './components/SearchForm/SearchForm.jsx'
import PropertyList from './components/PropertyList/PropertyList.jsx'
import FavouritesList from './components/FavouritesList/FavouritesList.jsx'
import PropertyPage from './pages/PropertyPage.jsx'
import './App.css'

function App() {
  // State: favourite properties selected by the user
  const [favourites, setFavourites] = useState([])
  // State: current search criteria for filtering properties
  const [searchCriteria, setSearchCriteria] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcodeArea: ''
  })

  const navigate = useNavigate()
  const allProperties = propertiesData.properties

  // Handle search form submission - update search criteria and navigate to main page
  const handleSearch = useCallback((criteria) => {
    setSearchCriteria(criteria)
    navigate('/')
  }, [navigate])

  // Filter properties based on current search criteria
  // Memoized to avoid recalculating on every render

  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      // Filter by property type
      if (searchCriteria.type !== 'any' && p.type.toLowerCase() !== searchCriteria.type.toLowerCase()) {
        return false
      }

      // Filter by price
      if (searchCriteria.minPrice !== '' && p.price < Number(searchCriteria.minPrice)) {
        return false
      }
      if (searchCriteria.maxPrice !== '' && p.price > Number(searchCriteria.maxPrice)) {
        return false
      }

      // Filter by number of bedrooms
      if (searchCriteria.minBedrooms !== '' && p.bedrooms < Number(searchCriteria.minBedrooms)) {
        return false
      }
      if (searchCriteria.maxBedrooms !== '' && p.bedrooms > Number(searchCriteria.maxBedrooms)) {
        return false
      }

      // Filter by date added
      const addedDate = new Date(`${p.added.year}-${p.added.month} ${p.added.day}`)
      if (searchCriteria.dateFrom) {
        const from = new Date(searchCriteria.dateFrom)
        if (addedDate < from) return false
      }
      if (searchCriteria.dateTo) {
        const to = new Date(searchCriteria.dateTo)
        if (addedDate > to) return false
      }

      // Filter by postcode area
      if (
        searchCriteria.postcodeArea &&
        !p.postcodeArea.toLowerCase().startsWith(searchCriteria.postcodeArea.toLowerCase())
      ) {
        return false
      }

      return true
    })
  }, [allProperties, searchCriteria])

  // Add a property to favourites

  const addToFavourites = useCallback((property) => {
    setFavourites((prev) => {
      if (prev.some((p) => p.id === property.id)) {
        return prev
      }
      return [...prev, property]
    })
  }, [])

  // Remove a property from favourites

  const removeFromFavourites = useCallback((propertyId) => {
    setFavourites((prev) => prev.filter((p) => p.id !== propertyId))
  }, [])

  // Clear all favourites

  const clearFavourites = useCallback(() => {
    setFavourites([])
  }, [])

  // Handle drag-and-drop to add to favourites

  const onDropToFavourites = useCallback((event) => {
    event.preventDefault()
    const propertyId = event.dataTransfer.getData('text/plain')
    const property = allProperties.find((p) => p.id === propertyId)
    if (property) {
      addToFavourites(property)
    }
  }, [allProperties, addToFavourites])

  // Allow drag over favourites list

  const onDragOverFavourites = (event) => {
    event.preventDefault()
  }

  // Handle drag-and-drop to remove from favourites

  const onDropRemoveFavourite = useCallback((event) => {
    event.preventDefault()
    const propertyId = event.dataTransfer.getData('text/plain')
    removeFromFavourites(propertyId)
  }, [removeFromFavourites])

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Estate Agent Property Search</h1>
      </header>

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="layout-main">
                <div>
                  <SearchForm onSearch={handleSearch} initialCriteria={searchCriteria} />
                  <PropertyList
                    properties={filteredProperties}
                    favourites={favourites}
                    onAddFavourite={addToFavourites}
                  />
                </div>
                <FavouritesList
                  favourites={favourites}
                  onRemoveFavourite={removeFromFavourites}
                  onClear={clearFavourites}
                  onDrop={onDropToFavourites}
                  onDragOver={onDragOverFavourites}
                  onDropRemove={onDropRemoveFavourite}
                />
              </div>
            }
          />
          {/* Property details page */}
          <Route
            path="/property/:id"
            element={
              <PropertyPage
                properties={allProperties}
                favourites={favourites}
                onAddFavourite={addToFavourites}
                onRemoveFavourite={removeFromFavourites}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer section */}

      <footer className="app-footer">
        <span>©Copyright. All rights reserved.</span>
      </footer>
    </div>
  )
}

export default App