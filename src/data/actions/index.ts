import { mapValues } from 'lodash';
import { createAction } from 'redux-actions';

import { Action, Event, Activity, VizType } from 'data/types';
import {
  fetchEvents as fetchEventsApi,
  fetchEventRange as fetchEventRangeApi,
} from 'api';

export const Actions = {
  DAYS_FETCH: 'DAYS_FETCH',
  DAYS_SUCCESS: 'DAYS_SUCCESS',
  DAYS_FAILED: 'DAYS_FAILED',
  CHANGE_VIZ_TYPE: 'CHANGE_VIZ_TYPE',
};

const actionCreators = mapValues(Actions, action => createAction(action));

type Dispatch = (action: Action) => void;

export function fetchEvents(date: Date, activity: Activity) {
  return (dispatch: Dispatch): Promise<void> => {
    dispatch(actionCreators.DAYS_FETCH());
    return fetchEventsApi(date, activity)
      .then((data: Event[]) => {
        dispatch(actionCreators.DAYS_SUCCESS(data));
      })
      .catch(err => {
        dispatch(actionCreators.DAYS_FAILED(err));
      });
  };
}

export function fetchEventRange(start: Date, end: Date, activity: Activity) {
  return (dispatch: Dispatch): Promise<void> => {
    dispatch(actionCreators.DAYS_FETCH());
    return fetchEventRangeApi(start, end, activity)
      .then((data: Event[]) => {
        dispatch(actionCreators.DAYS_SUCCESS(data));
      })
      .catch(err => {
        dispatch(actionCreators.DAYS_FAILED(err));
      });
  };
}

export function changeVizType(vizType: VizType) {
  return (dispatch: Dispatch) =>
    dispatch(actionCreators.CHANGE_VIZ_TYPE(vizType));
}
