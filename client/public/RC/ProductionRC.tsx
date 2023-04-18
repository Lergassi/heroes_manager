import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Production from '../../../core/app/Components/Production';
import MainHeroList from '../../../core/app/Components/MainHeroList.js';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface.js';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface.js';
import {database} from '../../../core/data/ts/database.js';
import ContainerInterface from '../../../core/source/ContainerInterface.js';
import {ItemID} from '../../../core/types/enums/ItemID.js';
import {ServiceID} from '../../../core/types/enums/ServiceID.js';
import UIUpdater from '../../app/UIUpdater.js';
import {UI_WindowOptions} from '../../types/main.js';
import RCUpdateInterface from '../Interfaces/RCUpdateInterface.js';
import {sprintf} from 'sprintf-js';

export type UI_ProductionItem = {
    itemID: ItemID;
}

export interface ProductionRCProps {
    container: ContainerInterface;
    production: Production;
    playerItemStorage: ItemStorageInterface;
    wallet: WalletInterface;
    title?: string; //todo: Идея. Такие данные можно выделить в отдельный объект.
    window: UI_WindowOptions;
}

interface ProductionRCState {
    title: string;
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
            title: this.props.title ?? 'Production',
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
                    <div className={'widget__title'}>{this.state.title} (ProductionRC)</div>
                    <div className={'widget__content'}>
                        <div className={'block'}>
                            <button className={'btn btn_default'} onClick={(event) => {
                                event.preventDefault();
                                this.props.production.getPreviousProduction(this.props.playerItemStorage);
                            }
                            }>GET_PREVIOUS_PRODUCTION</button>
                        </div>
                        <table className={'basic-table'}>
                            <tbody>
                                <tr>
                                    <th className={'production-table-column-name'}>ITEM_ID</th>
                                    <th className={'production-table-column-item-category'}>ITEM_CATEGORY_ID</th>
                                    {/*<th>AP</th>*/}
                                    {/*<th>HP</th>*/}
                                    {/*<th>STR/AGI/INT</th>*/}
                                    <th className={'production-table-column-result-count'}>RESULT_COUNT</th>
                                    <th className={'production-table-column-require-items'}>REQUIRE_ITEMS</th>
                                    <th className={'production-table-column-cost'}>COST</th>
                                    <th className={'production-table-column-ctrl'}>CTRL</th>
                                </tr>
                                {_.map(this.state.items, (item, index, collection) => {
                                    return <tr key={index}>
                                        <td>
                                            {/*todo: При использовании sprintf не работает замена.*/}
                                            <span className={sprintf("icon icon_%s icon_32 icon_first-column-column-padding", database.items.data.iconId(item.itemID))}></span>
                                            <span className={'first-table-column-padding-for-icon'}>{item.itemID}</span>
                                        </td>
                                        <td>{database.items.data.itemCategory(item.itemID)}</td>
                                        {/*<td>{database.items.data.attackPower(item.itemID)}</td>*/}
                                        {/*<td>{database.items.data.healthPoints(item.itemID)}</td>*/}
                                        {/*<td>{database.items.data.strength(item.itemID)}/{database.items.data.agility(item.itemID)}/{database.items.data.intelligence(item.itemID)}</td>*/}
                                        <td>{database.recipes.data.resultCount(item.itemID)}</td>
                                        <td>{database.recipes.data.requireItems(item.itemID, (itemID, count) => {
                                            return <div key={itemID}>{itemID}: {count}/{this.props.playerItemStorage.containItem(itemID)}</div>
                                        })}</td>
                                        {/*todo: Возможная ошибка. Данные берутся не из бд, а из другого логического компонента. При этом из компонента производства считываются только ID доступных предметов. */}
                                        <td>{database.recipes.data.cost(item.itemID)}/{this.props.container.get<WalletInterface>(ServiceID.Wallet).value}</td>
                                        <td>
                                            <button className={'btn btn_default'} onClick={(event) => {
                                                event.preventDefault();
                                                this.props.production.createItem(item.itemID, this.props.playerItemStorage, this.props.wallet);
                                            }
                                            }>CREATE</button>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>{/*end widget__content*/}
                </div>{/*end widget*/}
            </div>
        );
    }//end render
}