import * as React from 'react';
import { connect } from 'react-redux';

import { View } from 'component/view';
import { getDays } from 'data/selector';
import { Event, StoreShape } from 'data/types';
import { fetchDays } from 'data/actions';

interface AppProps {
  days: { [key: string]: Event[] };
  fetchDays(): void;
}

class App extends React.Component<AppProps, {}> {
  componentDidMount() {
    this.props.fetchDays();
  }
  render() {
    return <View days={this.props.days} />;
  }
}

const ConnectedApp = connect(
  (state: StoreShape) => ({
    days: getDays(state),
  }),
  { fetchDays },
)(App);

export { ConnectedApp as App };
