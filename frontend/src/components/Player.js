import React, { Component } from "react";

class Player extends Component {
  render() {
    return <p key={this.props.player.id}>{this.props.player.name}</p>;
  }
}

export default Player;
