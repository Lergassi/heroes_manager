import GathererInterface from './GathererInterface.js';

export default interface GatheringPointInterface {
    gather(gatherer: GathererInterface): void;
}