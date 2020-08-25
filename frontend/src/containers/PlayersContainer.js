import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPlayers } from "../actions/players/playerActions";
import Player from "../components/players/Player";
import Players from "../components/players/Players";

class PlayersContainer extends Component {
  componentDidMount() {
    this.props.fetchPlayers();
  }

  renderPlayers = () => {
    if (this.props.players.requesting === true) {
      return <h1>Loading...</h1>;
    } else {
      return (
        <div>
          <h2>Name</h2>
          <ul>
            {this.props.players.players.map((player) => {
              return (
                <li>
                  <Player key={player.id} player={player} />
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>Players</h1>
        <Players props={this.props} renderPlayers={this.renderPlayers} />
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
