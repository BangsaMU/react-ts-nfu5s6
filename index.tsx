import React, { Component } from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import "./style.css";

interface AppProps {}
interface AppState {
  name: string;
}

function DaftarTeman(props) {
  let statusTeman = props.status;
  console.log("daftar teman ", props.status, list);

  return (
    <ul>
      {props.list.map((name, index) => (
        <li key={index}>
          {index}
          {name.nama}
          <button onClick={() => props.onRemoveFriend(name.nama, name.id)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}

function DaftarTemanActive(props) {
  return (
    <ol>
      {props.list.map((name, index) => (
        <li key={name.id}>
          {index}
          {name.nama}
          <button onClick={() => props.onRemoveFriend(name.nama, name.id)}>
            X
          </button>
          <button onClick={() => props.onInActiveFriend(name.nama, name.id)}>
            :(
          </button>
        </li>
      ))}
    </ol>
  );
}

function DaftarTemanInActive(props) {
  let statusTeman = props.status;
  console.log("daftar teman ", props.status);

  return (
    <ul>
      {props.list.map((name, index) => (
        <li key={name.id}>
          {index}
          {name.nama}
          <button onClick={() => props.onRemoveFriend(name.nama, name.id)}>
            X
          </button>
          <button onClick={() => props.onActiveFriend(name.nama, name.id)}>
            :)
          </button>
        </li>
      ))}
    </ul>
  );
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: "disana",
      teman: [
        // { id: 1, nama: "saya", status: "active" },
        // { id: 2, nama: "dia", status: "inActive" },
        // { id: 3, nama: "aku", status: "active" }
      ],
      input: ""
    };

    this.handleRemoveFriend = this.handleRemoveFriend.bind(this);
    this.updateInput = this.updateInput.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.handleClearFriend = this.handleClearFriend.bind(this);
    this.handleInActiveFriend = this.handleInActiveFriend.bind(this);
    this.handleActiveFriend = this.handleActiveFriend.bind(this);
  }
  componentDidMount() {
    //load api data
    API.fetchFriends().then(teman => {
      console.log("teman", teman),
        this.setState({
          teman,
          loading: false
        });
    });
  }
  componentDidUpdate() {}
  componentWillUnmount() {
    //chnage page routing
  }
  // static getDerivedStateFromProps() {}
  // shouldComponentUpdate(nextProps,nextState) {
  //   return false;
  // }
  updateInput(e) {
    const value = e.target.value;

    this.setState({
      input: value
    });
  }
  handleClearFriend() {
    this.setState({
      teman: []
    });
  }
  handleAddFriend() {
    // console.log(this.state.input.length);
    if (this.state.input.length >= 1) {
      this.setState(currentState => {
        // console.log("sss", currentState.teman.slice(-1).pop().id + 1);
        return {
          teman: currentState.teman.concat([
            {
              id: currentState.teman.slice(-1).pop().id + 1,
              nama: currentState.input,
              status: "active"
            }
          ]),
          input: ""
        };
      });
    }
  }
  handleRemoveFriend(name, id) {
    this.setState(currentState => {
      function filterByName(friend) {
        return (friend = friend !== name);
      }
      function filterByID(item, index, arr) {
        if (item.id != id) {
          return (arr[index] = item);
        }
      }
      return {
        // teman: currentState.teman.filter(friend => friend !== name)
        teman: currentState.teman.filter(filterByID)
      };
    });
  }
  handleInActiveFriend1(name, id) {
    this.setState(currentState => {
      function filterByName(friend) {
        return (friend = friend !== name);
      }
      function filterByID(item, index, arr) {
        if (item.id == id) {
          return (arr[index] = item.id.status);
        }
      }
      return {
        // teman: currentState.teman.filter(friend => friend !== name)
        // teman: currentState.teman.[1]
      };
    });
  }
  // handleToggleFriend(name) {

  handleInActiveFriend(name, id) {
    this.setState(currentState => {
      // const friend = currentState.teman.find(teman => teman.id === id);

      return {
        teman: currentState.teman
          .filter(friend => friend.id !== id)
          .concat([
            {
              id,
              nama: name,
              status: "inActive"
            }
          ])
      };
    });
  }

  handleActiveFriend(name, id) {
    this.setState(currentState => {
      // const friend = currentState.teman.find(teman => teman.id === id);
      // console.log(currentState.teman);

      return {
        teman: currentState.teman
          .filter(friend => friend.id !== id)
          .concat([
            {
              id,
              nama: name,
              status: "active"
            }
          ])
      };
    });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="new friend"
          value={this.state.input}
          onChange={this.updateInput}
        />
        <button onClick={this.handleAddFriend}>Submit</button>
        <div>
          <button onClick={this.handleClearFriend}>Clear All</button>
        </div>
        <Hello name={this.state.name} />
        <span>Active friend</span>
        <DaftarTemanActive
          list={this.state.teman.filter(teman => teman.status == "active")}
          onRemoveFriend={this.handleRemoveFriend}
          onInActiveFriend={this.handleInActiveFriend}
          status="active"
        />
        <span>InActive friend</span>{" "}
        <DaftarTemanInActive
          list={this.state.teman.filter(teman => teman.status == "inActive")}
          onRemoveFriend={this.handleRemoveFriend}
          onActiveFriend={this.handleActiveFriend}
          status="inActive"
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
