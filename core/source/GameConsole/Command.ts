import AppError from '../Errors/AppError.js';
import {sprintf} from 'sprintf-js';
import Input from './Input.js';
import ContainerInterface from '../ContainerInterface.js';

export default abstract class Command {
    private readonly _description: string;
    private readonly _container: ContainerInterface;
    private readonly _commandArguments;
    private _requireArgumentsLength: number;

    abstract get name(): string;

    get description(): string {
        return this._description;
    }

    get container(): ContainerInterface {
        return this._container;
    }

    constructor(container: ContainerInterface) {
        this._description = '';
        this._container = container;
        this._commandArguments = [];
        this._requireArgumentsLength = 0;
        this.configure();
    }

    async execute(input: Input) {
        // throw new AppError('Метод execute не переопределен.');
    };

    configure(): void {
        if (!this.name) {
            throw new AppError('Свойство "name" не может быть пустым.');
        }
    }

    addArgument(name: string, description: string = '', isRequire: boolean = true, defaultValue: any = undefined): void {
        if (!name) {
            throw new AppError('Аргумент name не может быть пустым.');
        }

        for (let i = 0; i < this._commandArguments.length; i++) {
            if (this._commandArguments[i].name === name) {
                throw new AppError(sprintf('Аргумент %s для команды %s уже зарегистрирован.', name, this.name));
            }
        }

        if (isRequire && this._commandArguments.length && !this._commandArguments[this._commandArguments.length - 1].isRequire) {
            throw new AppError('Нельзя добавить обязательный аргумент после не обязательного.');
        }

        this._commandArguments.push({
            name: name,
            isRequire: isRequire,
            description: description,
            defaultValue: defaultValue,
        });
        this._requireArgumentsLength += +isRequire;
    }

    async run(commandArguments: string[] = []) {
        //todo: Убрать в другой объект, чтобы не код не был в каждом классе команды.
        if (commandArguments.length < this._requireArgumentsLength) {
            //todo: Тут нужно выводить информацию про аргументы.
            throw new AppError(sprintf('Неверно указаны аргументы. Количество обязательных аргументов должно быть: %s.', this._requireArgumentsLength));
        }
        if (commandArguments.length > this._commandArguments.length) {
            throw new AppError(sprintf('Неверно указаны аргументы. Максимальное количество аргументов: %s.', this._commandArguments.length));
        }

        let inputCommandArguments = {};
        for (let i = 0; i < this._commandArguments.length; i++) {
            let value = undefined;
            if (this._commandArguments[i].isRequire || commandArguments[i] !== undefined) {
                value = commandArguments[i];
            } else {
                value = this._commandArguments[i].defaultValue;
            }

            inputCommandArguments[this._commandArguments[i].name] = {
                name: this._commandArguments[i].name,
                isRequire: this._commandArguments[i].isRequire,
                description: this._commandArguments[i].description,
                value: value,
            };
        }

        let input = new Input(
            inputCommandArguments,
        );

        await this.execute(input);
    }
}