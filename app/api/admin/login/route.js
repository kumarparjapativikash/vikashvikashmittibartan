import { NextResponse } from "next/server";
import { makeSession, sessionCookieName } from "../../../../lib/auth";

export async function POST(req) {
  const { password } = await req.json();
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({error:"Invalid password"}, {status:401});
  }
  const res = NextResponse.json({ok:true});
  res.cookies.set(sessionCookieName, makeSession(), {
    httpOnly:true, secure:process.env.NODE_ENV==="production",
    sameSite:"lax", path:"/", maxAge:60*60*24*7
  });
  return res;
}
