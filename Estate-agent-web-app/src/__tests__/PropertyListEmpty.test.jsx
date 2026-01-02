import { render, screen } from '@testing-library/react'
import PropertyList from '../components/PropertyList/PropertyList.jsx'
import { describe, it, expect } from 'vitest'

describe('PropertyList empty', () => {
  it('shows message when no properties', () => {
    render(
      <PropertyList
        properties={[]}
        favourites={[]}
        onAddFavourite={() => {}}
      />
    )
    expect(
      screen.getByText(/no properties match your search/i)
    ).toBeInTheDocument()
  })
})