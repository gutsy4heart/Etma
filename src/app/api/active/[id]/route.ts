import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const active = await prisma.active.findUnique({ where: { id } });
    
    if (!active) {
      return NextResponse.json({ error: 'Active item not found' }, { status: 404 });
    }
    
    return NextResponse.json(active);
  } catch (error) {
    console.error("Error fetching active item:", error);
    return NextResponse.json({ error: 'Failed to fetch active item' }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, status, priority, category, tags, dueDate, isCompleted } = await req.json();
    const id = parseInt(params.id);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid active item ID' }, { status: 400 });
    }

    const active = await prisma.active.update({
      where: { id },
      data: { 
        title, 
        description, 
        status, 
        priority, 
        category, 
        tags,
        dueDate: dueDate ? new Date(dueDate) : null,
        isCompleted
      },
    });
    
    return NextResponse.json(active);
  } catch (error) {
    console.error("Error updating active item:", error);
    return NextResponse.json({ error: 'Failed to update active item' }, { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid active item ID' }, { status: 400 });
    }

    await prisma.active.delete({
      where: { id },
    });
    
    return NextResponse.json({ message: 'Active item deleted successfully' });
  } catch (error) {
    console.error("Error deleting active item:", error);
    return NextResponse.json({ error: 'Failed to delete active item' }, { status: 404 });
  }
}
