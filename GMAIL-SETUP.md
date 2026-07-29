# Formulari → Gmail

Formulari dërgon mesazhe drejt **kurtiela63@gmail.com** përmes [FormSubmit](https://formsubmit.co/) — **nuk nevojitet** skedar `.env` për email-in.

## Aktivizimi (herën e parë — veçanërisht pas vendosjes online)

1. Hap faqen **në internet** (URL-ja e vërtetë e faqes, jo `localhost`).
2. Plotëso formularin në faqe dhe kliko **Dërgo**.
3. Hap **Gmail** (`kurtiela63@gmail.com`).
4. Kërko email nga **FormSubmit** me titull aktivizimi (edhe te **Spam**).
5. Kliko **linkun e konfirmimit**.

Pas kësaj, çdo mesazh i ri nga faqja vjen direkt në inbox.

Për hyrjen e pronarit dhe `VITE_OWNER_PASSWORD`, lexo **PRODUCTION-SETUP.md**.

## Ndryshimi i email-it

Ndrysho `email` në `src/config/site.js`, bëj deploy, pastaj përsërit aktivizimin nga faqja live.

## Probleme?

- Kontrollo folderin **Spam** në Gmail.
- Sigurohu që ke klikuar linkun e aktivizimit **pas** deploy-it të faqes live.
- Nëse dështon, shkruaj direkt: kurtiela63@gmail.com
