import { BooksPage } from "@/components/books/books-page"
import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardPage() {
  return (
    <div className="h-screen bg-gradient-to-br from-background to-muted/10">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 md:ml-0 overflow-auto">
          <div className="p-6 md:p-8 pt-20 md:pt-8 max-w-full mx-auto">
            <BooksPage />
          </div>
        </main>
      </div>
    </div>
  )
}
