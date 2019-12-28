import * as React from 'react';
import { connect } from 'react-redux';

import { View } from 'component/view';
import { getDays } from 'data/selector';
import { Activity, Event, StoreShape } from 'data/types';
import { fetchEvents, fetchEventRange } from 'data/actions';
import { BIRTH_DATE } from 'data/constants';
// import { getDateSinceDay } from 'lib/date';

interface AppProps {
  sleepEvents: Event[];
  fetchEvents(date: Date, activity: Activity): void;
  fetchEventRange(start: Date, end: Date, activity: Activity): void;
}

class App extends React.Component<AppProps, {}> {
  componentDidMount() {
    this.props.fetchEventRange(BIRTH_DATE, new Date(), Activity.Sleep);
    this.props.fetchEventRange(BIRTH_DATE, new Date(), Activity.Bottle);
    this.props.fetchEventRange(BIRTH_DATE, new Date(), Activity.Nursing);
  }
  render() {
    return <View sleepEvents={this.props.sleepEvents} birthDate={BIRTH_DATE} />;
  }
}

const ConnectedApp = connect(
  (state: StoreShape) => ({
    sleepEvents: getDays(state),
  }),
  { fetchEvents, fetchEventRange },
)(App);

export { ConnectedApp as App };
