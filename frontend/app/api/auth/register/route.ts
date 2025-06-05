import { NextResponse } from "next/server";

// In a real application, this would be a database
let users = [
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
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      interests,
    } = await request.json();

    // Check if user already exists
    if (users.some((user) => user.email === email)) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Basic validation
    if (!firstName || !lastName || !email || !password || !role) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Password validation (minimum 6 characters)
    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: `${users.length + 1}`,
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      interests: interests || [],
    };

    // Add user to the "database"
    users.push(newUser);

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;

    // Generate a mock token (in a real app, use JWT or similar)
    const token = `mock-jwt-token-${Date.now()}`;

    // Return success response
    return NextResponse.json({
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
