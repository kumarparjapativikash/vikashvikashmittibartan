"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [logged, setLogged] = useState(false);
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  async function load() {
    const r = await fetch("/api/admin/posts");
    if (r.ok) { setLogged(true); setPosts(await r.json()); }
  }
  useEffect(() => { load(); }, []);

  async function login(e) {
    e.preventDefault(); setStatus("Login हो रहा है...");
    const r = await fetch("/api/admin/login", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ password })
    });
    if (r.ok) { setLogged(true); setStatus(""); load(); }
    else setStatus("गलत password");
  }

  async function addPost(e) {
    e.preventDefault();
    if (!file) return setStatus("पहले फोटो चुनें।");
    setStatus("फोटो upload हो रही है...");
    const fd = new FormData(); fd.append("file", file);
    const up = await fetch("/api/admin/upload", {method:"POST", body:fd});
    const uj = await up.json();
    if (!up.ok) return setStatus(uj.error || "Upload failed");

    const r = await fetch("/api/admin/posts", {
      method:"POST", headers:{"Content-Type":"application/json"},
      body: JSON.stringify({title, caption, image_url:uj.url})
    });
    if (!r.ok) return setStatus("Post save नहीं हुई");
    setTitle(""); setCaption(""); setFile(null);
    document.getElementById("photo").value = "";
    setStatus("✅ Post publish हो गई!");
    load();
  }

  async function del(id) {
    if (!confirm("यह post delete करें?")) return;
    await fetch("/api/admin/posts?id="+id, {method:"DELETE"});
    load();
  }

  async function logout() {
    await fetch("/api/admin/logout", {method:"POST"});
    setLogged(false);
  }

  if (!logged) return (
    <main className="admin-page">
      <div className="login-box">
        <div className="admin-logo">🏺</div>
        <h1>Admin Panel</h1>
        <p>Vikash Vikash Mitti Bartan</p>
        <form onSubmit={login}>
          <label>Admin Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
          <button>Login →</button>
          <small>{status}</small>
        </form>
        <a href="/">← Website पर वापस जाएं</a>
      </div>
    </main>
  );

  return (
    <main className="admin-page">
      <div className="admin-wrap">
        <header className="admin-head">
          <div><b>🏺 Admin Panel</b><small>Vikash Vikash Mitti Bartan</small></div>
          <div><a href="/" target="_blank">Website ↗</a><button onClick={logout}>Logout</button></div>
        </header>

        <section className="admin-card">
          <h2>नई पोस्ट जोड़ें</h2>
          <p>फोटो + title + caption डालकर publish करें।</p>
          <form onSubmit={addPost}>
            <label>फोटो</label>
            <input id="photo" type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0])} required />
            <label>Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="जैसे: छठ पूजा के लिए मिट्टी के दीये" required />
            <label>Caption</label>
            <textarea value={caption} onChange={e=>setCaption(e.target.value)} placeholder="अपनी पोस्ट का caption लिखें..." rows="5" required />
            <button className="publish">📤 Publish Post</button>
            <span className="status">{status}</span>
          </form>
        </section>

        <section className="admin-card">
          <h2>Published Posts ({posts.length})</h2>
          <div className="admin-posts">
            {posts.map(p => <div className="admin-post" key={p.id}>
              <img src={p.image_url} alt="" />
              <div><b>{p.title}</b><p>{p.caption}</p></div>
              <button className="delete" onClick={()=>del(p.id)}>Delete</button>
            </div>)}
          </div>
        </section>
      </div>
    </main>
  );
}
