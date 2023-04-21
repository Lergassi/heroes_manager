import React from 'react';
import ProductionRC from './ProductionRC';
import ContainerInterface from '../../../core/source/ContainerInterface';
import {UI_WindowOptions} from '../../types/main';
import Production from '../../../core/app/Components/Production';
import {ServiceID} from '../../../core/types/enums/ServiceID';
import ItemStorageInterface from '../../../core/app/Interfaces/ItemStorageInterface';
import WalletInterface from '../../../core/app/Interfaces/WalletInterface';

export interface ProductionListRCProps {
    container: ContainerInterface;
    window: UI_WindowOptions;
}

interface ProductionListRCState {
    window: UI_WindowOptions;
}

export default class ProductionListRC extends React.Component<ProductionListRCProps, ProductionListRCState> {
    constructor(props: ProductionListRCProps) {
        super(props);
    }

    render() {
        return (
            <div>
                <ProductionRC
                    container={this.props.container}
                    production={this.props.container.get<Production>(ServiceID.Alchemy)}
                    title={ServiceID.Alchemy}
                    playerItemStorage={this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController)}
                    wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}
                    window={{
                        show: this.props.window.show,
                    }}
                />
                <ProductionRC
                    container={this.props.container}
                    production={this.props.container.get<Production>(ServiceID.Blacksmith)}
                    title={ServiceID.Blacksmith}
                    playerItemStorage={this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController)}
                    wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}
                    window={{
                        show: this.props.window.show,
                    }}
                />
                <ProductionRC
                    container={this.props.container}
                    production={this.props.container.get<Production>(ServiceID.LeatherWorking)}
                    title={ServiceID.LeatherWorking}
                    playerItemStorage={this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController)}
                    wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}
                    window={{
                        show: this.props.window.show,
                    }}
                />
                <ProductionRC
                    container={this.props.container}
                    production={this.props.container.get<Production>(ServiceID.Tailoring)}
                    title={ServiceID.Tailoring}
                    playerItemStorage={this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController)}
                    wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}
                    window={{
                        show: this.props.window.show,
                    }}
                />
                <ProductionRC
                    container={this.props.container}
                    production={this.props.container.get<Production>(ServiceID.Jewelry)}
                    title={ServiceID.Jewelry}
                    playerItemStorage={this.props.container.get<ItemStorageInterface>(ServiceID.ItemStorageController)}
                    wallet={this.props.container.get<WalletInterface>(ServiceID.Wallet)}
                    window={{
                        show: this.props.window.show,
                    }}
                />
            </div>
        );
    }
}