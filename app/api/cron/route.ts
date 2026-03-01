import { NextResponse } from "next/server";
import { expireCheckins } from "@/lib/services/checkins";

export async function GET() {
  const processed = await expireCheckins(new Date());
  return NextResponse.json({ processed });
}
