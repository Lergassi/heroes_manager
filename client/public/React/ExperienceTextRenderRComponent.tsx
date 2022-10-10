import React from 'react';
import ExperienceComponent, {ExperienceComponentEventCode} from '../../../core/app/Components/ExperienceComponent.js';
import EventSystem from '../../../core/source/EventSystem.js';

export type ExperienceTextRenderRComponentProps = {
    experienceComponent: ExperienceComponent;
}
export type ExperienceTextRenderRComponentState = {
    experienceComponent: ExperienceComponent;
}

export default class ExperienceTextRenderRComponent extends React.Component<ExperienceTextRenderRComponentProps, ExperienceTextRenderRComponentState> {
    constructor(props: ExperienceTextRenderRComponentProps) {
        super(props);

        this.state = {
            experienceComponent: props.experienceComponent,
        };

        // EventSystem.addListener({
        //     codes: [
        //         ExperienceComponentEventCode.AddExp,
        //         ExperienceComponentEventCode.AddLevel,
        //     ],
        //     listener: {
        //         callback: (target) => {
        //             this.setState((state) => {
        //                 return {
        //                     experienceComponent: state.experienceComponent,
        //                 };
        //             });
        //         },
        //         target: props.experienceComponent,
        //     },
        // });
    }

    render() {
        let experienceComponent = this.props.experienceComponent;

        return (
            <span>
                {/*{this.state.experienceComponent.level} ({this.state.experienceComponent.exp})*/}
                {experienceComponent.level} ({experienceComponent.exp})
            </span>
        );
    }
}