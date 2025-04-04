import React, { useState } from "react";
import Table from "../components/Table";
import SearchBar from "../components/SearchBar";
import Tooltip from "../components/Tooltip";
import psyPowers from "../data/psyPowers.json";
import psychicPhenomena from "../data/psychicPhenomena.json";
import perilsOfTheWarp from "../data/perilsOfTheWarp.json";
import "../styles/Psy.css";

function Psy() {
  const psyPowersHeaders = [
    "Name",
    "Warp Rating",
    "Difficulty",
    "Range",
    "Target",
    "Duration",
    "Effect",
    "Discipline",
    "Source",
  ];
  const psychicPhenomenaHeaders = ["1d100", "Phenomenon", "Lingering"];
  const perilsOfTheWarpHeaders = ["1d100", "Peril"];

  // État pour la recherche
  const [query, setQuery] = useState("");

  // Mapping des tableaux spécifiques
  const tableMappings: { [key: string]: React.ReactNode } = {
    "Soulsight Table": (
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>You know... (Cumulative)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+1</td>
            <td>How many sentient creaturs are within range.</td>
          </tr>
          <tr>
            <td>+2</td>
            <td>The species of each sentient creature within range.</td>
          </tr>
          <tr>
            <td>+3</td>
            <td>How many sentient creatures are in each Zone within range.</td>
          </tr>
          <tr>
            <td>+4 or more</td>
            <td>The exact location of each sentient creature within range.</td>
          </tr>
        </tbody>
      </table>
    ),
    "Shape Flesh Table": (
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>You can... (Cumulative)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+1 - +2</td>
            <td>
              Alter minor cosmetic features such as hair/eye/skin colour, facial
              features or blemishes.
            </td>
          </tr>
          <tr>
            <td>+3 - +4</td>
            <td>
              Moderately alter height, weight, natural posture and physique.
            </td>
          </tr>
          <tr>
            <td>+5 or more</td>
            <td>
              Drastically alter features and body structure. This includes
              rebuilding, removing, or disabling body parts such as limbs and
              sensory organs. You can cause or repair one Injury or Amputation
              (see page 217).
            </td>
          </tr>
        </tbody>
      </table>
    ),
    "Psychometry Table": (
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Results (Cumulative)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+1</td>
            <td>
              You receive general, vague impressions of the most recent strong
              emotions creatures felt while nearby or interacting with the
              target
            </td>
          </tr>
          <tr>
            <td>+2</td>
            <td>You know how recently the emotions were experienced.</td>
          </tr>
          <tr>
            <td>+3</td>
            <td>
              You witness a hazy memory of the events that caused the strong
              emotions.
            </td>
          </tr>
          <tr>
            <td>+4</td>
            <td>You witness a clear, detailed memory of the events.</td>
          </tr>
          <tr>
            <td>+5</td>
            <td>
              You learn the identities of the people who left emotional
              impressions on the target
            </td>
          </tr>
          <tr>
            <td>+6 or more</td>
            <td>
              You gain a deep understanding of what transpired involving the
              target. Ask the GM a single question about the event, which they
              answer truthfully
            </td>
          </tr>
        </tbody>
      </table>
    ),
    "Watchward Table": (
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Results (Cumulative)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+1</td>
            <td>You know you're being watched by something.</td>
          </tr>
          <tr>
            <td>+2</td>
            <td>You know how many beings or devices are watching you.</td>
          </tr>
          <tr>
            <td>+3</td>
            <td>
              You know the means of observation (such as natural senses,
              technological, or psychic).
            </td>
          </tr>
          <tr>
            <td>+4</td>
            <td>
              You know generally which direction and how far your observers are
              from you.
            </td>
          </tr>
          <tr>
            <td>+5</td>
            <td>You know the exact location of your observers.</td>
          </tr>
          <tr>
            <td>+6 or more</td>
            <td>You know what your observers look like.</td>
          </tr>
        </tbody>
      </table>
    ),
    "Plasma Torch Profile": (
      <table className="plasma-torch-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Spec</th>
            <th>Dmg</th>
            <th>Enc</th>
            <th>Traits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Plasma Torch</td>
            <td>Brawling</td>
            <td>4+WilB</td>
            <td>0</td>
            <td>Inflict (Ablaze), Loud, Rend (WilB).</td>
          </tr>
        </tbody>
      </table>
    ),
    "Breach Table": (
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>You can Destroy...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+1</td>
            <td>A fragile object, such as a glass window or pictrecorder</td>
          </tr>
          <tr>
            <td>+2</td>
            <td>A common object, such as a plastic tray or wooden stool.</td>
          </tr>
          <tr>
            <td>+3</td>
            <td>A rugged object, such as a Lasgun or a wooden door.</td>
          </tr>
          <tr>
            <td>+4</td>
            <td>
              An exceptionally sturdy object, such as a Bolt Pistol or a
              compressed gas canister.
            </td>
          </tr>
          <tr>
            <td>+5</td>
            <td>
              An object designed to withstand severe stress, such as a plasteel
              wall or ferrocrete pillar.
            </td>
          </tr>
          <tr>
            <td>+6 or more</td>
            <td>
              An object made from nigh-unbreakable materials like ceramite or
              adamantium.
            </td>
          </tr>
        </tbody>
      </table>
    ),
    "Objuration Mechanicum Table": (
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+1</td>
            <td>
              The machine becomes momentarily glitchy. Until the start of your
              next turn, roll 1d10 each time it should function. On a result of
              6+, the machine does nothing.
            </td>
          </tr>
          <tr>
            <td>+2</td>
            <td>
              The machine jams, unable to function until the start of your next
              turn.
            </td>
          </tr>
          <tr>
            <td>+3</td>
            <td>
              The machine breaks, unable to function at all until it’s repaired.
            </td>
          </tr>
          <tr>
            <td>+4</td>
            <td>The machine suffers irreparable damage and is destroyed.</td>
          </tr>
          <tr>
            <td>+5 or more</td>
            <td>
              The machine is destroyed and fails catastrophically, inflicting 4
              Damage to everything within Immediate Range.
            </td>
          </tr>
        </tbody>
      </table>
    ),
    "Mental Interrogation Table": (
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>Results (Cumulative)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+1</td>
            <td>
              You can learn basic information about the target, such as name,
              age, mood, and general physical/mental health, as well as surface
              thoughts in the target’s mind, such as opinions about you,
              overarching motivations, immediate concerns, and conscious lies.
            </td>
          </tr>
          <tr>
            <td>+2</td>
            <td>
              You can learn about an object, location, or creature significant
              to the target and the nature of its importance.
            </td>
          </tr>
          <tr>
            <td>+3</td>
            <td>
              You can access the target’s memories of the last day from their
              perspective.
            </td>
          </tr>
          <tr>
            <td>+4</td>
            <td>
              You can access the target’s memories of the last year from their
              perspective.
            </td>
          </tr>
          <tr>
            <td>+5</td>
            <td>
              You can reveal the target’s innermost thoughts, feelings,
              motivations, fears, relationships, secrets, and agendas.
            </td>
          </tr>
          <tr>
            <td>+6 or more</td>
            <td>
              The target is an open book to you. You have full access to the
              target’s mind and the information within.
            </td>
          </tr>
        </tbody>
      </table>
    ),
    "Discern Falsehoods Table": (
      <table>
        <thead>
          <tr>
            <th>SL</th>
            <th>You know... (Cumulative)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>+1 to +2</td>
            <td>When someone speaks an outright lie.</td>
          </tr>
          <tr>
            <td>+3 to +4</td>
            <td>
              When someone speaks something technically true, or with deceptive
              intent.
            </td>
          </tr>
          <tr>
            <td>+5 or more</td>
            <td>
              A general idea of the speaker's motivation for speaking a
              falsehood (greed, duress, malice, etc...).
            </td>
          </tr>
        </tbody>
      </table>
    ),
    "Exploding Object": (
      <table className="exploding-object-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Dmg</th>
            <th>Enc</th>
            <th>Traits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Exploding Object</td>
            <td>3+WilB</td>
            <td>0</td>
            <td>Blast, Loud</td>
          </tr>
        </tbody>
      </table>
    ),
    "Erupting Object": (
      <table className="erupting-object-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Dmg</th>
            <th>Enc</th>
            <th>Traits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Erupting Object</td>
            <td>-</td>
            <td>0</td>
            <td>Inflict (Ablaze), Spread</td>
          </tr>
        </tbody>
      </table>
    ),
    "Psychic Blade Profile": (
      <table className="psychic-blade-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialisation</th>
            <th>Dmg</th>
            <th>Enc</th>
            <th>Traits</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Psychic Blade</td>
            <td>One-Handed</td>
            <td>3+WilB</td>
            <td>0</td>
            <td>Penetrating (SL)</td>
          </tr>
        </tbody>
      </table>
    ),
  };

  // Fonction pour transformer les descriptions
  const renderDescription = (description: string) => {
    const parts = description.split(
      /(Soulsight Table|Shape Flesh Table|Psychometry Table|Watchward Table|Plasma Torch Profile|Breach Table|Objuration Mechanicum Table|Mental Interrogation Table|Discern Falsehoods Table|Exploding Object|Erupting Object|Psychic Blade Profile)/i
    );
    return parts.map((part, index) =>
      tableMappings[part] ? (
        <Tooltip key={index} content={tableMappings[part]}>
          {part}
        </Tooltip>
      ) : (
        part
      )
    );
  };

  // Filtrage
  const filteredPsyPowers = psyPowers
    .filter((power) =>
      psyPowersHeaders.some((header) =>
        power[header as keyof typeof power]
          ?.toString()
          .toLowerCase()
          .includes(query.toLowerCase())
      )
    )
    .map((power) => ({
      ...power,
      Effect: renderDescription(power.Effect),
    }));

  // Filtrage des phénomènes psychiques
  const filteredPsychicPhenomena = psychicPhenomena.filter((phenomenon) =>
    psychicPhenomenaHeaders.some((header) =>
      phenomenon[header as keyof typeof phenomenon]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  // Filtrage des périls du Warp
  const filteredPerilsOfTheWarp = perilsOfTheWarp.filter((peril) =>
    perilsOfTheWarpHeaders.some((header) =>
      peril[header as keyof typeof peril]
        ?.toString()
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  );

  return (
    <div className="psy-page">
      <h2>Psykers</h2>
      <div className="psy-info">
        <p>
          Each new Psychic Power costs <strong>100 XP</strong>. Minor Psychic
          Powers costs <strong>60 XP</strong>.
        </p>
      </div>
      <SearchBar
        placeholder="Search the warp..."
        onSearch={(searchQuery) => setQuery(searchQuery)}
      />
      <h3>Psychic Powers</h3>
      <Table
        headers={psyPowersHeaders}
        data={filteredPsyPowers}
        defaultSort={{ key: "Discipline", direction: "asc" }}
      />
      <h3>Psychic Phenomena</h3>
      <Table
        headers={psychicPhenomenaHeaders}
        data={filteredPsychicPhenomena}
        disableSorting={true}
        defaultSort="unsorted"
      />
      <h3>Perils of the Warp</h3>
      <Table
        headers={perilsOfTheWarpHeaders}
        data={filteredPerilsOfTheWarp}
        disableSorting={true}
        defaultSort="unsorted"
      />
    </div>
  );
}

export default Psy;
