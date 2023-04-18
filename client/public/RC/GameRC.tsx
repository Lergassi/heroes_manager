import React from 'react';
import Production from '../../../core/app/Components/Production';
import ItemStorageController from '../../../core/app/Components/ItemStorages/ItemStorageController.js';
import MainHeroList from '../../../core/app/Components/MainHeroList.js';
import MainLocationList from '../../../core/app/Components/MainLocationList.js';
import Tavern from '../../../core/app/Components/Tavern.js';
import Tavern_v2 from '../../../core/app/Components/Tavern_v2.js';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface.js';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface.js';
import {assertNotNil} from '../../../core/source/assert.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {HeroClassID} from '../../../core/types/enums/HeroClassID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import {UI_PanelID} from '../../types/UI_PanelID.js';
import DetailHeroRC from './DetailHeroRC.js';
import DetailLocationRC from './DetailLocationRC.js';
import ItemStorageControllerRC from './ItemStorageControllerRC.js';
import LeftSidebarRC from './LeftSidebarRC.js';
import MainHeroListRC from './MainHeroListRC.js';
import MainLocationListRC from './MainLocationListRC.js';
import ProductionRC from './ProductionRC';
import TavernRC from './TavernRC.js';
import TavernRC_v2 from './TavernRC_v2.js';
import WalletMoneyValueRC from './WalletMoneyValueRC.js';
import WalletRC from './WalletRC.js';
import ProductionListRC from "./ProductionListRC";
import {ConstructionRC} from './ConstructionRC';
import {Construction} from '../../../core/app/Components/Construction';
import {FarmingRC} from './FarmingRC';
import {Farming} from '../../../core/app/Components/Farming';

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
                [UI_PanelID.Production]: {ID: UI_PanelID.Production, show: false,},
                [UI_PanelID.Farming]: {ID: UI_PanelID.Farming, show: false,},
                [UI_PanelID.Construction]: {ID: UI_PanelID.Construction, show: false,},
            },
            activePanel: UI_PanelID.Homepage,
        };

        window['app']['sandbox']['showPanel'] = (ID) => {
            this.showPanel(ID);
        }

        this.props.container.set<GameRC>(ServiceID.UI_Game, this);

        this._configWindowSandbox();
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
                    <div className={'header__wallet-money-counter'}>
                        WalletMoneyValueRC: <WalletMoneyValueRC
                            container={this.props.container}
                            wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}
                        />
                    </div>
                </div>
                <div className={'container'}>
                    <LeftSidebarRC
                        container={this.props.container}
                    />
                    <div className={'content'}>
                        {/*<TavernRC*/}
                        {/*    container={this.props.container}*/}
                        {/*    tavern={this.props.container.get<Tavern>(ServiceID.Tavern)}*/}
                        {/*    window={{*/}
                        {/*        show: this.state.panels.Tavern.show,*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <TavernRC_v2
                            container={this.props.container}
                            tavern={this.props.container.get<Tavern_v2>(ServiceID.Tavern_v2)}
                            mainHeroList={this.props.container.get<MainHeroList>(ServiceID.MainHeroList)}
                            wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}
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

                        {/*<WalletRC*/}
                        {/*    container={this.props.container}*/}
                        {/*    wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}*/}
                        {/*    window={{*/}
                        {/*        show: this.state.panels.ItemStorages.show,*/}
                        {/*    }}*/}
                        {/*/>*/}
                        <ItemStorageControllerRC
                            container={this.props.container}
                            itemStorageController={this.props.container.get<ItemStorageController>(ServiceID.ItemStorageController)}
                            window={{
                                show: this.state.panels.ItemStorages.show,
                            }}
                        />

                        <ProductionListRC
                            container={this.props.container}
                            window={{
                                show: this.state.panels.Production.show,
                            }}
                        />

                        <ConstructionRC
                            container={this.props.container}
                            construction={this.props.container.get<Construction>(ServiceID.Construction)}
                            window={{
                                show: this.state.panels.Construction.show,
                            }}
                        />

                        <FarmingRC
                            container={this.props.container}
                            farming={this.props.container.get<Farming>(ServiceID.Farming)}
                            window={{
                                show: this.state.panels.Farming.show,
                            }}
                        />

                        {/*<ProductionRC*/}
                        {/*    container={this.props.container}*/}
                        {/*    production={this.props.container.get<Production>(ServiceID.Production)}*/}
                        {/*    playerItemStorage={this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController)}*/}
                        {/*    wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}*/}
                        {/*    window={{*/}
                        {/*        show: this.state.panels.Production.show,*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </div>{/*content*/}
                </div>{/*container*/}
            </div>
        );
    }

    private _configWindowSandbox(): void {
        window['app']['sandbox']['buildGardenBed'] = () => {
            this.props.container.get<Farming>(ServiceID.Farming).buildGardenBed(
                this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController),
                this.props.container.get<WalletInterface>(ServiceID.Wallet),
            );
        };
    }
}