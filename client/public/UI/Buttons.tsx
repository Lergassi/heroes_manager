import React from 'react';

export default class Buttons extends React.Component<any, any> {
    render() {
        return (
            <div>
                <button className={'btn btn_default'}>Default</button>
                <button className={'btn btn_info'}>Info</button>
                <button className={'btn btn_primary'}>Primary</button>
                <button className={'btn btn_success'}>Success</button>
                <button className={'btn btn_warring'}>Warring</button>
                <button className={'btn btn_danger'}>Danger</button>
            </div>
        );
    }
}