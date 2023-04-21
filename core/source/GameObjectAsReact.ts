export interface LocationProps {
    // location: LocationComponent;
    locationFactory;
    heroGroupFactory;
    itemStorageFactory; //Компонент, а не GameObject.
}

enum LocationEnum {

}

// type LocationType = keyof LocationProps;

export type LocationType = {
    // [key in LocationType]: number;
};

export default class GameObjectAsReact<props> { //Это не то. Это данные, которые передаются из вне.
    // [key: string]: number;
    // [key in LocationType]: number;
    // [key in props]: number;

    constructor(props: props) {

    }
}