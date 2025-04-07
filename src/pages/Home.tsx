import Table from "../components/Table";
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
    </div>
  );
}

export default Home;
