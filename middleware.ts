  import { NextRequest, NextResponse } from "next/server";

  export default async function middleware(req: NextRequest) {
    // for future use
    return NextResponse.next();
  }