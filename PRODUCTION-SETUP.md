# Faqja online: Gmail + hyrja e pronarit

Pas vendosjes së faqes në internet (Netlify, Vercel, etj.), duhen **dy hapa** që mungojnë shpesh.

---

## 1. Mesazhet në Gmail (FormSubmit)

Formulari dërgon te **kurtiela63@gmail.com** përmes [FormSubmit](https://formsubmit.co/). Kodi është gati; duhet vetëm **aktivizimi për domenin e ri**.

### Çfarë të bësh

1. Hap faqen **live** (jo vetëm localhost).
2. Shko te **Kontakt**, plotëso formularin dhe kliko **Dërgo**.
3. Hyr në Gmail (**kurtiela63@gmail.com**).
4. Kërko email nga **FormSubmit** (edhe te **Spam**).
5. Kliko **linkun e konfirmimit**.

Pas kësaj, çdo mesazh i ri nga faqja vjen në inbox. FormSubmit e kërkon këtë **një herë për çdo email** dhe **herën e parë që dërgon nga domeni yt** (p.sh. `mesuese-violine.netlify.app`).

### Ndryshimi i email-it

Ndrysho `email` në `src/config/site.js`, bëj deploy përsëri, pastaj përsërit aktivizimin me formularin në faqen live.

---

## 2. Hyrja vetëm për pronarin (Menaxho Media)

Vizitorët **nuk** e shohin më butonin **Menaxho Media**. Vetëm ti, pas hyrjes:

1. Në fund të faqes kliko **Hyr si pronar**.
2. Shkruaj fjalëkalimin që ke vendosur te hosti.
3. Shko te **Galeria** — shfaqet **Menaxho Media**.

Sesioni zgjat **24 orë** në të njëjtin shfletues (derisa të klikosh **Dil (pronar)**).

### Si të vendosësh fjalëkalimin (obligative për prodhim)

Te **Netlify**:

1. Site settings → **Environment variables**
2. Shto: `VITE_OWNER_PASSWORD` = fjalëkalimi yt (i fortë)
3. **Trigger deploy** / ridërgimi i faqes

Te **Vercel**:

1. Project → **Settings** → **Environment Variables**
2. Shto `VITE_OWNER_PASSWORD` për Production
3. **Redeploy**

Lokal për testim: kopjo `.env.example` në `.env` dhe vendos të njëjtin emër variabli (`.env` nuk shkon në Git).

> **Shënim:** Në faqe statike, fjalëkalimi përdoret për të mbrojtur panelin nga vizitorët e rastit. Mos e ndaj me askënd; përdor fjalëkalim të fortë.

---

## 3. Media YouTube — të mbeten për të gjithë (Redis)

Më parë media ruhej vetëm në **shfletuesin tënd**; pas daljes / në telefon tjetër kthehej lista fillestare. Ishte edhe një gabim teknik: ruajtja e videos dhe audios mbishkruante njëra-tjetrën.

Tani **Ruaj Ndryshimet** ruan njëherësh video + audio, dhe (me Redis) **të gjithë vizitorët** e shohin të njëjtën galeri.

### Aktivizo Upstash Redis në Vercel (herën e parë)

1. [vercel.com](https://vercel.com) → projekti **mesuese-vjoline**.
2. **Storage** → **Create Database** → zgjidh **Upstash** / **Redis** (Marketplace).
3. Emër p.sh. `mesuese-media` → **Create** → **Connect** te ky projekt.
4. `git push` me kodin e ri → **Redeploy**.

(Vercel shton **`REDIS_URL`** ose `UPSTASH_REDIS_REST_URL` — të dyja funksionojnë. **Mos** ndiq udhëzimet për Next.js në panel; faqja jote është Vite.)

### Si ta përdorësh

1. **Hyr si pronar** → **Menaxho Media** → link YouTube → **Ruaj Ndryshimet** (duhet të mbyllë panelin pa mesazh portokalli).
2. **Dil (pronar)** ose hap faqen në dritare private — videot **duhet** të mbeten.
3. Testo edhe nga telefoni (pa hyrje).

Nëse shfaqet mesazh “vetëm në shfletues” / Redis, lidh Storage dhe redeploy.

---

## Kontroll i shpejtë

| Problemi | Zgjidhja |
|----------|----------|
| Formulari thotë “dështoi” | Aktivizo FormSubmit nga faqja live; kontrollo Spam |
| Nuk shfaqet “Hyr si pronar” | Shto `VITE_OWNER_PASSWORD` te hosti dhe bëj redeploy |
| Hyr por nuk shfaqet Menaxho Media | Rifresko faqen; provo përsëri hyrjen |
| Mesazhet nuk vijnë | Konfirmo linkun FormSubmit; provo dërgim pas konfirmimit |
| Media kthehet prapa | Lidh **Upstash Redis** + redeploy; ruaj përsëri nga Menaxho Media |

Për detaje të vjetra, shiko edhe `GMAIL-SETUP.md`.
