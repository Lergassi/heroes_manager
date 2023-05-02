import _ from 'lodash';
import React from 'react';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import {CommandID} from '../../../core/types/enums/CommandID.js';
import {UI_WindowOptions} from '../../types/main.js';
import ScreenshotsMainSliderRC from './ScreenshotsMainSliderRC.js';
import HelpTooltipRC from './HelpTooltipRC.js';
import {UI_TooltipPosition} from '../../../core/types/enums/UI_TooltipPosition.js';

export interface GameMenuRCProps {
    gameConsole: GameConsole;
}

interface GameMenuRCState {
    window: UI_WindowOptions;
}

export default class GameMenuRC extends React.Component<GameMenuRCProps, GameMenuRCState> {
    private _buttonCommands = [
        {
            command: CommandID.new_game,
            title: 'Сама игра.',
        },
        {
            command: CommandID.new_game + ' ' + 'basic',
            title: 'Небольшое кол-во предметов.',
        },
        {
            command: CommandID.new_game + ' ' + 'all_content',
            title: 'Весь доступный контент. Все герои (+таверна), локации, рецепты.',
        },
        {
            command: CommandID.new_game + ' ' + 'empty',
            title: 'Без контента.',
        },
        {
            command: CommandID.new_game + ' ' + 'demo',
            title: 'Использовалось для создания скриншотов. Выглядит максимально приближено к задуманному. Много объектов на десятки страниц.',
        },
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
            <div className={'menu-wrapper'}>
                <div className={'menu'}>
                    {_.map(this._buttonCommands, (command, index) => {
                        return <div key={index}>
                            <button className={'btn btn_default btn_width-200px'}
                                    onClick={this.run.bind(this, command.command)}>
                                {command.command} <HelpTooltipRC text={command.title} position={UI_TooltipPosition.Right}/>
                            </button>
                        </div>
                    })}
                </div>
                <ScreenshotsMainSliderRC
                    files={[
                        '/images/slider/slide01.png',
                        '/images/slider/slide02.png',
                        '/images/slider/slide03.png',
                        '/images/slider/slide04.png',
                        '/images/slider/slide05.png',
                        '/images/slider/slide06.png',
                        '/images/slider/slide07.png',
                        '/images/slider/slide08.png',
                        '/images/slider/slide09.png',
                    ]}
                />
            </div>
        );
    }
}