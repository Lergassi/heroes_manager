import React from 'react';
import ItemStorageController from '../../../core/app/Components/ItemStorageController.js';
import MainHeroList from '../../../core/app/Components/MainHeroList.js';
import MainLocationList from '../../../core/app/Components/MainLocationList.js';
import Tavern from '../../../core/app/Components/Tavern.js';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface.js';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface.js';
import {assertNotNil} from '../../../core/source/assert.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_PanelID} from '../../types/UI_PanelID.js';
import DetailHeroRC from './DetailHeroRC.js';
import DetailLocationRC from './DetailLocationRC.js';
import ItemStorageControllerRC from './ItemStorageControllerRC.js';
import LeftSidebarRC from './LeftSidebarRC.js';
import MainHeroListRC from './MainHeroListRC.js';
import MainLocationListRC from './MainLocationListRC.js';
import TavernRC from './TavernRC.js';
import WalletRC from './WalletRC.js';

export type GameRCProps = {
    container: ContainerInterface;
};

type GameRCState = {
    panels: {[ID in UI_PanelID]?: {
        ID: UI_PanelID;
        show: boolean;
    }};
    activePanel: UI_PanelID;
};

export default class GameRC extends React.Component<GameRCProps, GameRCState> {
    constructor(props: GameRCProps) {
        super(props);

        this.state = {
            panels: {
                [UI_PanelID.Homepage]: {ID: UI_PanelID.Homepage, show: false,},
                [UI_PanelID.Tavern]: {ID: UI_PanelID.Tavern, show: false,},
                [UI_PanelID.ItemStorages]: {ID: UI_PanelID.ItemStorages, show: false,},
                [UI_PanelID.Heroes]: {ID: UI_PanelID.Heroes, show: false,},
                [UI_PanelID.Locations]: {ID: UI_PanelID.Locations, show: false,},
            },
            activePanel: UI_PanelID.Homepage,
        };

        window['app']['sandbox']['showPanel'] = (ID) => {
            this.showPanel(ID);
        }

        this.props.container.set<GameRC>(ServiceID.UI_Game, this);
    }

    showPanel(ID: UI_PanelID): void {
        assertNotNil(ID);

        let panels = this.state.panels;
        _.map(panels, (panel) => {
            panel.show = panel.ID === ID;
        });

        this.setState((state) => {
            return {
                panels: panels,
            } as GameRCState;
        });
    }

    render() {
        return (
            <div>
                <div className={'header'}>
                    <div className={'header__site-title'}>
                        HEROES MANAGER
                    </div>
                </div>
                <div className={'container'}>
                    <LeftSidebarRC
                        container={this.props.container}
                    />
                    <div className={'content'}>
                        <TavernRC
                            container={this.props.container}
                            tavern={this.props.container.get<Tavern>(ServiceID.Tavern)}
                            window={{
                                show: this.state.panels.Tavern.show,
                            }}
                        />

                        <MainHeroListRC
                            container={this.props.container}
                            mainHeroList={this.props.container.get<MainHeroList>(ServiceID.MainHeroList)}
                            window={{
                                show: this.state.panels.Heroes.show,
                            }}
                        />
                        <DetailHeroRC
                            container={this.props.container}
                            itemStorage={this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController)}
                            window={{
                                show: this.state.panels.Heroes.show,
                            }}
                        />

                        <MainLocationListRC
                            container={this.props.container}
                            mainLocationList={this.props.container.get<MainLocationList>(ServiceID.MainLocationList)}
                            window={{
                                show: this.state.panels.Locations.show,
                            }}
                        />
                        <DetailLocationRC
                            container={this.props.container}
                            mainHeroList={this.props.container.get<MainHeroList>(ServiceID.MainHeroList)}
                            window={{
                                show: this.state.panels.Locations.show,
                            }}
                        />

                        <WalletRC
                            container={this.props.container}
                            wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}
                            window={{
                                show: this.state.panels.ItemStorages.show,
                            }}
                        />
                        <ItemStorageControllerRC
                            container={this.props.container}
                            itemStorageController={this.props.container.get<ItemStorageController>(ServiceID.ItemStorageController)}
                            window={{
                                show: this.state.panels.ItemStorages.show,
                            }}
                        />
                    </div>{/*content*/}
                </div>{/*container*/}
            </div>
        );
    }
}