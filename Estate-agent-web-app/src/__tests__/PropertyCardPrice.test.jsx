import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard/PropertyCard.jsx'
import { describe, it, expect } from 'vitest'

describe('PropertyCard', () => {
  it('displays property price', () => {
    const property = {
      id: 'test1',
      type: 'House',
      bedrooms: 3,
      price: 500000,
      tenure: 'Freehold',
      shortDescription: 'Test house',
      location: 'Test street',
      picture: '/images/test.jpg'
    }

    render(
      <BrowserRouter>
        <PropertyCard
          property={property}
          isFavourite={false}
          onAddFavourite={() => {}}
        />
      </BrowserRouter>
    )

    expect(screen.getByText(/£500,000/)).toBeInTheDocument()
  })
})