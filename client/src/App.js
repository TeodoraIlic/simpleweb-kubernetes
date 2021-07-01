import React, {Component} from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    message: '',
    firstName: '',
    lastName: ''
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('/api/user', {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    }).then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  };


  handleClick = () => {
    axios.get('/api/').then(response => {
      console.log(response)
      this.setState({message: response.data})
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="d-flex align-items-center justify-content-center">
            <p>Click to say Hello</p>
          </div> 
        </div>
        <div className="col-md-8 offset-md-2">
          <div className="d-flex align-items-center justify-content-center">
            <button type="button" className="btn btn-primary" onClick={this.handleClick}>Click me</button>
          </div>  
        </div>
        <div className="col-md-8 offset-md-2">
          <div className="d-flex align-items-center justify-content-center">
            <h4>Response: </h4>
          </div>  
        </div>
        <div className="col-md-8 offset-md-2">
          <div className="d-flex align-items-center justify-content-center">
            <p>{this.state.message}</p>
          </div>
        </div>
        <div  className="col-md-8 offset-md-2">
          <form onSubmit={this.onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
              <label>First Name</label>
              <input
                value={this.state.firstName}
                onChange={(e) => this.setState({firstName: e.target.value})}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                value={this.state.lastName}
                onChange={(e) => this.setState({lastName: e.target.value})}
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>     
    );
  }
  
}

export default App;
