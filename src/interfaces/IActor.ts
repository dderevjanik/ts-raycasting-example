import EPlayerState from './../enums/EPlayerState';

export interface IActor {
    x: number;
    y: number;
    rot: number;
    rotSpeed: number;
    height: number;
    speed: number;
    state: EPlayerState;
};

export default IActor;
