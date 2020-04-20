import * as React from 'react';
import { connect } from 'react-redux';

import { View } from 'component/view';
import { getEvents, getVizType } from 'data/selector';
import { Activity, Event, StoreShape, VizType } from 'data/types';
import { changeVizType, fetchEvents, fetchEventRange } from 'data/actions';
import { BIRTH_DATE, END_DATE } from 'data/constants';

interface AppProps {
  events: Event[];
  vizType: VizType;
  fetchEvents(date: Date, activity: Activity): void;
  fetchEventRange(start: Date, end: Date, activity: Activity): void;
  changeVizType(vizType: VizType): void;
}

class App extends React.Component<AppProps, {}> {
  componentDidMount() {
    this.props.fetchEventRange(BIRTH_DATE, END_DATE, Activity.Sleep);
    this.props.fetchEventRange(BIRTH_DATE, END_DATE, Activity.Bottle);
    this.props.fetchEventRange(BIRTH_DATE, END_DATE, Activity.Nursing);
  }
  render() {
    return (
      <View
        events={this.props.events}
        birthDate={BIRTH_DATE}
        vizType={this.props.vizType}
        changeVizType={this.props.changeVizType}
      />
    );
  }
}

const ConnectedApp = connect(
  (state: StoreShape) => ({
    events: getEvents(state),
    vizType: getVizType(state),
  }),
  { fetchEvents, fetchEventRange, changeVizType },
)(App);

export { ConnectedApp as App };
