import React from 'react';
import {UI_TooltipPosition} from '../../../core/types/enums/UI_TooltipPosition.js';

interface HelpTooltipRCProps {
    text: string;
    position?: UI_TooltipPosition;
}

interface HelpTooltipRCState {

}

export default class HelpTooltipRC extends React.Component<HelpTooltipRCProps, HelpTooltipRCState> {
    private _position;

    private _default: {
        position: UI_TooltipPosition,
    } = {
        position: UI_TooltipPosition.Top,
    };

    constructor(props: HelpTooltipRCProps) {
        super(props);

        this._position = 'help-tooltip__text_' + _.lowerCase(this.props.position ?? this._default.position);
    }

    render() {
        return (
            <span>
                <span className={'help-tooltip'}>
                    <span className={'help-tooltip__icon'}>[?]</span>
                    <span className={'help-tooltip__text ' + this._position}>{this.props.text}</span>
                </span>
            </span>
        );
    }
}