import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlayers } from "../actions/players/playerActions";
import PlayerTable from "../components/players/PlayerTable";
import Player from "../components/players/Player";
import Stat from "../components/players/Stat";
import CheckboxContainer from "./CheckboxContainer";
import PositionContainer from "./PositionContainer";

const state = {
  stats: {
    Year: "on",
    Name: "on",
    Team: "on",
    Position: "on",
    "Rush attempts": "on",
    "Rush yards": "on",
    "Yards per rush": "on",
    "Rush touchdowns": "on",
    "Rushes per touchdown": "on",
    Fumbles: "on",
    "Pass attempts": "on",
    "Pass completions": "on",
    "Completion percentage": "on",
    "Pass yards": "on",
    "Yards per pass attempt": "on",
    "Yards per completion": "on",
    "Pass touchdowns": "on",
    "Passes per touchdown": "on",
    Interceptions: "on",
    Targets: "on",
    Receptions: "on",
    "Catch percentage": "on",
    "Receiving yards": "on",
    "Yards per reception": "on",
    "Yards per target": "on",
    "Receiving touchdowns": "on",
    "Receptions per touchdown": "on",
    "Targets per touchdown": "on",
    "Total attempts": "on",
    "Total yards": "on",
    "Yards per attempt": "on",
    "Total touchdowns": "on",
    "Attempts per touchdown": "on",
    Games: "on",
    "Attempts per game": "on",
    Points: "on",
    "Points per game": "on",
    "Points per attempt": "on",
    "Average value over replacement": "on",
    "Starting value over replacement": "on",
  },
  positions: {
    QB: "on",
    RB: "on",
    WR: "on",
    TE: "on",
  },
  sort: "",
};

class PlayersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = state;
  }

  componentDidMount() {
    this.props.fetchPlayers();
  }

  createStats = () => {
    return Object.keys(this.state.stats).map((key) => {
      return key;
    });
  };

  handleStatToggle = (event) => {
    event.persist();
    this.state.stats[event.target.name] === "on"
      ? this.setState((prevState) => ({
          ...prevState,
          stats: { ...prevState.stats, [event.target.name]: "off" },
        }))
      : this.setState((prevState) => ({
          ...prevState,
          stats: { ...prevState.stats, [event.target.name]: "on" },
        }));
  };

  handlePositionToggle = (event) => {
    event.persist();
    this.state.positions[event.target.name] === "on"
      ? this.setState((prevState) => ({
          ...prevState,
          positions: { ...prevState.positions, [event.target.name]: "off" },
        }))
      : this.setState((prevState) => ({
          ...prevState,
          positions: { ...prevState.positions, [event.target.name]: "on" },
        }));
  };

  handleSort = (event) => {
    event.persist();
    this.setState((prevState) => ({
      ...prevState,
      sort: [event.target.innerText],
    }));
  };

  renderPlayers = () => {
    const players = this.props.players.players;
    const sorting = this.state.sort;
    if (sorting !== "") {
      const newSort = sorting[0].replace(/\ /g, "_");
      const lowerSort = newSort.charAt(0).toLowerCase() + newSort.slice(1);
      if (players !== undefined) {
        players.sort((a, b) => (a[lowerSort] > b[lowerSort] ? -1 : 1));
        return players.map((player) => {
          return (
            <Player
              key={player.name}
              player={player}
              stats={this.state.stats}
              toggled={this.state.positions[player.position]}
            />
          );
        });
      }
    } else {
      return players.map((player) => {
        return (
          <Player
            key={player.name}
            player={player}
            stats={this.state.stats}
            toggled={this.state.positions[player.position]}
          />
        );
      });
    }
  };

  renderStats = () => {
    const stats = this.createStats();
    if (stats !== undefined) {
      return (
        <>
          {stats.map((stat) => {
            return (
              <Stat
                key={stat}
                stat={stat}
                toggled={this.state.stats[stat]}
                handleSort={this.handleSort}
              />
            );
          })}
        </>
      );
    }
  };

  render() {
    const stats = this.createStats();
    let toggled = this.state;
    const positions = Object.keys(this.state.positions);
    return (
      <div>
        <CheckboxContainer
          toggled={toggled}
          stats={stats}
          handleStatToggle={this.handleStatToggle}
        />
        <PositionContainer
          toggled={toggled}
          positions={positions}
          handlePositionToggle={this.handlePositionToggle}
        />
        <div>
          <PlayerTable
            renderPlayers={this.renderPlayers}
            renderStats={this.renderStats}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    players: state.players,
    requesting: state.requesting,
  };
}

export default connect(mapStateToProps, { fetchPlayers })(PlayersContainer);
