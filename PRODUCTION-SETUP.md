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

## Kontroll i shpejtë

| Problemi | Zgjidhja |
|----------|----------|
| Formulari thotë “dështoi” | Aktivizo FormSubmit nga faqja live; kontrollo Spam |
| Nuk shfaqet “Hyr si pronar” | Shto `VITE_OWNER_PASSWORD` te hosti dhe bëj redeploy |
| Hyr por nuk shfaqet Menaxho Media | Rifresko faqen; provo përsëri hyrjen |
| Mesazhet nuk vijnë | Konfirmo linkun FormSubmit; provo dërgim pas konfirmimit |

Për detaje të vjetra, shiko edhe `GMAIL-SETUP.md`.
