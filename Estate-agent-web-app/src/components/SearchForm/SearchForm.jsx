import { useState, useEffect } from 'react'
import './SearchForm.css'

const SearchForm = ({ onSearch, initialCriteria }) => {
  const [formState, setFormState] = useState(initialCriteria)

  useEffect(() => {
    setFormState(initialCriteria)
  }, [initialCriteria])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormState((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(formState)
  }

  const handleReset = () => {
    const reset = {
      type: 'any',
      minPrice: '',
      maxPrice: '',
      minBedrooms: '',
      maxBedrooms: '',
      dateFrom: '',
      dateTo: '',
      postcodeArea: ''
    }
    setFormState(reset)
    onSearch(reset)
  }

  return (
    <section className="search-form-section" aria-labelledby="search-heading">
      <h2 id="search-heading">Search properties</h2>
      <form className="search-form" onSubmit={handleSubmit}>
        <fieldset className="search-fieldset">
          <legend>Property type</legend>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={formState.type}
            onChange={handleChange}
          >
            <option value="any">Any</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </fieldset>

        <fieldset className="search-fieldset">
          <legend>Price range (£)</legend>
          <div className="field-row">
            <div className="field-item">
              <label htmlFor="minPrice">Min price</label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                min="0"
                step="5000"
                value={formState.minPrice}
                onChange={handleChange}
              />
            </div>
            <div className="field-item">
              <label htmlFor="maxPrice">Max price</label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                min="0"
                step="5000"
                value={formState.maxPrice}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="search-fieldset">
          <legend>Bedrooms</legend>
          <div className="field-row">
            <div className="field-item">
              <label htmlFor="minBedrooms">Min</label>
              <input
                type="number"
                id="minBedrooms"
                name="minBedrooms"
                min="0"
                value={formState.minBedrooms}
                onChange={handleChange}
              />
            </div>
            <div className="field-item">
              <label htmlFor="maxBedrooms">Max</label>
              <input
                type="number"
                id="maxBedrooms"
                name="maxBedrooms"
                min="0"
                value={formState.maxBedrooms}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="search-fieldset">
          <legend>Date added</legend>
          <div className="field-row">
            <div className="field-item">
              <label htmlFor="dateFrom">From</label>
              <input
                type="date"
                id="dateFrom"
                name="dateFrom"
                value={formState.dateFrom}
                onChange={handleChange}
              />
            </div>
            <div className="field-item">
              <label htmlFor="dateTo">To</label>
              <input
                type="date"
                id="dateTo"
                name="dateTo"
                value={formState.dateTo}
                onChange={handleChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="search-fieldset">
          <legend>Location</legend>
          <label htmlFor="postcodeArea">Postcode area (e.g. BR1, BR6)</label>
          <input
            type="text"
            id="postcodeArea"
            name="postcodeArea"
            value={formState.postcodeArea}
            onChange={handleChange}
            placeholder="Enter first part of postcode"
          />
        </fieldset>

        <div className="search-actions">
          <button type="submit">Search</button>
          <button type="button" onClick={handleReset} className="secondary">
            Clear
          </button>
        </div>
      </form>
    </section>
  )
}

export default SearchForm