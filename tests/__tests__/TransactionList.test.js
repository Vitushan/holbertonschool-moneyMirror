import { render, screen } from '@testing-library/react'
import TransactionList from '@/components/TransactionList'

const mockTransactions = [
  {
    id: '1',
    title: 'Groceries',
    description: 'Weekly shopping',
    amount: 85.50,
    type: 'EXPENSE',
    category: 'FOOD',
    date: '2023-10-01T00:00:00.000Z',
  },
  {
    id: '2',
    title: 'Salary',
    amount: 2500.00,
    type: 'INCOME',
    category: 'SALARY',
    date: '2023-10-01T00:00:00.000Z',
  },
]

describe('TransactionList', () => {
  const mockProps = {
    transactions: mockTransactions,
    isLoading: false,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  }

  it('renders transactions correctly', () => {
    render(<TransactionList {...mockProps} />)
    
    expect(screen.getByText('Groceries')).toBeInTheDocument()
    expect(screen.getByText('Salary')).toBeInTheDocument()
    expect(screen.getByText('-85.50 €')).toBeInTheDocument()
    expect(screen.getByText('+2500.00 €')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<TransactionList {...mockProps} isLoading={true} />)
    
    expect(screen.getByText(/chargement des transactions/i)).toBeInTheDocument()
  })

  it('shows empty state when no transactions', () => {
    render(<TransactionList {...mockProps} transactions={[]} />)
    
    expect(screen.getByText(/aucune transaction trouvée/i)).toBeInTheDocument()
  })

  it('displays transaction count', () => {
    render(<TransactionList {...mockProps} />)
    
    expect(screen.getByText(/dernières transactions \(2\)/i)).toBeInTheDocument()
  })
})