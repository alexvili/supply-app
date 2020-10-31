import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import StoreList from "./components/StoreList";
import StoreForm from "./components/StoreForm";

const STORE_URL = "http://localhost:5000/store/";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { stores: [] };
  }

  componentDidMount() {
    axios
      .get(STORE_URL)
      .then((res) => {
        if (res?.data?.length > 0) {
          this.setState({ stores: res.data });
        }
      })
      .catch((error) => {
        // TODO: handle error
        console.log(error);
      });
  }

  addStore = (store) => {
    axios
      .post(STORE_URL, { store })
      .then((res) => {
        if (res?.data?.store) {
          this.setState((prevState) => ({
            stores: [...prevState.stores, res.data.store],
          }));
        }
      })
      .catch((error) => {
        // TODO: handle error
        console.log(error);
      });
  };

  removeStore = (uid) => {
    const uidObj = { data: { uid } };
    axios
      .delete(STORE_URL, uidObj)
      .then((res) => {
        if (res?.data?.uid) {
          this.setState((prevState) => ({
            stores: prevState.stores.filter(
              (store) => store.uid !== res.data.uid
            ),
          }));
        }
      })
      .catch((error) => {
        // TODO: handle error
        console.log(error);
      });
  };

  storeValidation = {
    checkIfNameExists(name) {
      return axios.get(`${STORE_URL}check/name/${name}`);
    },
    checkIfUidExists(uid) {
      return axios.get(`${STORE_URL}check/uid/${uid}`);
    },
  };

  render() {
    return (
      <div className="App">
        <StoreForm
          addStore={this.addStore}
          storeValidation={this.storeValidation}
        />
        Store list:
        <StoreList stores={this.state.stores} removeStore={this.removeStore} />
      </div>
    );
  }
}

export default App;
