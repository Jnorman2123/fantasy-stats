export function fetchPlayers() {
  return (dispatch) => {
    dispatch({ type: "START_LOADING_PLAYERS_REQUEST" });
    fetch("http://127.0.0.1:8000/api/player/")
      .then((resp) => resp.json())
      .then((players) => dispatch({ type: "LOAD_PLAYERS", players }));
  };
}
