import { render, screen } from '@testing-library/react'
import SearchForm from '../components/SearchForm/SearchForm.jsx'
import { describe, it, expect } from 'vitest'

describe('SearchForm initial state', () => {
  it('uses "any" as default type', () => {
    render(
      <SearchForm
        onSearch={() => {}}
        initialCriteria={{
          type: 'any',
          minPrice: '',
          maxPrice: '',
          minBedrooms: '',
          maxBedrooms: '',
          dateFrom: '',
          dateTo: '',
          postcodeArea: ''
        }}
      />
    )
    const select = screen.getByLabelText(/type/i)
    expect(select.value).toBe('any')
  })
})
