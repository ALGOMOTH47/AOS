window.CONFIG = window.CONFIG || {};

// =========================================================================
// EXECUTABLE PROGRAMS (.EXE)
// Key must match the UPPERCASE .EXE filename in config.filesystem.js
// Each function receives `app` with:
//   - app.container : The full 4:3 screen DOM element to draw into
//   - app.user      : Currently logged-in username
//   - app.args      : Array of command-line arguments passed after the .exe
//   - app.exit(msg) : Clears the screen and returns to the DOS prompt
// =========================================================================
window.CONFIG.executables = {

    "CRYONET.EXE": function(app) {
        app.container.innerHTML = `
            <div style="border: 1px solid #E2A76F; padding: 12px; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="background: #E2A76F; color: #0c0c0c; padding: 4px 8px; font-weight: bold;">
                        CRYONET HARDWARE DIAGNOSTIC UTILITY v1.4
                    </div>
                    <br>
                    <div>OPERATOR : ${app.user}</div>
                    <div>ORIGIN   : ${app.path}</div>
                    <br>
                    <div>[OK] ATOM 86605XC CORE ........ NOMINAL</div>
                    <div>[OK] MEMORY BANK 0-16384K .... VERIFIED</div>
                    <div>[OK] CRYO-BUS TELEMETRY ...... ONLINE</div>
                    <div id="diag-status" style="margin-top: 16px;">> READY FOR SUBSYSTEM SCAN.</div>
                </div>
                <div style="border-top: 1px solid #E2A76F; padding-top: 8px; display: flex; gap: 16px;">
                    <button id="btn-scan" style="background: #E2A76F; color: #0c0c0c; border: none; padding: 4px 12px; font-family: inherit; font-weight: bold; cursor: pointer;">[ RUN SCAN ]</button>
                    <button id="btn-exit" style="background: transparent; color: #E2A76F; border: 1px solid #E2A76F; padding: 4px 12px; font-family: inherit; cursor: pointer;">[ EXIT TO DOS ]</button>
                </div>
            </div>
        `;

        const statusEl = app.container.querySelector("#diag-status");
        app.container.querySelector("#btn-scan").onclick = () => {
            statusEl.textContent = "> SCANNING SECTORS... NO ANOMALIES DETECTED.";
        };
        app.container.querySelector("#btn-exit").onclick = () => {
            app.exit("DIAG.EXE terminated normally.");
        };
    },

    "CRYOCTRL.EXE": function(app) {
        let temp = -196;

        function render() {
            app.container.innerHTML = `
                <div style="border: 1px solid #E2A76F; padding: 12px; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="border-bottom: 1px solid #E2A76F; padding-bottom: 6px; margin-bottom: 12px;">
                            <strong>CRYO-CHAMBER THERMAL CONTROLLER</strong> | USER: ${app.user}
                        </div>
                        <p>CHAMBER 01 CORE TEMP: <strong>${temp}°C</strong></p>
                        <p>STATUS: ${temp <= -190 ? "STABLE" : "WARNING - THERMAL DRIFT"}</p>
                    </div>
                    <div style="display: flex; gap: 12px;">
                        <button id="cool-btn" style="background: transparent; color: #E2A76F; border: 1px solid #E2A76F; padding: 4px 10px; font-family: inherit; cursor: pointer;">[ -2°C COOL ]</button>
                        <button id="warm-btn" style="background: transparent; color: #E2A76F; border: 1px solid #E2A76F; padding: 4px 10px; font-family: inherit; cursor: pointer;">[ +2°C WARM ]</button>
                        <button id="quit-btn" style="background: #E2A76F; color: #0c0c0c; border: none; padding: 4px 10px; font-family: inherit; font-weight: bold; cursor: pointer; margin-left: auto;">[ QUIT ]</button>
                    </div>
                </div>
            `;

            app.container.querySelector("#cool-btn").onclick = () => { temp -= 2; render(); };
            app.container.querySelector("#warm-btn").onclick = () => { temp += 2; render(); };
            app.container.querySelector("#quit-btn").onclick = () => app.exit();
        }

        render();
    }

};