/**
 * Для одного героя или группы героев в подземелье, пвп и тд.
 */
export default interface ExperienceDistributorInterface {
    addExp(value: number): void;
}