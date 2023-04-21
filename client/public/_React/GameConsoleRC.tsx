import React from 'react';
import {assertNotEmpty} from '../../../core/source/assert.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import GameConsole from '../../../core/source/GameConsole/GameConsole.js';
import {DebugNamespaceID} from '../../../core/types/enums/DebugNamespaceID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import DebugApp from '../../../core/app/Services/DebugApp.js';
import MessageHistoryRC from '../RC/MessageHistoryRC.js';

export interface GameConsoleProps {
    container: ContainerInterface;
    executeUrl: string;
    commandNames: string[] | undefined;
}

interface GameConsoleState {
    value: any,
    focus: boolean;
}

export default class GameConsoleRC extends React.Component<GameConsoleProps, GameConsoleState> {
    // private _buttonCommands = [
    //     CommandID.new_game,
    //     CommandID.new_game + ' ' + 'empty',
    //     CommandID.new_game + ' ' + 'all_content',
    //     CommandID.create_location,
    // ];

    private readonly _container: ContainerInterface;

    private readonly _executeUrl;

    private readonly _commandNames;

    private _autoCompleteList;
    private _isAutoCompleteHandling;
    private _autoCompletePosition;

    private readonly _history;
    private _currentHistoryPosition;
    private readonly _maxHistoryLength;

    private _defaults = {
        maxHistoryLength: 100,
    };

    constructor(props: GameConsoleProps) {
        super(props);

        assertNotEmpty(props.executeUrl, 'executeUrl не может быть пустым.')

        this.state = {
            value: '',
            focus: false,
        };

        this._container = props.container;

        this._executeUrl = props.executeUrl;

        this._commandNames = props.commandNames || [];

        this._autoCompleteList = [];
        this._isAutoCompleteHandling = false;
        this._autoCompletePosition = 0;

        this._history = [];
        this._maxHistoryLength = this._defaults.maxHistoryLength;

        this.resetHistoryPosition();

        this.handleChange = this.handleChange.bind(this);
        this.keyPressHandler = this.keyPressHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this._queryHandler = this._queryHandler.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.updateAutoCompleteList(event.target.value);
        this.resetAutoCompletePosition();
    }

    updateAutoCompleteList(value) {
        this.clearAutoCompleteList();
        this.autoCompleteHandlingDisable();
        for (let i = 0; i < this._commandNames.length; i++) {
            if (value && this._commandNames[i].indexOf(value) === 0) {
                this._autoCompleteList.push(this._commandNames[i]);
            }
        }
    }

    resetAutoCompletePosition() {
        this._autoCompletePosition = 0;
    }

    autoCompleteHandlingEnable() {
        this._isAutoCompleteHandling = true;
    }

    autoCompleteHandlingDisable() {
        this._isAutoCompleteHandling = false;
    }

    keyDownHandler(e) {
        if (['ArrowUp', 'ArrowDown', 'Tab'].indexOf(e.code) === -1) {
            return;
        }

        if (e.code === 'Tab') {
            e.preventDefault();
            this.autoCompleteHandlingEnable();
            if (!this._autoCompleteList.length) {
                return;
            }

            this.setState({value: this._autoCompleteList[this._autoCompletePosition]});
            if (this._autoCompletePosition + 1 >= this._autoCompleteList.length) {
                this._autoCompletePosition = 0;
            } else {
                this._autoCompletePosition++;
            }

            return;
        }

        if (!this._history.length) {
            return;
        }

        e.preventDefault();

        let command = '';
        let nextHistoryPosition = undefined;
        switch (e.code) {
            case 'ArrowUp':
                nextHistoryPosition = this._currentHistoryPosition - 1;
                break;
            case 'ArrowDown':
                nextHistoryPosition = this._currentHistoryPosition + 1;
                break;
        }

        if (nextHistoryPosition >= 0 && nextHistoryPosition <= (this._history.length - 1)) {
            command = this._history[nextHistoryPosition];
            this.setState({value: command});
            this._currentHistoryPosition = nextHistoryPosition;
            this.updateAutoCompleteList(command);
        } else if (nextHistoryPosition > (this._history.length - 1)) {
            this.setState({value: ''});
            this.resetHistoryPosition();
            this.updateAutoCompleteList('');
        }
    }

    resetHistoryPosition() {
        this._currentHistoryPosition = this._history.length;
    }

    clearAutoCompleteList() {
        this._autoCompleteList = [];
    }

    resetAutoComplete() {
        this.clearAutoCompleteList();
        this.autoCompleteHandlingDisable();
        this._autoCompletePosition = 0;
    }

    render() {
        return (
            <div className={'game-console game-console_bottom'}>
                <div>
                    <MessageHistoryRC
                        container={this.props.container}
                        focus={this.state.focus}
                    />
                </div>
                <div className={'game-console-autocomplete-list-wrapper'}>
                    {/*todo: Сделать в виде отдельного компонента. Только рендер.*/}
                    <ul className={'game-console-autocomplete-list list-without-types'}>
                        {this._autoCompleteList.map(command => (
                            <li className={this._isAutoCompleteHandling && (command === this.state.value) ? 'game-console-autocomplete-list__selected' : ''}
                                key={command}>{command}</li>
                        ))}
                    </ul>
                </div>
                <input
                    className={'game-console__input'}
                    autoFocus
                    type="text"
                    placeholder="Enter command..."
                    onKeyPress={this.keyPressHandler}
                    onChange={this.handleChange}
                    onKeyDown={this.keyDownHandler}
                    value={this.state.value}
                    onFocus={(event) => {
                    // onfocusin={(event) => {
                        console.log('onFocus', event.target.value);
                        this.setState((state) => {
                            return {
                                focus: true,
                            } as GameConsoleState;
                        });
                    }}
                    onBlur={(event) => {
                        console.log('onfocusout', event.target.value);
                        this.setState((state) => {
                            return {
                                focus: false,
                            } as GameConsoleState;
                        });
                    }}
                />
                {/*<div>*/}
                {/*    {_.map(this._buttonCommands, (command, index) => {*/}
                {/*        return <div key={index}>*/}
                {/*            <button className={'btn btn_default btn_width-200px'} onClick={this._queryHandler.bind(this, command)}>{command}</button>*/}
                {/*        </div>*/}
                {/*    })}*/}
                {/*</div>*/}
            </div>
        );
    }

    private async _queryHandler(query: string) {
        this.resetAutoComplete();

        let commandString = query.trim();
        this.setState({value: ''});

        if (!commandString.length) {
            return;
        }

        let resultUrl = this._executeUrl + '?command=' + commandString;
        if (this._history.length >= this._maxHistoryLength) {
            this._history.shift();
        }
        if (this._history[this._history.length - 1] !== commandString) {
            this._history.push(commandString);
        }
        this.resetHistoryPosition();

        DebugApp.debug(DebugNamespaceID.GameConsole)(resultUrl);

        await this._container.get<GameConsole>(ServiceID.GameConsole).runByQuery(commandString);
    }

    /**
     * Только для Enter.
     * @param e
     */
    private async keyPressHandler(e) {
        switch (e.code) {
            case 'Enter':
            case 'NumpadEnter':
                this._queryHandler(e.target.value);

                // fetch(resultUrl)
                //     .then((response) => {
                //         if (response.ok) {
                //             if (response.headers.get('content-type')?.includes('application/json')) {
                //                 return response.json();
                //             } else {
                //                 throw new Error('Ошибка при обработки response. Неверный формат данных. Ожидался json.');
                //             }
                //         } else {
                //             console.log('DEBUG', 'http error', response);
                //             throw new Error('Ошибка HTTP: ' + response.status);
                //         }
                //     })
                //     .then((json) => {
                //         if (json.error) {
                //             // console.log('DEBUG', 'json.error', json.error);
                //             throw new Error(json.error);
                //         }
                //
                //         console.log('DEBUG', 'data', json);
                //         // console.log(json.json);
                //     })
                //     .catch((error) => {
                //         console.log('DEBUG', 'fetch catch error', error);
                //     })
                // ;//end fetch

                break;  //Enter, NumpadEnter
        }//end switch(e.code)
    }
}