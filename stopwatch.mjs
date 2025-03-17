import * as readline from 'node:readline/promises';


function createStopwatch() {
    let startTime = 0;
    let elapsedTime = 0;
    let interval;

    function start() {
        if (!interval) {
            startTime = Date.now() - elapsedTime;
            interval = setInterval(() => {
                elapsedTime = Date.now() - startTime;
                console.clear();
                console.log(`Elapsed Time: ${(elapsedTime / 1000).toFixed(1)} seconds`);
                showMenu();
            }, 100);
        }
    }

    function pause() {
        clearInterval(interval);
        interval = null;
        console.log("Stopwatch paused.");
        showMenu();
    }

    function reset() {
        clearInterval(interval);
        elapsedTime = 0;
        interval = null;
        console.log("Stopwatch reset.");
        showMenu();
    }

    return { start, pause, reset };
}

const stopwatch = createStopwatch();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function showMenu() {
    console.log("\nCommands: [s] Start | [p] Pause | [r] Reset | [q] Quit");
}

function handleInput(input) {
    switch (input.trim().toLowerCase()) {
        case "s":
            stopwatch.start();
            break;
        case "p":
            stopwatch.pause();
            break;
        case "r":
            stopwatch.reset();
            break;
        case "q":
            console.log("Exiting stopwatch... Bye!");
            rl.close();
            process.exit();
            break;
        default:
            console.log("Invalid command. Try again.");
            showMenu();
    }
}

console.log("Interactive Stopwatch");
showMenu();
rl.on("line", handleInput);
