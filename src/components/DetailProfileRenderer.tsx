import React from "react";
import "./DetailProfileRenderer.css";

export interface SlTableProfile {
  id: string;
  type: "sl_table";
  header: string;
  table: Array<{ sl: string; effect: string }>;
}

export interface WeaponProfile {
  id: string;
  type: "weapon_profile";
  headers: string[];
  rows: Array<Record<string, string>>;
}

export type DetailProfile = SlTableProfile | WeaponProfile;

interface DetailProfileRendererProps {
  profile: DetailProfile;
}

/**
 * Rend un profil détaillé issu d'un fichier JSON de profils.
 * Les types supportés sont : sl_table (tableau de niveau de succès) et weapon_profile (profil d'arme).
 */
const DetailProfileRenderer: React.FC<DetailProfileRendererProps> = ({
  profile,
}) => {
  switch (profile.type) {
    case "sl_table":
      return (
        <div className="detail-profile sl-table">
          <table className="detail-table">
            <caption className="detail-table-header">{profile.header}</caption>
            <thead>
              <tr>
                <th>SL</th>
                <th>Effect</th>
              </tr>
            </thead>
            <tbody>
              {profile.table.map((row, i) => (
                <tr key={i}>
                  <td className="sl-cell">{row.sl}</td>
                  <td>{row.effect}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "weapon_profile":
      return (
        <div className="detail-profile weapon-profile">
          <table className="detail-table">
            <thead>
              <tr>
                {profile.headers.map((h, i) => (
                  <th key={i}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {profile.rows.map((row, i) => (
                <tr key={i}>
                  {profile.headers.map((h, j) => (
                    <td key={j}>{row[h] || ""}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
};

export default DetailProfileRenderer;
