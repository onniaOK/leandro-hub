# LEANDRO MOCCHEGIANI — INNOVATION HUB
## Deploy Guide → www.leandromocchegiani.com
## Backend: Google Gemini 2.0 Flash (FREE tier)

---

## ESTRUCTURA DEL PROYECTO

```
leandro-hub/
├── public/
│   └── index.html        ← Frontend completo
├── api/
│   └── chat.js           ← Vercel Function (GEMINI_API_KEY vive acá)
├── vercel.json           ← Configuración de routing
└── README.md
```

---

## PASO 1 — Conseguí tu Gemini API Key (GRATIS)

1. Abrí **aistudio.google.com**
2. Click en **Get API Key → Create API Key**
3. Copiala — la vas a usar en el Paso 3

> Free tier: 1,500 requests/día · 1M tokens/minuto — más que suficiente

---

## PASO 2 — Subir a GitHub

```bash
cd leandro-hub
git init
git add .
git commit -m "ONNIA Innovation Hub - Gemini 2.0 Flash"
git remote add origin https://github.com/TU_USUARIO/leandro-hub.git
git push -u origin main
```

---

## PASO 3 — Deploy en Vercel

1. Entrá a **vercel.com** → "Add New Project"
2. Importá el repo de GitHub
3. Click **Deploy** (~30 segundos)

---

## PASO 4 — Agregar tu Gemini API Key (CRÍTICO)

1. Vercel → tu proyecto → **Settings → Environment Variables**
2. Agregá:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIzaSy...` (la key de Google AI Studio)
   - **Environment:** ✅ Production ✅ Preview
3. Click **Save**
4. **Deployments → Redeploy**

---

## PASO 5 — Apuntar dominio leandromocchegiani.com

### En Vercel:
Settings → Domains → agregá `leandromocchegiani.com` y `www.leandromocchegiani.com`

### En tu registrar DNS:
| Type  | Name | Value                |
|-------|------|----------------------|
| A     | @    | 76.76.21.21          |
| CNAME | www  | cname.vercel-dns.com |

---

## COSTOS

| Servicio | Costo      |
|----------|------------|
| Vercel   | GRATIS     |
| Gemini 2.0 Flash | GRATIS (1,500 req/día) |
| Dominio  | Lo que ya pagás |

**Total: $0/mes** mientras no superes 1,500 consultas diarias.

---

## SOPORTE
- Google AI Studio: aistudio.google.com
- Vercel Docs: vercel.com/docs
- Contacto: lmocchegiani@gmail.com
