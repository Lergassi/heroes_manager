import React from 'react';

interface HelpTooltipRCProps {
    text: string;
}

interface HelpTooltipRCState {

}

export default class HelpTooltipRC extends React.Component<HelpTooltipRCProps, HelpTooltipRCState> {
    constructor(props: HelpTooltipRCProps) {
        super(props);
    }

    render() {
        return (
            <span>
                <span className={'help-tooltip'}>
                    <span className={'help-tooltip__icon'}>[?]</span>
                    <span className={'help-tooltip__text'}>{this.props.text}</span>
                </span>
            </span>
        );
    }
}