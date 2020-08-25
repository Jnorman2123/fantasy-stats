import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchQuarterbacks } from "../actions/quarterbacks/quarterbackActions";
import QuarterbackTable from "../components/quarterbacks/QuarterbackTable";
import Quarterback from "../components/quarterbacks/Quarterback";
import Stat from "../components/quarterbacks/Stat";
import CheckboxContainer from "./CheckboxContainer";

const state = {
  stats: {
    Name: "on",
    Team: "on",
    Ints: "on",
    Fumbs: "on",
    "Rush atts": "on",
    "Rush yards": "on",
    "Rush tds": "on",
    "Pass atts": "on",
    "Pass comps": "on",
    "Comp perc": "on",
    "Pass yards": "on",
    "Pass tds": "on",
    Games: "on",
    Points: "on",
    "Points per game": "on",
    "Pass per td": "on",
    "Yards per pass": "on",
    "Yards per comp": "on",
    "Rush per td": "on",
    "Yards per rush": "on",
    "Total att": "on",
    "Att per game": "on",
    "Points per att": "on",
    "Att per td": "on",
    "Avg vor": "on",
    "Starting vor": "on",
  },
  sort: "",
};

class QuarterbacksContainer extends Component {
  constructor(props) {
    super(props);
    this.state = state;
  }

  componentDidMount() {
    this.props.fetchQuarterbacks();
  }

  createStats = () => {
    return Object.keys(this.state.stats).map((key) => {
      return key;
    });
  };

  handleToggle = (event) => {
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

  handleSort = (event) => {
    event.persist();
    this.setState((prevState) => ({
      ...prevState,
      sort: [event.target.innerText],
    }));
  };

  renderQuarterbacks = () => {
    const qbs = this.props.quarterbacks.quarterbacks;
    const sorting = this.state.sort;
    if (sorting !== "") {
      const newSort = sorting[0].replace(/\ /g, "_");
      const lowerSort = newSort.charAt(0).toLowerCase() + newSort.slice(1);
      console.log(lowerSort);
      if (qbs !== undefined) {
        qbs.sort((a, b) => (a[lowerSort] > b[lowerSort] ? -1 : 1));
        return qbs.map((qb) => {
          return <Quarterback key={qb.name} qb={qb} stats={this.state.stats} />;
        });
      }
    } else {
      return qbs.map((qb) => {
        return <Quarterback key={qb.name} qb={qb} stats={this.state.stats} />;
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
    console.log(this.state);
    const stats = this.createStats();
    let toggled = this.state;
    return (
      <div>
        <div>
          <CheckboxContainer
            toggled={toggled}
            stats={stats}
            handleToggle={this.handleToggle}
          />
        </div>
        <div>
          <QuarterbackTable
            renderQuarterbacks={this.renderQuarterbacks}
            renderStats={this.renderStats}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    quarterbacks: state.quarterbacks,
    requesting: state.requesting,
  };
}

export default connect(mapStateToProps, { fetchQuarterbacks })(
  QuarterbacksContainer
);
