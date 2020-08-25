import React, { Component } from "react";

class Player extends Component {
  createPlayers = () => {
    return Object.entries(this.props.player).map(([key, value]) => {
      const newKey = key.replace(/\_/g, " ");
      const stat = newKey.charAt(0).toUpperCase() + newKey.slice(1);
      if (this.props.stats[stat] === "on") {
        return <td key={stat}>{value}</td>;
      }
    });
  };

  render() {
    const rows = this.createPlayers();
    return <tr>{rows}</tr>;
  }
}

export default Player;
