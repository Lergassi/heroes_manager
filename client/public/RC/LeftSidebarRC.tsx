import React from 'react';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_PanelID} from '../../types/UI_PanelID.js';
import GameRC from './GameRC.js';

type LeftSidebarMenuItem = {
    panelID: UI_PanelID;
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
                {panelID: UI_PanelID.Homepage, enable: true},
                {panelID: UI_PanelID.Tavern, enable: true},
                {panelID: UI_PanelID.ItemStorages, enable: true},
                {panelID: UI_PanelID.Heroes, enable: true},
                {panelID: UI_PanelID.Farming, enable: true},
                {panelID: UI_PanelID.Construction, enable: true},
                {panelID: UI_PanelID.Production, enable: true},
                {panelID: UI_PanelID.Research, enable: false},
                {panelID: UI_PanelID.Locations, enable: true},
                {panelID: UI_PanelID.DungeonAndRaid, enable: false},
                {panelID: UI_PanelID.Auction, enable: false},
                {panelID: UI_PanelID.PvP, enable: false},
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
                        <span className={'left-sidebar__menu-text'}>{items[i].panelID}</span>
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