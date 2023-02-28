import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Production from '../../../core/app/Components/Craft/Production.js';
import MainHeroList from '../../../core/app/Components/MainHeroList.js';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface.js';
import {database} from '../../../core/data/ts/database.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ItemID} from '../../../core/types/enums/ItemID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import {UI_WindowOptions} from '../../types/main.js';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface.js';

export type UI_ProductionItem = {
    itemID: ItemID;
    //Всё остальное из бд.
    // resultCount: ItemID;
    // requireItemIDs: ItemID;
}

export interface ProductionRCProps {
    container: ContainerInterface;
    production: Production;
    playerItemStorage: ItemStorageInterface;
    window: UI_WindowOptions;
}

interface ProductionRCState {
    items: UI_ProductionItem[];
    window: UI_WindowOptions;
}

export interface ProductionRCInterface {
    updateItems?(items: UI_ProductionItem[]): void;
}

export interface ProductionRenderInterface {
    renderByRequest(UI: ProductionRCInterface): void
}

export default class ProductionRC extends React.Component<ProductionRCProps, ProductionRCState> implements ProductionRCInterface, RCUpdateInterface {
    constructor(props: ProductionRCProps) {
        super(props);

        this.state = {
            items: [],
            window: {show: true},
        };

        this.props.container.get<UIUpdater>(ServiceID.UI_Updater).add(this);
    }

    updateByRequest(): void {
        if (!(this.state.window.show && this.props.window.show)) return;

        this.props.production.renderByRequest(this);
    }

    updateItems(items: UI_ProductionItem[]): void {
        this.setState((state) => {
            return {
                items: items,
            } as ProductionRCState;
        });
    }

    render() {
        if (!(this.state.window.show && this.props.window.show)) return;

        return (
            <div>
                <div className={'widget'}>
                    <div className={'widget__title'}>Производство</div>
                    <div className={'widget__content'}>
                        <button className={'btn btn_default'} onClick={(event) => {
                            event.preventDefault();
                            this.props.production.getPreviousProduction(this.props.playerItemStorage);
                        }
                        }>getPreviousProduction</button>
                        <table className={'basic-table'}>
                            <tbody>
                                {_.map(this.state.items, (item, index, collection) => {
                                    return <tr key={index}>
                                        <td>{item.itemID}</td>
                                        <td>{database.recipes.data.resultCount(item.itemID)}</td>
                                        {/*<td>{database.items.}</td>*/}
                                        <td>{database.recipes.data.requireItems(item.itemID, (ID, count) => {
                                            return <div key={ID}>{ID}: {count}</div>
                                        })}</td>
                                        <td>
                                            <button className={'btn btn_default'} onClick={(event) => {
                                                event.preventDefault();
                                                this.props.production.createItem(item.itemID, this.props.playerItemStorage);
                                            }
                                            }>create</button>
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