// Elaborati accademici di ingegneria aerospaziale (i due esami della magistrale,
// prima del riorientamento verso il software). Struttura gemella di `projects.ts`:
// qui vivono solo i dati **non traducibili** — id stabili, strumenti (nomi di
// prodotto) e il file PDF dell'elaborato. Titolo, tagline, contesto e punti chiave
// sono copy tradotto (`messages/*.json`, namespace `education`).
//
// ⚠️ Onestà (CLAUDE.md §5, `docs/site-content.md` §10): la **triennale è conseguita**
// (105/110); la **magistrale è interrotta** dopo i due esami — di cui questi
// elaborati sono il prodotto. Si presentano come elaborati accademici, **senza**
// attribuire un titolo magistrale.
//
// I PDF stanno in `public/` e sono **in italiano** (lingua originale): il link di
// download punta sempre allo stesso file, a prescindere dal locale del sito.

/**
 * Union, non `string`: rende type-safe le chiavi `education.items.<id>.*`.
 * SAA = Strutture Aerospaziali Avanzate · ADA = Aerodinamica degli Aeromobili
 * (l'esame ADA ha prodotto due elaborati: Xfoil e Ansys).
 */
export type ElaboratoId = "saaFem" | "adaXfoil" | "adaAnsys"

export type Elaborato = {
  id: ElaboratoId
  /** Strumenti di calcolo usati (non tradotti). */
  tools: readonly string[]
  /** Nome del PDF in `public/` — documento originale in italiano. */
  file: string
}

export type EduGroupId = "structures" | "aerodynamics"

export type EduGroup = {
  id: EduGroupId
  elaborati: readonly Elaborato[]
}

// Raggruppati per esame: Strutture (un elaborato FEM) e Aerodinamica (due
// elaborati, Xfoil e CFD). Un gruppo con una sola card si allarga su due colonne,
// come nei progetti.
export const EDU_GROUPS: readonly EduGroup[] = [
  {
    id: "structures",
    elaborati: [
      {
        id: "saaFem",
        tools: ["MSC Nastran", "Femap", "Matlab"],
        file: "Elaborato_SAA_Avagnano_Davide.pdf",
      },
    ],
  },
  {
    id: "aerodynamics",
    elaborati: [
      {
        id: "adaXfoil",
        tools: ["Xfoil", "Matlab", "AutoCAD"],
        file: "Avagnano_Davide_Elaborato_ADA_Xfoil.pdf",
      },
      {
        id: "adaAnsys",
        tools: ["Ansys Fluent", "Xfoil"],
        file: "Avagnano_Davide_Elaborato_ADA_Ansys.pdf",
      },
    ],
  },
]
