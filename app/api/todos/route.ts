import prisma from "@/lib/prisma";
import { todoSchema } from "@/lib/zod";
import { Todo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(todos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

const delay: (t?: number) => Promise<unknown> = (t = 1000) =>
  new Promise((resolve) => {
    setTimeout(resolve, t);
  });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = todoSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          error: result.error.errors,
        },
        { status: 400 }
      );
    }
    const todoData = result.data;
    // await delay(3000);
    const newTodo = await prisma.todo.create({
      data: {
        title: todoData.title,
        description: todoData.description || "",
        completed: todoData.completed,
      },
    });
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error add todo:", error);
    return NextResponse.json(
      {
        message: "An un expected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "Todo ID is required" },
        { status: 400 }
      );
    }
    const deletedTodo = await prisma.todo.delete({
      where: { id },
    });
    if (!deletedTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleing todo: ", error);
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...rest } = body;
    const result = todoSchema.safeParse(rest);
    if (!result.success) {
      return NextResponse.json(
        { msssage: "Invalid input", errors: result.error.errors },
        { status: 400 }
      );
    }
    const todoData = result.data as Todo;
    if (!id) {
      return NextResponse.json(
        { message: "Todo ID is required" },
        { status: 400 }
      );
    }
    const updateTodo = await prisma.todo.update({
      where: { id },
      data: {
        title: todoData.title,
        description: todoData.description,
        completed: todoData.completed,
      },
    });
    if (!updateTodo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    // await delay(3000);

    return NextResponse.json(updateTodo, { status: 200 });
  } catch (error) {
    console.error("Error deleing todo: ", error);
    return NextResponse.json(
      {
        message: "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}
