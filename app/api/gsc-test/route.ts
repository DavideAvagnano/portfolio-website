import { google } from "googleapis";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Percorso del file credentials.json
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

// Funzione per autenticarsi con OAuth2
async function authenticate() {
  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  return auth;
}

// Funzione per ottenere la sitemap dalla Google Search Console API
async function getSitemapUrls(auth: any) {
  const searchConsole = google.webmasters({ version: "v3", auth });
  const siteUrl = "https://portfolio-website-blond-phi.vercel.app/"; // Modifica con il tuo dominio

  try {
    const response = await searchConsole.sitemaps.list({ siteUrl });
    const sitemaps = response.data.sitemap || [];

    return sitemaps.map((s) => s.path); // Restituisce gli URL delle sitemap
  } catch (error: any) {
    console.error("Errore nel recupero della sitemap:", error.message);
    throw new Error("Errore nel recupero della sitemap");
  }
}

// API Route di Next.js
export async function GET() {
  try {
    const auth = await authenticate();
    const sitemapUrls = await getSitemapUrls(auth);

    return NextResponse.json({ sitemaps: sitemapUrls });
  } catch (error) {
    return NextResponse.json(
      { error: "Impossibile ottenere la sitemap" },
      { status: 500 }
    );
  }
}
