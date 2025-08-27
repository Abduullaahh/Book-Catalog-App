interface ResultsCountProps {
  count: number
  searchTerm?: string
  itemName?: string
  className?: string
}

export function ResultsCount({ 
  count, 
  searchTerm, 
  itemName = "item", 
  className = "" 
}: ResultsCountProps) {
  const pluralItemName = count !== 1 ? `${itemName}s` : itemName
  
  return (
    <div className={`text-sm text-muted-foreground ${className}`}>
      {count} {pluralItemName} found
      {searchTerm && ` for "${searchTerm}"`}
    </div>
  )
}
