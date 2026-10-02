import { NextResponse } from "next/server";
import { isAdmin } from "../../../../lib/auth";
import { supabaseAdmin } from "../../../../lib/supabase";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({error:"Unauthorized"}, {status:401});
  const {data,error}=await supabaseAdmin.from("posts").select("*").order("created_at",{ascending:false});
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json(data||[]);
}

export async function POST(req) {
  if (!(await isAdmin())) return NextResponse.json({error:"Unauthorized"}, {status:401});
  const body=await req.json();
  if(!body.title || !body.caption || !body.image_url) return NextResponse.json({error:"Missing fields"},{status:400});
  const {data,error}=await supabaseAdmin.from("posts").insert({
    title:body.title, caption:body.caption, image_url:body.image_url
  }).select().single();
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json(data);
}

export async function DELETE(req) {
  if (!(await isAdmin())) return NextResponse.json({error:"Unauthorized"}, {status:401});
  const id=new URL(req.url).searchParams.get("id");
  if(!id) return NextResponse.json({error:"Missing id"},{status:400});
  const {error}=await supabaseAdmin.from("posts").delete().eq("id",id);
  if(error) return NextResponse.json({error:error.message},{status:500});
  return NextResponse.json({ok:true});
}
