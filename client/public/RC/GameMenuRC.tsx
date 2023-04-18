import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import {CommandID} from '../../../core/types/enums/CommandID.js';
import {UI_WindowOptions} from '../../types/main.js';

export interface GameMenuRCProps {
    gameConsole: GameConsole;
}

interface GameMenuRCState {
    window: UI_WindowOptions;
}

export default class GameMenuRC extends React.Component<GameMenuRCProps, GameMenuRCState> {
    private _buttonCommands = [
        CommandID.new_game,
        CommandID.new_game + ' ' + 'basic',
        CommandID.new_game + ' ' + 'empty',
    ];

    constructor(props: GameMenuRCProps) {
        super(props);

        this.state = {
            window: {
                show: true,
            },
        };

        this.run = this.run.bind(this);
    }

    async run(command) {
        this.setState({
            window: {
                show: false,
            },
        } as GameMenuRCState);

        await this.props.gameConsole.runByQuery(command);
    }

    render() {
        if (!this.state.window.show) return;

        return (
            <div>
                <div>
                    {_.map(this._buttonCommands, (command, index) => {
                        return <div key={index}>
                            <button className={'btn btn_default btn_width-200px'} onClick={this.run.bind(this, command)}>{command}</button>
                        </div>
                    })}
                </div>
            </div>
        );
    }
}