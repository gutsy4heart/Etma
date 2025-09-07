import { NextResponse } from "next/server";
import { prisma } from "../../../../../prisma/prisma-client";

export async function POST() {
  try {
    // Create sample active items
    const sampleActiveItems = [
      {
        title: "Complete Project Documentation",
        description: "Write comprehensive documentation for the new API endpoints and user interface components.",
        status: "active",
        priority: "high",
        category: "Development",
        tags: "documentation,api,frontend",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        isCompleted: false,
      },
      {
        title: "Review Code Quality",
        description: "Conduct code review for the latest feature implementations and suggest improvements.",
        status: "pending",
        priority: "medium",
        category: "Code Review",
        tags: "code-review,quality,improvements",
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        isCompleted: false,
      },
      {
        title: "Update User Interface",
        description: "Implement responsive design improvements and accessibility features.",
        status: "active",
        priority: "medium",
        category: "UI/UX",
        tags: "ui,responsive,accessibility",
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        isCompleted: false,
      },
      {
        title: "Database Optimization",
        description: "Optimize database queries and add necessary indexes for better performance.",
        status: "completed",
        priority: "high",
        category: "Backend",
        tags: "database,optimization,performance",
        dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isCompleted: true,
      },
      {
        title: "Security Audit",
        description: "Conduct security audit of the application and fix any vulnerabilities.",
        status: "active",
        priority: "urgent",
        category: "Security",
        tags: "security,audit,vulnerabilities",
        dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
        isCompleted: false,
      },
      {
        title: "Team Meeting Preparation",
        description: "Prepare agenda and materials for the weekly team meeting.",
        status: "inactive",
        priority: "low",
        category: "Administration",
        tags: "meeting,agenda,preparation",
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        isCompleted: false,
      },
    ];

    // Clear existing active items
    await prisma.active.deleteMany();

    // Create new active items
    const createdItems = await prisma.active.createMany({
      data: sampleActiveItems,
    });

    return NextResponse.json({
      message: "Sample active items created successfully",
      count: createdItems.count,
    });
  } catch (error) {
    console.error("Error seeding active items:", error);
    return NextResponse.json(
      { error: "Failed to seed active items" },
      { status: 500 }
    );
  }
}
