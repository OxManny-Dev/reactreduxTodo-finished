import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';


import SignUp from '../SignUp';
import SignIn from '../SignIn';
import SignOut from '../SignOut';
import Counter from '../Counter';

import Navbar from '../../components/Navbar';
import AllTodosList from '../AllTodosList';

class App extends Component {
  render () {
    return (
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column textAlign='center' style={{ maxWidth: 700 }}>
          <Navbar authenticated={this.props.authenticated}/>
          <Switch>
            <Route exact path='/alltodos' component={AllTodosList}/>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/counter' component={Counter}/>
            <Route exact path='/signout' component={SignOut} />
            <Route exact path='/' component={SignUp}/>
            </Switch>
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps({ auth: { authenticated } }) {
  return { authenticated };
}

export default connect(mapStateToProps)(App);
