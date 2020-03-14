import * as React from 'react';

import { CanvasViz } from 'component/canvas_viz';
import { SvgViz } from 'component/svg_viz';
import { VizSelector } from 'component/viz_selector';
import { Event, VizType } from 'data/types';

import { VIEW_DIMENSION, BACKGROUND_COLOR } from 'data/constants';

import * as styles from './styles.css';

interface ViewProps {
  birthDate: Date;
  events: Event[];
  vizType: VizType;
  changeVizType(vizType: VizType): void;
}

export const View: React.SFC<ViewProps> = props => (
  <div
    className={styles.container}
    style={{ backgroundColor: BACKGROUND_COLOR }}
  >
    <div className={styles.board}>
      {props.vizType === VizType.Canvas ? (
        <CanvasViz {...props} />
      ) : (
        <SvgViz {...props} dimension={VIEW_DIMENSION} />
      )}
    </div>
    <div className={styles.vizSelector}>
      <VizSelector
        vizType={props.vizType}
        changeVizType={props.changeVizType}
      />
    </div>
  </div>
);
