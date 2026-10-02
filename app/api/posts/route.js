import { NextResponse } from "next/server";
import { getPosts } from "../../../lib/posts";

export async function GET() {
  try { return NextResponse.json(await getPosts()); }
  catch(e) { return NextResponse.json({error:e.message},{status:500}); }
}
