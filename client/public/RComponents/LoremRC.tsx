import _ from 'lodash';
import debug from 'debug';
import React from 'react';
import ReactDOM from 'react-dom/client';

export default class LoremRC extends React.Component<{}, {text: string}> {
    constructor(props: {text?: string}) {
        super(props);

        // let defaultText = {
        //     en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultrices felis augue, ut gravida est molestie et. Donec tempus, eros sit amet pulvinar tempor, turpis ante volutpat est, a ultrices dui augue sollicitudin nibh. Fusce accumsan dictum congue. Pellentesque nec mauris vel urna dignissim ultricies. Duis tincidunt erat a iaculis lacinia. In vitae metus quis ex rutrum lobortis. Nam nec ipsum ligula. Ut vel nisl sapien. Mauris efficitur bibendum augue, ac placerat dolor varius ullamcorper. Proin vestibulum risus in consequat sodales. Curabitur pharetra, massa interdum congue efficitur, urna ante rutrum justo, et egestas leo enim sit amet urna. Donec bibendum iaculis fermentum. Curabitur pretium fringilla commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed lorem quis massa rutrum luctus.',
        //     ru: 'Задача организации, в особенности же начало повседневной работы по формированию позиции в значительной степени обуславливает создание соответствующий условий активизации. Равным образом реализация намеченных плановых заданий позволяет выполнять важные задания по разработке соответствующий условий активизации. Повседневная практика показывает, что начало повседневной работы по формированию позиции в значительной степени обуславливает создание позиций, занимаемых участниками в отношении поставленных задач.',
        // };

        this.state = {
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultrices felis augue, ut gravida est molestie et. Donec tempus, eros sit amet pulvinar tempor, turpis ante volutpat est, a ultrices dui augue sollicitudin nibh. Fusce accumsan dictum congue. Pellentesque nec mauris vel urna dignissim ultricies. Duis tincidunt erat a iaculis lacinia. In vitae metus quis ex rutrum lobortis. Nam nec ipsum ligula. Ut vel nisl sapien. Mauris efficitur bibendum augue, ac placerat dolor varius ullamcorper. Proin vestibulum risus in consequat sodales. Curabitur pharetra, massa interdum congue efficitur, urna ante rutrum justo, et egestas leo enim sit amet urna. Donec bibendum iaculis fermentum. Curabitur pretium fringilla commodo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sed lorem quis massa rutrum luctus.',
        };
    }

    render() {
        return (
            <p>{this.state.text}</p>
        );
    }
}