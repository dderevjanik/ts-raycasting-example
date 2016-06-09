import IRays from 'ts-raycasting/dist/Interfaces/IRay';

export const renderBackground = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
    const half = Math.floor(height/2);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, half);
    ctx.fillStyle = "grey";
    ctx.fillRect(0, half, width, half);
};

export const renderRays = (textures: HTMLImageElement, textureSize: number, ctx: CanvasRenderingContext2D, width: number, height: number, map: number[][], rays: IRays[]): void => {
    const half = Math.floor(height/2);
    rays.forEach((ray, index) => {
        const tileId = map[ray.row][ray.column];
        if (ray.side) {
            ctx.drawImage(textures,
                (ray.x - Math.floor(ray.x))*textureSize, (tileId*textureSize-textureSize),
                1, textureSize,
                index, half - (80/ray.dist),
                1, 2 * (80/ray.dist)
            );
        } else {
             ctx.drawImage(textures,
                (ray.y - Math.floor(ray.y))*textureSize, (tileId*textureSize-textureSize),
                1, textureSize,
                index, half - (80/ray.dist),
                1, 2 * (80/ray.dist)
            );
        }
    });
};

export default {
    renderBackground: renderBackground,
    renderRays: renderRays
};
