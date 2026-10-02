import { NextResponse } from "next/server";
import { isAdmin } from "../../../../lib/auth";
import { supabaseAdmin } from "../../../../lib/supabase";

export const runtime = "nodejs";

export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({error:"Unauthorized"}, {status:401});
  const form = await req.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") return NextResponse.json({error:"No file"}, {status:400});
  if (!file.type.startsWith("image/")) return NextResponse.json({error:"Only images allowed"}, {status:400});
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({error:"Image must be under 8MB"}, {status:400});

  const ext = (file.name.split(".").pop() || "jpg").replace(/[^a-z0-9]/gi,"");
  const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabaseAdmin.storage.from("posts").upload(path, buffer, {
    contentType:file.type, upsert:false
  });
  if (error) return NextResponse.json({error:error.message}, {status:500});

  const { data } = supabaseAdmin.storage.from("posts").getPublicUrl(path);
  return NextResponse.json({url:data.publicUrl});
}
