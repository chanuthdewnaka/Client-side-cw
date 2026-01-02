import { render, screen } from '@testing-library/react'
import FavouritesList from '../components/FavouritesList/FavouritesList.jsx'
import { describe, it, expect } from 'vitest'

describe('FavouritesList', () => {
  it('shows empty message when no favourites', () => {
    render(
      <FavouritesList
        favourites={[]}
        onRemoveFavourite={() => {}}
        onClear={() => {}}
        onDrop={() => {}}
        onDragOver={() => {}}
        onDropRemove={() => {}}
      />
    )
    expect(screen.getByText(/no favourites yet/i)).toBeInTheDocument()
  })
})