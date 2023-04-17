import React from 'react';

interface TimerValueRCProps {
    seconds: number;
    options?: {
        autoReset?: boolean,
    };
}

interface TimerValueRCState {
    seconds: number;
}

export default class TimerValueRC extends React.Component<TimerValueRCProps, TimerValueRCState> {
    constructor(props: TimerValueRCProps) {
        super(props);

        this.state = {
            seconds: props.seconds,
        };

        setInterval(() => {
            this.setState((state) => {
                if (state.seconds <= 0) {
                    if (this.props.options?.autoReset) {
                        this.reset();
                    }

                    return;
                }

                let seconds = state.seconds - 1;

                return {
                    seconds: seconds,
                } as TimerValueRCState;
            });
        }, 1000);
    }

    reset() {
        this.setState((state) => {
            return {
                seconds: this.props.seconds,
            } as TimerValueRCState;
        });
    }

    render() {
        return (
            <span>
                {this.state.seconds}
            </span>
        );
    }
}