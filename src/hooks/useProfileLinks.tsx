import { useMemo } from "react";
import React from "react";
import Tooltip from "../components/Tooltip";
import DetailProfileRenderer, {
  DetailProfile,
} from "../components/DetailProfileRenderer";

/**
 * Hook utilitaire qui détecte automatiquement les références à des profils détaillés
 * dans du texte libre, et les enveloppe dans des <Tooltip> qui affichent le profil
 * en survol.
 *
 * Utilisable depuis n'importe quelle page : Psy.tsx, Weapons.tsx, Equipment.tsx, etc.
 * Il suffit de passer le tableau de profils correspondant (ex: psyDetailProfiles.json).
 *
 * @param profiles  Tableau de profils (array de DetailProfile avec un champ "id" texte)
 * @returns         Fonction renderProfileLinks(texte: string) => ReactNode
 */
export function useProfileLinks(profiles: DetailProfile[]) {
  // Construit un Map id -> profil pour recherche rapide
  const profileMap = useMemo(
    () => new Map<string, DetailProfile>(profiles.map((p) => [p.id, p])),
    [profiles],
  );

  // Construit une regex unique avec tous les ids, triés par longueur décroissante
  // pour éviter les correspondances partielles (ex: "Shape" avant "Shape Flesh Table")
  const pattern = useMemo(() => {
    const ids = Array.from(profileMap.keys()).sort(
      (a, b) => b.length - a.length,
    );
    // Échapper les caractères regex spéciaux
    const escaped = ids.map((id) =>
      id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    );
    return new RegExp(`\\b(${escaped.join("|")})\\b`, "g");
  }, [profileMap]);

  /**
   * Parse un texte et retourne un tableau de nodes React.
   * Les mentions de profils connus deviennent des <Tooltip> cliquables.
   */
  const renderProfileLinks = (text: string): React.ReactNode => {
    if (!text) return text;

    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // On utilise matchAll pour itérer sur les correspondances
    const matches = Array.from(text.matchAll(pattern));

    for (const match of matches) {
      const profileId = match[1]; // premier groupe capturant
      const startIndex = match.index!;
      const endIndex = startIndex + match[0].length;

      // Texte avant la correspondance
      if (startIndex > lastIndex) {
        parts.push(text.slice(lastIndex, startIndex));
      }

      // Tooltip avec le profil
      const profile = profileMap.get(profileId);
      if (profile) {
        parts.push(
          <Tooltip key={`tooltip-${profileId}-${startIndex}`} content={<DetailProfileRenderer profile={profile} />}>
            {profileId}
          </Tooltip>,
        );
      }

      lastIndex = endIndex;
    }

    // Texte restant après la dernière correspondance
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length === 1 ? parts[0] : <>{parts}</>;
  };

  return renderProfileLinks;
}

export default useProfileLinks;
