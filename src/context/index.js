import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";

const MyContext = React.createContext();

const DEFAULT_STATE = {
  stage: 1,
  players: [],
  result: ''
};

class MyProvider extends Component {
  state = DEFAULT_STATE

  addPlayers = (name) => {
    this.setState((prevState) => ({
      players: [...prevState.players, name],
    }));
  };

  removePlayer = (index) => {
    let newState = this.state.players;
    newState.splice(index, 1);
    this.setState({
      players: newState,
    });
  };

  generateLooser = () => {
    const { players } = this.state;
    this.setState({
        result: players[Math.floor(Math.random()*players.length)]
    })

  }

  resetGame = () => {
    this.setState(DEFAULT_STATE)
  }

  nextStage = () => {
    const { players } = this.state;
    if (players.length < 2) {
      toast.error("You need more than 1 player to go to next stage", {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 2000,
      });
    } else {
      this.setState(
        {
          stage: 2,
        },
        () => {
          setTimeout(() => {
            this.generateLooser();
            
          }, 2000);
        }
      );
    }
  };

  render() {
    return (
      <>
        <MyContext.Provider
          value={{
            state: this.state,
            addPlayers: this.addPlayers,
            removePlayer: this.removePlayer,
            nextStage: this.nextStage,
            result: this.state.result,
            getNewLooser: this.generateLooser,
            resetGame: this.resetGameg

          }}
        >
          {this.props.children}
        </MyContext.Provider>
        <ToastContainer />
      </>
    );
  }
}

export { MyContext, MyProvider };
