import React, { Component } from 'react';
import axios from 'axios';
// import Input from './Input';
import ListBar from './ListBar';

class Session extends Component {
  state = {
    bars: [],
  };

  componentDidMount() {
    this.getBars();
  }

  getBars = () => {
    axios
      .get('/api/sessions')
      .then((res) => {
        if (res.data) {
          this.setState({
            bars: res.data,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // deleteSession = (id) => {
  //   axios
  //     .delete(`/api/sessions/${id}`)
  //     .then((res) => {
  //       if (res.data) {
  //         this.getBars();
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };
  //
  deleteBar = (id) => {
      axios
        .post(`/api/sessions/bars/${id}`)
        .then((res) => {
          if (res.data) {
            this.getBars();
          }
        })
        .catch((err) => console.log(err));
    };

  render() {
    let { bars } = this.state;

    return (
      <div>
        <h1>Session</h1>
        <ListBar session={bars} deleteBar={this.deleteBar} />
      </div>
    );
  }
}

export default Session;

