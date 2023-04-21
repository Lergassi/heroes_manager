import React from 'react';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';

interface MessageHistoryRCProps {
    container: ContainerInterface;
    focus: boolean;
}

interface MessageHistoryRCState {
    messages: string[];
}

export default class MessageHistoryRC extends React.Component<MessageHistoryRCProps, MessageHistoryRCState> {
    private readonly _options = {
        max: 200,
        // max: 10,
    };

    constructor(props: MessageHistoryRCProps) {
        super(props);

        this.state = {
            messages: [],
        };

        this.props.container.set<MessageHistoryRC>(ServiceID.UI_MessageHistory, this);
        // console.log('window', window);
    }

    componentDidMount() {
        // let historyElement = document.getElementsByClassName('message-history');
        // // console.log(historyElement[0]);
        // historyElement[0].scrollTop = 1231231;
    }

    add(message: any) {
        this.setState((state) => {
            let messages = [...state.messages];

            if (messages.length >= this._options.max) {
                _.pullAt(messages, 0);
            }

            messages.push(message);

            let historyElement = document.getElementsByClassName('message-history')[0];
            if (historyElement) historyElement.scrollTop = 42000000;

            return {
                messages: messages,
            } as MessageHistoryRCState;
        });
    }

    render() {
        return (
            <div className={'message-history ' + (this.props.focus ? 'message-history_full-height' : '')}>
                <ul>
                    {_.map(this.state.messages, (message, index) => {
                        return <li key={index}>{message}</li>
                    })}
                </ul>
            </div>
        );
    }
}