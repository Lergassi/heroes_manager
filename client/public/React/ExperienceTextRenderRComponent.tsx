import React from 'react';
import ExperienceComponent from '../../../core/app/Components/ExperienceComponent.js';

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
        // let experienceComponent = this.state.experienceComponent;

        return (
            <span>
                {experienceComponent.level} ({experienceComponent.exp})
            </span>
        );
    }
}