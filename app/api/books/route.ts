import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-config"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const books = await prisma.book.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { title, author, description, genre, coverUrl, publishedYear, isbn, rating } = body

    if (!title || !author || !description || !genre) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        description,
        genre,
        coverUrl: coverUrl || null,
        publishedYear: publishedYear ? parseInt(publishedYear.toString()) : null,
        isbn: isbn || null,
        rating: rating ? parseFloat(rating.toString()) : null,
        userId: session.user.id,
      }
    })

    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
