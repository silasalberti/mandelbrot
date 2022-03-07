const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const pixelSize = 1;
let numIters = 50;
const zoomFactor = 2;

let x0 = -0.3;
let y0 = 0;
let xSpan = 2;
let ySpan = xSpan * (innerHeight / innerWidth);

(window.onresize = () => {
    canvas.width = innerWidth, canvas.height = innerHeight;
    ySpan = xSpan * (innerHeight / innerWidth);
    drawMandelbrot(x0, y0, xSpan, ySpan);
})();


canvas.addEventListener("mousedown", function (event) {
    const rect = canvas.getBoundingClientRect();
    const a = (event.clientX - rect.left) / innerWidth;
    const b = (event.clientY - rect.top) / innerHeight;
    x0 = x0 - xSpan + a * 2 * xSpan;
    y0 = y0 - ySpan + b * 2 * ySpan;
    xSpan /= zoomFactor;
    ySpan /= zoomFactor;
    numIters += 3;
    drawMandelbrot(x0, y0, xSpan, ySpan);
});

function drawMandelbrot(x0, y0, xSpan, ySpan) {
    const resolutionX = Math.floor(innerWidth / pixelSize);
    const resolutionY = Math.floor(innerHeight / pixelSize);
    for (let i = 0; i < resolutionX; i++) {
        for (let j = 0; j < resolutionY; j++) {
            const x = x0 - xSpan + i / resolutionX * 2 * xSpan;
            const y = y0 - ySpan + j / resolutionY * 2 * ySpan;

            let xx = x;
            let yy = y;
            let done = false;
            let k = 0;
            while (!done) {
                // Square
                xtemp = xx * xx - yy * yy;
                ytemp = 2 * xx * yy;
                xx = xtemp;
                yy = ytemp;
                // Add c
                xx += x;
                yy += y;

                if (xx * xx + yy * yy > 4) {
                    ctx.fillStyle = `hsl(${360 * (k % 25) / 25},40%,50%)`;
                    ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
                    done = true;
                }

                k++;

                if (k >= numIters) {
                    ctx.fillStyle = "#000000";
                    ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
                    done = true;
                }
            }
        }
    }
}

function drawMandelbrotProgressive(x0, y0, xSpan, ySpan) {
    const resolutionX = Math.floor(innerWidth / pixelSize);
    const resolutionY = Math.floor(innerHeight / pixelSize);

    let done = new Array(resolutionX).fill(new Array(resolutionY).fill(false));
    let xx = new Array(resolutionX).fill(new Array(resolutionY));
    let yy = new Array(resolutionX).fill(new Array(resolutionY));

    for (let i = 0; i < resolutionX; i++) {
        for (let j = 0; j < resolutionY; j++) {
            const x = x0 - xSpan + i / resolutionX * 2 * xSpan;
            const y = y0 - ySpan + j / resolutionY * 2 * ySpan;

            xx[i][j] = x;
            yy[i][j] = y;
        }
    }

    for (let k = 0; k < numIters; k++) {
        let count = 0;
        for (let i = 0; i < resolutionX; i++) {
            for (let j = 0; j < resolutionY; j++) {
                const x = x0 - xSpan + i / resolutionX * 2 * xSpan;
                const y = y0 - ySpan + j / resolutionY * 2 * ySpan;

                console.log(done[i][j]);
                if (!done[i][j]) {
                    console.log(k, i, j);
                    // Square
                    xtemp = xx[i][j] * xx[i][j] - yy[i][j] * yy[i][j];
                    ytemp = 2 * xx[i][j] * yy[i][j];
                    xx[i][j] = xtemp;
                    yy[i][j] = ytemp;
                    // Add c
                    xx[i][j] += x;
                    yy[i][j] += y;

                    if (xx[i][j] * xx[i][j] + yy[i][j] * yy[i][j] > 4) {
                        ctx.fillStyle = `hsl(${360 * (k % 25) / 25},50%,50%)`;
                        ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
                        //done[i][j] = true;
                    } else {
                        ctx.fillStyle = "#000000";
                        ctx.fillRect(i * pixelSize, j * pixelSize, pixelSize, pixelSize);
                    }
                }
            }
        }
    }
}