import { getPosts } from "../lib/posts";

export const dynamic = "force-dynamic";

function Product({ emoji, name, text }) {
  return (
    <div className="product-card">
      <div className="product-icon">{emoji}</div>
      <h3>{name}</h3>
      <p>{text}</p>
      <a className="small-btn" href="#contact">जानकारी लें →</a>
    </div>
  );
}

export default async function Home() {
  let posts = [];
  try { posts = await getPosts(); } catch {}

  return (
    <main>
      <div className="topbar">
        <span>📍 Bishanpura, Chapra, Bihar - 841211</span>
        <span>📞 +91 6201234567 &nbsp; | &nbsp; WhatsApp</span>
      </div>

      <header className="header">
        <a className="brand" href="#">
          <span className="brand-pot">🏺</span>
          <span><b>Vikash Vikash</b><small>Mitti Bartan</small></span>
        </a>
        <nav>
          <a href="#products">Products</a>
          <a href="#gallery">Gallery</a>
          <a href="#about">About</a>
          <a href="#posts">Posts</a>
          <a href="#contact">Contact</a>
          <a className="admin-link" href="/admin">Admin</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">TRADITIONAL • ECO FRIENDLY • 100% NATURAL</p>
          <h1>Vikash Vikash<br/><span>Mitti Bartan</span></h1>
          <h2>हर घर की रसोई में मिट्टी की खुशबू...</h2>
          <p>दीपावली, छठ पूजा, शादी-विवाह और रोजमर्रा के उपयोग के लिए मिट्टी के बर्तन।</p>
          <a className="cta" href="#products">हमारे उत्पाद देखें →</a>
        </div>
        <div className="hero-art">🏺<span>🍶</span><i>🪔</i></div>
      </section>

      <section id="products" className="section">
        <div className="section-title"><span>🌿</span><h2>हमारे उत्पाद</h2><span>🌿</span></div>
        <p className="center">हर त्योहार और हर जरूरत के लिए मिट्टी के बर्तन</p>
        <div className="products">
          <Product emoji="🏺" name="मटका / घड़ा" text="ठंडा पानी, सेहत के लिए अच्छा" />
          <Product emoji="🥤" name="कुल्हड़" text="चाय का असली स्वाद" />
          <Product emoji="🪔" name="दीया" text="पूजा और त्योहार के लिए" />
          <Product emoji="🍯" name="हांडी" text="पारंपरिक खाना, असली स्वाद" />
          <Product emoji="🍽️" name="थाली / कटोरी" text="रोजमर्रा के उपयोग के लिए" />
          <Product emoji="🪆" name="अन्य उत्पाद" text="मूर्तियां, गमले, सजावटी सामान" />
        </div>
      </section>

      <section id="gallery" className="gallery-section">
        <div className="section-title light"><h2>हमारी गैलरी</h2></div>
        <div className="gallery">
          {["🏺","🪔","🍶","🥣","🏺","🪴"].map((x,i)=><div className="gallery-item" key={i}>{x}</div>)}
        </div>
      </section>

      <section id="about" className="about section">
        <div className="about-photo">🏺<br/><small>Vikash Vikash<br/>Mitti Bartan</small></div>
        <div>
          <h2>हमारे बारे में</h2>
          <p>हम “Vikash Vikash Mitti Bartan” के नाम से मिट्टी के पारंपरिक बर्तनों और उत्पादों की जानकारी उपलब्ध कराते हैं। हमारा उद्देश्य प्राकृतिक और पारंपरिक मिट्टी के बर्तनों को अधिक लोगों तक पहुंचाना है।</p>
          <div className="features">
            <span>🌱<b>प्राकृतिक</b><small>मिट्टी से बने</small></span>
            <span>🛡️<b>गुणवत्ता</b><small>ध्यान से तैयार</small></span>
            <span>♻️<b>पर्यावरण</b><small>अनुकूल</small></span>
            <span>❤️<b>सेवा</b><small>हमारी प्राथमिकता</small></span>
          </div>
        </div>
      </section>

      <section id="posts" className="section posts-section">
        <div className="section-title"><span>📝</span><h2>हमारी पोस्ट / अपडेट</h2></div>
        <p className="center">नई फोटो, जानकारी और महत्वपूर्ण अपडेट</p>
        <div className="posts">
          {posts.length ? posts.map(post => (
            <article className="post-card" key={post.id}>
              <img src={post.image_url} alt={post.title || "Mitti Bartan"} />
              <div><small>{new Date(post.created_at).toLocaleDateString("hi-IN")}</small><h3>{post.title}</h3><p>{post.caption}</p></div>
            </article>
          )) : (
            <div className="empty-posts">अभी कोई नई पोस्ट नहीं है। Admin Panel से पहली पोस्ट जोड़ें।</div>
          )}
        </div>
      </section>

      <section id="contact" className="contact-strip">
        <div><h2>सीधा संपर्क करें</h2><p>किसी भी जानकारी या ऑर्डर के लिए WhatsApp पर संदेश करें।</p></div>
        <div className="contact-buttons">
          <a href="https://wa.me/916201234567" target="_blank">💬 WhatsApp पर बात करें</a>
          <a href="tel:+916201234567">📞 Call Now</a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">🏺 <b>Vikash Vikash</b><small>Mitti Bartan</small></div>
        <div>Home &nbsp; | &nbsp; Products &nbsp; | &nbsp; Gallery &nbsp; | &nbsp; Posts &nbsp; | &nbsp; Contact</div>
        <div>© 2026 Vikash Vikash Mitti Bartan</div>
      </footer>
    </main>
  );
}
