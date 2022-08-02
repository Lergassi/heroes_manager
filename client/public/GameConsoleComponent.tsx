import React from 'react';
import AppError from '../../core/source/AppError.js';
import debug from 'debug';

export interface GameConsoleOptions {
    executeUrl: string;
    commands: string[] | undefined;
    maxHistoryLength: number | undefined;
}

export default class GameConsoleComponent extends React.Component<any, any>{
    _executeUrl;

    _commands;

    _autoCompleteList;
    _isAutoCompleteHandling;
    _autoCompletePosition;

    _history;
    _currentHistoryPosition;
    _maxHistoryLength;

    _defaults = {
        commands: [],
        maxHistoryLength: 100,
    };

    constructor(props: GameConsoleOptions) {
        super(props);

        if (!props.executeUrl) {
            throw new AppError('executeUrl не может быть пустым.');
        }

        this._executeUrl = props.executeUrl;

        this._commands = props.commands || this._defaults.commands;

        this._autoCompleteList = [];
        this._isAutoCompleteHandling = false;
        this._autoCompletePosition = 0;

        this._history = [];
        this._maxHistoryLength = props.maxHistoryLength || this._defaults.maxHistoryLength;
        this.resetHistoryPosition();

        this.state = {
            value: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.keyPressHandler = this.keyPressHandler.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);

        //todo: logger
        console.log('Client: GameConsoleComponent created.');

        // debug.enable('*');
        console.log(1, debug.enabled('*'));
        debug('info')('this is debug info');
        debug('debug')('this is debug debug');
        console.log('this is log');
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        this.updateAutoCompleteList(event.target.value);
        this.resetAutoCompletePosition();
    }

    updateAutoCompleteList(value) {
        this.clearAutoCompleteList();
        this.autoCompleteHandlingDisable();
        for (let i = 0; i < this._commands.length; i++) {
            if (value && this._commands[i].indexOf(value) === 0) {
                this._autoCompleteList.push(this._commands[i]);
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

    keyPressHandler(e) {
        switch(e.code) {
            case 'Enter':
            case 'NumpadEnter':
                let commandString = e.target.value.trim();
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

                fetch(resultUrl)
                    .then((response) => {
                        if (response.ok) {
                            if (response.headers.get('content-type')?.includes('application/json')) {
                                return response.json();
                            } else {
                                throw new Error('Ошибка при обработки response. Неверный формат данных. Ожидался json.');
                            }
                        } else {
                            console.log('DEBUG', 'http error', response);
                            throw new Error('Ошибка HTTP: ' + response.status);
                        }
                    })
                    .then((json) => {
                        if (json.error) {
                            // console.log('DEBUG', 'json.error', json.error);
                            throw new Error(json.error);
                        }

                        console.log('DEBUG', 'data', json);
                        // console.log(json.json);
                    })
                    .catch((error) => {
                        console.log('DEBUG', 'fetch catch error', error);
                    })
                ;

                this.resetAutoComplete();
                break;  //Enter, NumpadEnter
        }
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

    debug() {
        console.log(this._history);
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
            <div
                className={'game-console'}
            >
            <input
                className={'game-console__input'}
        autoFocus
        type="text"
        placeholder="Enter command..."
        onKeyPress={this.keyPressHandler}
        onChange={this.handleChange}
        onKeyDown={this.keyDownHandler}
        value={this.state.value}
        />
        <div
        className={'game-console-autocomplete-list-wrapper'}

            >
            {/*todo: Сделать в виде отдельного компонента. Только рендер.*/}
            <ul className={'game-console-autocomplete-list list-without-types'}>
            {this._autoCompleteList.map(command => (
                    <li className={this._isAutoCompleteHandling && (command === this.state.value) ? 'game-console-autocomplete-list__selected' : ''} key={command}>{command}</li>
    ))}
        </ul>
        </div>
        </div>
    );
    }
}