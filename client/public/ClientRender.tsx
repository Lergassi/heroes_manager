import GameConsoleComponent from './GameConsoleComponent.js';
import ReactDOM from 'react-dom/client';

export default class ClientRender {
    render() {
        let domContainer = document.getElementById('root');
        let root = ReactDOM.createRoot(domContainer);
        root.render(
            <GameConsoleComponent
                executeUrl={'http://api.heroes.sd44.ru/game_console/execute'}
                maxHistoryLength={100}
                commands={['help', 'list']}
            />
        );
    }
}