import React from 'react';
import ContainerInterface from '../../../core/source/ContainerInterface';
import {UI_WindowOptions} from '../../types/main';
import {Farming} from '../../../core/app/Components/Farming';
import {ItemID} from '../../../core/types/enums/ItemID';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface';
import UIUpdater from '../../app/UIUpdater';
import {ServiceID} from '../../../core/types/enums/ServiceID';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface';
import {ItemStorageItemSelectRC} from './ItemStorageItemSelectRC';
import ItemStorageController from '../../../core/app/Components/ItemStorages/ItemStorageController';
import {database} from '../../../core/data/ts/database';
import * as fns from 'date-fns';
import {GardenBed} from '../../../core/app/Components/GardenBed';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface';

export type UI_GardenBed = {
    gardenBed: GardenBed;   //Для управления.
    seedID: ItemID;
    startGrowth: Date;
}

interface FarmingRCProps {
    container: ContainerInterface;
    farming: Farming;
    window: UI_WindowOptions;
}

interface FarmingRCState {
    gardenBeds: UI_GardenBed[];
    window: UI_WindowOptions;
}

export interface FarmingRCInterface {
    // updateGardenBed?(index: number, seedID: ItemID, startGrow: Date): void;
    updateGardenBed?(gardenBeds: UI_GardenBed[]): void;
    updateMaxGardenBed?(value: number): void;
}

export interface FarmingRenderInterface {
    renderByRequest(UI: FarmingRCInterface): void;
}

export class FarmingRC extends React.Component<FarmingRCProps, FarmingRCState> implements FarmingRCInterface, RCUpdateInterface {
    constructor(props: FarmingRCProps) {
        super(props);

        this.state = {
            gardenBeds: [],
            window: {show: true},
        };

        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    updateByRequest(): void {
        //todo: Это наверное можно вызвать в UIUpdater.
        this.props.farming.renderByRequest(this);
    }

    updateGardenBed(gardenBeds: UI_GardenBed[]): void {
        this.setState((state) => {
            return {
                gardenBeds: gardenBeds,
            } as FarmingRCState;
        });
    }

    updateMaxGardenBed(value: number): void {
    }

    render() {
        if (!(this.state.window.show && this.props.window.show)) return;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>FarmingRC</div>
                    <div className={'widget__content'}>
                        <button className={'btn btn_default'} onClick={(event) => {
                            event.preventDefault();
                            this.props.farming.buildGardenBed(
                                this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController),
                                this.props.container.get<WalletInterface>(ServiceID.Wallet),
                            );
                        }}>BUILD</button>
                        <table className={'basic-table'}>
                            <tbody>
                                {_.map(this.state.gardenBeds, (gardenBed, index, collection) => {
                                    return <tr key={index}>
                                        <td>
                                            {gardenBed.gardenBed.isFree() ?
                                                'Free' :
                                                (<span>
                                                    {gardenBed.seedID}:
                                                </span>)
                                            }
                                        </td>
                                        <td>
                                            {gardenBed.gardenBed.isFree() ?
                                                'Free' :
                                                (<span>
                                                    {fns.format(new Date(gardenBed.startGrowth.getTime() + database.seeds.find(gardenBed.seedID).growthDuration * 1000), 'dd.MM.yyyy HH:mm:ss')}
                                                </span>)
                                            }
                                        </td>
                                        <td>
                                            {
                                                gardenBed.gardenBed.isFree() ?
                                                    (<ItemStorageItemSelectRC
                                                        container={this.props.container}
                                                        itemStorageController={this.props.container.get<ItemStorageController>(ServiceID.ItemStorageController)}
                                                        handler={(itemID, itemStorage) => {
                                                            this.props.farming.plant(index, itemID, itemStorage);
                                                        }}
                                                    />) :
                                                    (<button className={'btn btn_default'} onClick={(event) => {
                                                        event.preventDefault();
                                                        this.props.farming.harvest(
                                                            index,
                                                            this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController),
                                                        );
                                                    }}>HARVEST</button>)
                                            }
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>{/*end widget__content*/}
                </div>{/*end widget*/}
            </div>
        );
    }
}