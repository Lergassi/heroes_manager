import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import Container from '../core/source/Container.js';
import DefaultContainerConfigure from '../core/app/Services/ContainerConfigures/DefaultContainerConfigure.js';
import ClientContainerConfigure from './app/ClientContainerConfigure.js';
import CoreContainerConfigure from '../core/app/Services/ContainerConfigures/CoreContainerConfigure.js';
import AppError from '../core/source/Errors/AppError.js';
import ReactDOM, {Root} from 'react-dom/client';

export default class Dev {
    private readonly _root: Root;

    constructor() {
        let container = new Container();

        (new DefaultContainerConfigure()).configure(container);
        (new ClientContainerConfigure()).configure(container);
        (new CoreContainerConfigure()).configure(container);

        let domContainer = document.getElementById('root');
        if (!domContainer) {
            throw AppError.rootElementNotFound()
        }

        this._root = ReactDOM.createRoot(domContainer);

        this._root.render(
            <div>
                {this._renderIcons()}
            </div>
        );
    }

    private _renderIcons() {
        return <div>42</div>;
    }
}