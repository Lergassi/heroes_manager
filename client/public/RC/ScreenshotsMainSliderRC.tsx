import React from 'react';
import Splide from '@splidejs/splide';

interface ScreenshotsMainSliderRCProps {
    files: string[];
}

interface ScreenshotsMainSliderRCState {

}

export default class ScreenshotsMainSliderRC extends React.Component<ScreenshotsMainSliderRCProps, ScreenshotsMainSliderRCState> {
    constructor(props: ScreenshotsMainSliderRCProps) {
        super(props);
    }

    componentDidMount() {
        new Splide('.splide', {drag: false}).mount();
    }

    render() {
        return (
            <div className={'slider-wrapper'}>
                <div className={'slider'}>
                    <div className={'splide'}>
                        <div className={'splide__track'}>
                            <ul className={'splide__list'}>
                                {_.map(this.props.files, (file, index) => {
                                    return <li key={index} className={'splide__slide'}><img className={'slider-image'} src={file} alt=""/></li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}