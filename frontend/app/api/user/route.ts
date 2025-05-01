import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  const response = await axios.get("http://localhost:3001/name");
  const data = await response.data;

  return NextResponse.json({
    name: data,
  });
}
