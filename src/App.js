import React, { Component } from "react";
import axios from "axios";
import "./css/App.css";
import StoreList from "./components/StoreList";
import StoreForm from "./components/StoreForm";
import Header from "./components/Header";
import StocksChart from "./components/StocksChart";

const STORE_URL = "http://localhost:5000/store/";
const STORE_LIMIT = 8;

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
        <Header />
        <video src="./assets/drops.mp4" autoPlay loop muted></video>
        <section className="store">
          <div className="container grid">
            <StoreList
              stores={this.state.stores}
              removeStore={this.removeStore}
            />
            <StoreForm
              addStore={this.addStore}
              storeValidation={this.storeValidation}
              isStoreLimitReached={this.state.stores.length >= STORE_LIMIT}
            />
            <StocksChart
              series={this.state.stores.map((store) => ({
                name: store.name,
                data: store.waterStockAmount,
              }))}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
