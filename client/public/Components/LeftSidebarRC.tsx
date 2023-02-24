import React from 'react';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_PanelID} from '../../types/UI_PanelID.js';
import GameRC from './GameRC.js';

type LeftSidebarMenuItem = {
    panelID: UI_PanelID;
    name: string;
    icon: string;
    enable: boolean;
};

export interface LeftSidebarProps {
    // items: any;
    container: ContainerInterface;
}

export interface LeftSidebarState {
    items: LeftSidebarMenuItem[];
}

export default class LeftSidebarRC extends React.Component<LeftSidebarProps, LeftSidebarState> {
    constructor(props: LeftSidebarProps) {
        super(props);

        this.state = {
            items: [
                {panelID: UI_PanelID.Homepage, name: 'Главная', icon: '', enable: true},
                {panelID: UI_PanelID.ItemStorages, name: 'Склад', icon: '', enable: true},
                {panelID: undefined, name: 'Таверна', icon: '', enable: false},
                {panelID: UI_PanelID.Heroes, name: 'Герои', icon: '', enable: true},
                {panelID: UI_PanelID.Locations, name: 'Локации', icon: '', enable: true},
                {panelID: undefined, name: 'Крафт', icon: '', enable: false},
                {panelID: undefined, name: 'Подземелья и рейды', icon: '', enable: false},
                {panelID: undefined, name: 'Строительство', icon: '', enable: false},
                {panelID: undefined, name: 'Исследования', icon: '', enable: false},
                {panelID: undefined, name: 'PvP', icon: '', enable: false},
            ],
        };
    }

    render() {
        let items = this.state.items;

        let elements = [];
        for (let i = 0; i < items.length; i++) {
            elements.push(
                <div key={i} className={'left-sidebar__item ' + (!items[i].enable ? 'left-sidebar__item_disabled' : '')}>
                    <a href="" onClick={(event) => {
                        event.preventDefault();

                        if (!items[i].panelID) return;

                        this.props.container.get<GameRC>(ServiceID.UI_Game).showPanel(items[i].panelID);
                    }}>
                        {/*<span className={'left-sidebar__icon-wrapper'}>*/}
                        {/*    <span className={'icon icon_Question01 icon_32'}></span>*/}
                        {/*</span>*/}
                        <span className={'left-sidebar__menu-text'}>{items[i].name}</span>
                    </a>
                </div>);
        }

        return (
            <div className={'left-sidebar'}>
                {elements}
            </div>
        );
    }
}