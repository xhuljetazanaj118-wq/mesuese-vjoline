# Si ta ngarkosh në GitHub

Projekti është gati me **git commit** lokal. Mbetet ta krijosh repozitorin në GitHub dhe ta **push**-osh.

## Metoda 1 – Nga faqja e GitHub (më e lehtë)

1. Hyr në [github.com](https://github.com) dhe bëj login.
2. Kliko **+** → **New repository**.
3. Emri: p.sh. `mesuese-violine` (ose çfarë të duash).
4. Zgjidh **Public** ose **Private**.
5. **Mos** shto README / .gitignore (i kemi tashmë).
6. Kliko **Create repository**.

Pastaj në **PowerShell** (ndrysho `EMRI_YT` dhe URL-në me të dhënat e tua):

```powershell
cd C:\Users\User\Desktop\mesuese-violine\mesuese_vjoline

git remote add origin https://github.com/EMRI_YT/mesuese-violine.git
git branch -M main
git push -u origin main
```

GitHub do të kërkojë login (username + **Personal Access Token**, jo fjalëkalimin e vjetër).

### Si të marrësh token (herën e parë)

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** → **Tokens (classic)**.
2. **Generate new token** → zgjidh scope **repo**.
3. Kopjo token-in dhe përdore si fjalëkalim kur `git push` pyet për password.

---

## Metoda 2 – GitHub Desktop

1. Shkarko [GitHub Desktop](https://desktop.github.com/).
2. **File → Add local repository** → zgjidh folderin `mesuese_vjoline`.
3. **Publish repository** → zgjidh emrin dhe publiko.

---

## Pas push-it

- Kodi yt është në cloud.
- Mund ta lidhësh me **Netlify** ose **Vercel** për faqe live (Import from GitHub).

---

**Folderi i projektit:** `C:\Users\User\Desktop\mesuese-violine\mesuese_vjoline`
