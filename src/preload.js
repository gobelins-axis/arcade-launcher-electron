const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
    let checkInterval = null;
    const checkDuration = 5000;

    const checkForAxisInstance = () => {
        if (window.__axis__) {
            clearInterval(checkInterval);
            console.log('Found Axis instance');

            window.__axis__.set_ipc_renderer(ipcRenderer);
            document.documentElement.classList.add('is-axis-machine');
        }
    };

    checkInterval = setInterval(() => {
        checkForAxisInstance();
    }, 100);

    setTimeout(() => {
        if (!window.__axis__) {
            clearInterval(checkInterval);
            console.error('Could not find Axis instance after 5 seconds');
            ipcRenderer.send('exit');
        }
    }, checkDuration);

    ipcRenderer.on('load-complete', (event, data) => {
        window.__axis__history__index = data;
    });
});
