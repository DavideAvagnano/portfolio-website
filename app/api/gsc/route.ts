import fs from "fs";
import path from "path";
import { google } from "googleapis";
import { NextResponse } from "next/server";

// Funzione per autenticarsi a Google Search Console
async function authenticateGSC() {
  const keyFilePath = path.join(process.cwd(), "credentials.json");

  if (!fs.existsSync(keyFilePath)) {
    throw new Error("Il file delle credenziali non è stato trovato.");
  }

  // uso il file di credenziali per autenticarmi e creo instanza dell'API GSC
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  return google.webmasters({ version: "v3", auth });
}

// Funzione per recuperare gli errori di scansione
async function getCrawlErrors(searchConsole: any, siteUrl: string) {
  try {
    const crawlErrors = await searchConsole.sites.get({
      siteUrl,
    });

    return crawlErrors.data || []; // restituisce i dati (errori) ottenuti
  } catch (error) {
    console.error("Errore nel recupero degli errori di scansione:", error);
    return []; // restituisce un array vuoto in caso di errore
  }
}

// Funzione per recuperare l'elenco delle pagine indicizzate
async function getIndexedPages(searchConsole: any, siteUrl: string) {
  const sitemaps = await searchConsole.sitemaps.list({
    siteUrl,
  });

  return sitemaps.data.sitemap || [];
}

// Funzione per recuperare dati di Search Console
export async function GET(): Promise<NextResponse> {
  try {
    const searchConsole = await authenticateGSC();
    const siteUrl = process.env.SITE_URL;

    // Recupera gli errori di scansione (ottiene info sul sito)
    const crawlErrors = await getCrawlErrors(searchConsole, siteUrl!);

    // Recupera l'elenco delle pagine indicizzate (sitemap)
    const indexedPages = await getIndexedPages(searchConsole, siteUrl!);

    return NextResponse.json({
      success: true,
      crawlErrors: crawlErrors,
      indexedPages: indexedPages,
    });
  } catch (error: any) {
    console.error("Errore API GSC:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
