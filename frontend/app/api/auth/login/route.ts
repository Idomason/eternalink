import { NextResponse } from "next/server";

// Mock user database for demo purposes
const users = [
  {
    id: "1",
    firstName: "John",
    lastName: "Elder",
    email: "elder@example.com",
    password: "password123",
    role: "elder",
    interests: ["Reading", "History", "Gardening"],
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Care",
    email: "caregiver@example.com",
    password: "password123",
    role: "caregiver",
    interests: ["Health", "Cooking", "Music"],
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Volunteer",
    email: "volunteer@example.com",
    password: "password123",
    role: "volunteer",
    interests: ["Sports", "Technology", "Art"],
  },
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = users.find((u) => u.email === email);

    // Check if user exists and password matches
    if (!user || user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Create a user object without the password
    const { password: _, ...userWithoutPassword } = user;

    // Generate a mock token (in a real app, use JWT or similar)
    const token = `mock-jwt-token-${Date.now()}`;

    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
