import { render, screen } from '@testing-library/react'
import TransactionForm from '@/components/forms/TransactionForm'

describe('TransactionForm', () => {
  const mockProps = {
    onSubmit: jest.fn(),
    onCancel: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders form fields correctly', () => {
    render(<TransactionForm {...mockProps} />)
    
    expect(screen.getByLabelText(/titre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/montant/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/catégorie/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
  })

  it('displays correct button text for new transaction', () => {
    render(<TransactionForm {...mockProps} />)
    
    expect(screen.getByRole('button', { name: /ajouter/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /annuler/i })).toBeInTheDocument()
  })

  it('displays correct button text for editing transaction', () => {
    const initialData = {
      id: '1',
      title: 'Test Transaction',
      amount: 100,
      type: 'EXPENSE',
      category: 'FOOD',
      date: '2023-10-01'
    }

    render(<TransactionForm {...mockProps} initialData={initialData} />)
    
    expect(screen.getByRole('button', { name: /modifier/i })).toBeInTheDocument()
  })
})