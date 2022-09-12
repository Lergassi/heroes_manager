import React from 'react';

export default class Span extends React.Component<any, any>{
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
        };
    }

    render() {
        return (<span>{this.state.value}</span>);
    }
}