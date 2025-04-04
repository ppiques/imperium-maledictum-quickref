import React from "react";
import Table from "../components/Table";
import xpCosts from "../data/xpCosts.json";
import names from "../data/names.json";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home-page">
      <h2>Home</h2>
      <div className="talents-info">
        <p>
          A collection of references to help your party in the Grimdark 41st
          Millenium.
        </p>
      </div>
      <h3>Name Table</h3>
      <Table headers={names.names.headers} data={names.names.data} />
      <div className="tables-container">
        <div className="table-wrapper">
          <h3>Characteristic Improvement XP Cost</h3>
          <Table
            headers={xpCosts.characteristicImprovement.headers}
            data={xpCosts.characteristicImprovement.data}
            disableSorting={true}
          />
        </div>
        <div className="table-wrapper">
          <h3>Skill and Specialisation XP Cost</h3>
          <Table
            headers={xpCosts.skillSpecialisation.headers}
            data={xpCosts.skillSpecialisation.data}
            disableSorting={true}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
