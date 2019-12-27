import * as React from 'react';
import { connect } from 'react-redux';

import { View } from 'component/view';
import { getDays } from 'data/selector';
import { Event, StoreShape } from 'data/types';
import { fetchDays } from 'data/actions';
import { BIRTH_DATE } from 'data/constants';

interface AppProps {
  sleepEvents: Event[];
  fetchDays(): void;
}

class App extends React.Component<AppProps, {}> {
  componentDidMount() {
    this.props.fetchDays();
  }
  render() {
    return <View sleepEvents={this.props.sleepEvents} birthDate={BIRTH_DATE} />;
  }
}

const ConnectedApp = connect(
  (state: StoreShape) => ({
    sleepEvents: getDays(state),
  }),
  { fetchDays },
)(App);

export { ConnectedApp as App };
