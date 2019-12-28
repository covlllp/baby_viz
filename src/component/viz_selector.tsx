import * as React from 'react';
import { VizType } from 'data/types';

interface VizSelectorProps {
  vizType: VizType;
  changeVizType(vizType: VizType): void;
}

export class VizSelector extends React.Component<VizSelectorProps, {}> {
  constructor(props: VizSelectorProps) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  private onChange(e: React.SyntheticEvent) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const vizType = target.value as VizType;
    this.props.changeVizType(vizType);
  }

  render() {
    return (
      <div>
        {Object.values(VizType).map(vizType => (
          <VizRadio
            name={vizType}
            selected={vizType === this.props.vizType}
            key={vizType}
            onChange={this.onChange}
          />
        ))}
      </div>
    );
  }
}

interface VizRadioProps {
  selected: boolean;
  name: string;
  onChange(e: React.SyntheticEvent): void;
}

const VizRadio: React.SFC<VizRadioProps> = props => (
  <div>
    <input
      type="radio"
      name={props.name}
      value={props.name}
      checked={props.selected}
      onChange={props.onChange}
    />
    <label htmlFor={props.name}>{props.name}</label>
  </div>
);
