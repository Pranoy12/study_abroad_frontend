import { NextResponse } from "next/server";
import { sendResetEmail } from "@/app/lib/mailer";
import crypto from "crypto";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const resetToken = crypto.randomBytes(32).toString("hex");

  try {
    await sendResetEmail(email, resetToken);
    console.log(`Generated reset token for ${email}: ${resetToken}`);

    // ✅ For real apps: Save token + expiry against user in DB here.

    return NextResponse.json({ message: "Reset link sent" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
