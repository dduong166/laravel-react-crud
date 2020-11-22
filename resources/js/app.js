// import React from "react";
// import ReactDOM from 'react-dom';
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import "bootstrap/dist/css/bootstrap.css";

// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// import EditExpense from "./components/edit-expense.component";
// import ExpensesList from "./components/expenses-listing.component";
// import CreateExpense from "./components/create-expense.component";
// import Login from "./components/auth/login.component";

// function App() {
//   return (<Router>
//     <div className="App">
//       <header className="App-header">
//         <Navbar>
//           <Container>

//             <Navbar.Brand>
//               <Link to={"/create-expense"} className="nav-link">
//               Expense manager
//               </Link>
//             </Navbar.Brand>

//             <Nav className="justify-content-end">
//               <Nav>
//                 <Link to={"/create-expense"} className="nav-link">
//                   Create Expense
//                 </Link>
//                 <Link to={"/expenses-listing"} className="nav-link">
//                   Expenses List
//                 </Link>
//               </Nav>
//             </Nav>

//           </Container>
//         </Navbar>
//       </header>

      // <Container>
      //   <Row>
      //     <Col md={12}>
      //       <div className="wrapper">
      //         <Switch>
      //           <Route exact path='/' component={CreateExpense} />
      //           <Route path="/create-expense" component={CreateExpense} />
      //           <Route path="/edit-expense/:id" component={EditExpense} />
      //           <Route path="/expenses-listing" component={ExpensesList} />
      //           <Route path="/login" component={Login} />
      //         </Switch>
      //       </div>
      //     </Col>
      //   </Row>
      // </Container>
//     </div>
//   </Router>);
// }

// export default App;
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/app.css";

import Navbar from "./components/header-footer/navbar.component";
import TopPage from "./components/toppage/toppage.component";
import Login from "./components/auth/login.component";
import Profile from "./components/user/profile.component";

axios.defaults.withCredentials = true;
class App extends Component {
  constructor() {
    super();
    this.state = {
      current_user: null,
      loading: true
    };

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    axios.get("http://localhost:8000/auth").then(response => {
      console.log("Current user(app): ", response.data);
      if (response.data.user) {
        this.setState({
          current_user: response.data.user.username,
          loading: false
        });
      } else {
        this.setState({
          current_user: null,
          loading: false
        });
      }
    });
  }

  render() {
    return (
      <Router>
      {!this.state.loading ? 
        <div className="app">
          <Navbar updateUser={this.updateUser} current_user={this.state.current_user} />
          {this.state.current_user && <p>Join the party, {this.state.current_user}!</p>}
          <Route exact path="/" component={TopPage} />
          <Route
            path="/login"
            render={() => <Login updateUser={this.updateUser} />}
          />
          <Route path="/auth/profile" render={() => <Profile current_user={this.state.current_user} />} />
        </div>
      : <></>}

      </Router>
      
    );
  }
}


export default App;


if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
