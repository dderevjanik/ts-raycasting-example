import raycasting from 'ts-raycasting';
import ILevel from './interfaces/ILevel';
import EState from './enums/EState';
import Level01 from './Levels/Level01';
import Level02 from './Levels/Level02';
import Level03 from './Levels/Level03';
import {createActor} from './Actor';
import Render from './Render';

let state = EState.INIT;
let currentLevel = Level01;

// first, get elements from DOM
const canvasEl: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas');
const ctx: CanvasRenderingContext2D = canvasEl.getContext('2d');
const texturesEl: HTMLImageElement = <HTMLImageElement> document.getElementById('textures');
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
    const rays = raycasting.castRays(currentLevel.map, player.x, player.y, player.rot, (row, column) => {
        if (currentLevel.map[row][column] !== 0) {
            return false;
        }
        return true;
    })
    Render.renderBackground(ctx, 256, 300);
    Render.renderRays(texturesEl, textureSize, ctx, 256, 300, currentLevel.map, rays);
    clearInputs();
    setTimeout(tick, fps);
}

state = EState.RUNNING;

tick();
