import { castRays } from 'ts-raycasting';
import { EState } from './enums/EState';
import { Level01 } from './Levels/Level01';
import { createActor} from './Actor';
import { renderBackground, renderRays} from './Render';

let state = EState.INIT;
let currentLevel = Level01;

// first, get elements from DOM
const canvasEl = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvasEl.getContext('2d') as CanvasRenderingContext2D;
const texturesEl = document.getElementById('textures') as HTMLImageElement;
const textureSize = 64;

// set up key events
let keyDown: number = null;
let keyPressed: number = null;
let keyUp: number = null;

document.onkeypress = (event: KeyboardEvent): void => {
    event = event || <KeyboardEvent> window.event;
    keyPressed = event.keyCode;
};

document.onkeydown = (event: KeyboardEvent): void => {
    event = event || <KeyboardEvent> window.event;
    keyDown = event.keyCode;
};

document.onkeyup = (event: KeyboardEvent): void => {
    event = event || <KeyboardEvent> window.event;
    keyUp = event.keyCode;
};

// clear inputs
const clearInputs = (): void => {
    keyDown = null;
    keyPressed = null;
    keyUp = null;
};

state = EState.LOADING;

const fps = 1000/30;
const player = createActor(currentLevel.start[0], currentLevel.start[1]);
const tick = () => {
    console.log('.');
    switch(keyDown) {
        case 37:
            player.rot -= Math.PI/12;
            break;
        case 39:
            player.rot += Math.PI/12;
            break;
        case 38:
            const nx = Math.cos(player.rot)*player.speed;
            const ny = Math.sin(player.rot)*player.speed;
            if (currentLevel.map[Math.floor(player.y+ny)][Math.floor(player.x+nx)] === 0) {
                player.x += nx;
                player.y += ny;
            }
            break;
    }
    const rays = castRays(currentLevel.map, player.x, player.y, player.rot, (row, column) => {
        if (currentLevel.map[row][column] !== 0) {
            return false;
        }
        return true;
    })
    renderBackground(ctx, 256, 300);
    renderRays(texturesEl, textureSize, ctx, 256, 300, currentLevel.map, rays);
    clearInputs();
    setTimeout(tick, fps);
}

state = EState.RUNNING;

tick();
