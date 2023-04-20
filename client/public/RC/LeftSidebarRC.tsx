import React from 'react';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_PanelID} from '../../types/UI_PanelID.js';
import GameRC from './GameRC.js';
import {sprintf} from 'sprintf-js';
import {database} from '../../../core/data/ts/database.js';
import {IconID} from '../../../core/types/enums/IconID.js';

type LeftSidebarMenuItem = {
    panelID: UI_PanelID;
    iconId: string;
    enable: boolean;
};

export interface LeftSidebarProps {
    container: ContainerInterface;
}

export interface LeftSidebarState {
    items: LeftSidebarMenuItem[];
    activePanel: string;
}

export default class LeftSidebarRC extends React.Component<LeftSidebarProps, LeftSidebarState> {
    constructor(props: LeftSidebarProps) {
        super(props);

        let activePanel = UI_PanelID.Heroes;

        this.state = {
            items: [
                // {panelID: UI_PanelID.Homepage, iconId: IconID.Home01, enable: true},
                {panelID: UI_PanelID.Dashboard, iconId: IconID.Home01, enable: false},
                {panelID: UI_PanelID.Feed, iconId: IconID.Home01, enable: false},
                {panelID: UI_PanelID.Heroes, iconId: IconID.Knight01, enable: true},
                {panelID: UI_PanelID.Locations, iconId: IconID.Location01, enable: true},
                {panelID: UI_PanelID.ItemStorages, iconId: IconID.Chest01, enable: true},
                {panelID: UI_PanelID.Tavern, iconId: IconID.Brewery01, enable: true},
                {panelID: UI_PanelID.Construction, iconId: IconID.Brickwall01, enable: true},
                {panelID: UI_PanelID.Farming, iconId: IconID.Farming01, enable: true},
                {panelID: UI_PanelID.Production, iconId: IconID.Production01, enable: true},
                {panelID: UI_PanelID.DungeonAndRaid, iconId: IconID.Dungeon01, enable: false},
                {panelID: UI_PanelID.Research, iconId: IconID.Research01, enable: false},
                {panelID: UI_PanelID.Auction, iconId: IconID.Growth01, enable: false},
                {panelID: UI_PanelID.PvP, iconId: IconID.TwoSword01, enable: false},
                {panelID: UI_PanelID.Inbox, iconId: IconID.Question02, enable: false},
                {panelID: UI_PanelID.Calendar, iconId: IconID.Question02, enable: false},
                {panelID: UI_PanelID.Guild, iconId: IconID.Question02, enable: false},
            ],
            activePanel: activePanel,
        };

        this.props.container.get<GameRC>(ServiceID.UI_Game).showPanel(activePanel);
    }

    render() {
        let items = this.state.items;

        let elements = [];
        for (let i = 0; i < items.length; i++) {
            elements.push(
                <div key={i} className={'left-sidebar__item ' + (items[i].panelID === this.state.activePanel ? 'left-sidebar__item_active ' : '') + (!items[i].enable ? 'left-sidebar__item_disabled' : '')}>
                    <a href="" onClick={(event) => {
                        event.preventDefault();

                        if (!items[i].panelID) return;

                        this.props.container.get<GameRC>(ServiceID.UI_Game).showPanel(items[i].panelID);
                        this.setState((state) => {
                            return {
                                activePanel: items[i].panelID,
                            } as LeftSidebarState;
                        });
                    }}>
                        <span className={sprintf("icon icon_%s icon_32 left-sidebar__icon", items[i].iconId)}></span>
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