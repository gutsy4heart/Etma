import { NextResponse } from "next/server";
import { prisma } from "../../../../prisma/prisma-client";

export async function POST(req: Request) {
  try {
    const { title, description, status, priority, category, tags, dueDate, isCompleted } = await req.json();

    const active = await prisma.active.create({
      data: { 
        title, 
        description, 
        status: status || "active",
        priority: priority || "medium",
        category,
        tags,
        dueDate: dueDate ? new Date(dueDate) : null,
        isCompleted: isCompleted || false
      },
    });

    return NextResponse.json(active);
  } catch (error) {
    console.error("Error creating active:", error);
    return NextResponse.json({ error: 'Failed to create active item' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const activeItems = await prisma.active.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(activeItems);
  } catch (error) {
    console.error("Error fetching active items:", error);
    return NextResponse.json({ error: 'Failed to fetch active items' }, { status: 500 });
  }
}
