export default function playerReducer(
  state = { players: [], requesting: false },
  action
) {
  switch (action.type) {
    case "START_LOADING_PLAYERS_REQUEST":
      return {
        ...state,
        players: [...state.players],
        requesting: true,
      };
    case "LOAD_PLAYERS":
      return {
        ...state,
        players: action.players,
        requesting: false,
      };
    default:
      return state;
  }
}
