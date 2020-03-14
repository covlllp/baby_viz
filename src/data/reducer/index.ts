import { Action, StoreShape, VizType } from 'data/types';
import { Actions } from 'data/actions';

const initialState: StoreShape = {
  events: [],
  vizType: VizType.Svg,
};

export function reducer(state = initialState, action: Action): StoreShape {
  switch (action.type) {
    case Actions.DAYS_SUCCESS: {
      return {
        ...state,
        events: [...state.events, ...action.payload],
      };
    }
    case Actions.CHANGE_VIZ_TYPE: {
      return {
        ...state,
        vizType: action.payload,
      };
    }
    default:
      return state;
  }
}
