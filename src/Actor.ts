import IActor from './interfaces/IActor';
import EPlayerState from './enums/EPlayerState';

export const createActor = (x: number = 0, y: number = 0): IActor => ({
    x: x,
    y: y,
    rot: 0.1,
    rotSpeed: (Math.PI/12),
    height: 80,
    speed: 0.5,
    state: EPlayerState.STAND
});

export default createActor;
