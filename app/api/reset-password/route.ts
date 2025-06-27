import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { token, password } = await request.json();

  console.log(`Resetting password for token: ${token} with new password: ${password}`);

  // ✅ In real apps: Validate token, find user, update password in DB.

  return NextResponse.json({ message: "Password reset success" });
}
