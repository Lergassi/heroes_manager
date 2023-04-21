export interface LevelRenderInterface {
    updateLevel?(value: number): void;
}

/**
 * У героев и врагов разная логика обработки уровня. У героев связан с прокачкой, у врагов только для информации (вся другая логика задана при создании).
 */
export default interface LevelInterface {
    get level(): number;

    renderByRequest(ui: LevelRenderInterface): void;
}