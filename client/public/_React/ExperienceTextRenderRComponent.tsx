import React from 'react';
import Experience from '../../../core/app/Components/Experience.js';

export type ExperienceTextRenderRComponentProps = {
    experienceComponent: Experience;
}
export type ExperienceTextRenderRComponentState = {
    experienceComponent: Experience;
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