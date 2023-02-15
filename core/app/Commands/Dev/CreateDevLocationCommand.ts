import _ from 'lodash';
import debug from 'debug';
import Command from '../../../source/GameConsole/Command.js';
import Input from '../../../source/GameConsole/Input.js';
import {CommandID} from '../../../types/enums/CommandID.js';

export default class CreateDevLocationCommand extends Command {
    get name(): string {
        return '';
    }

    async execute(input: Input) {

    }
}