window.CONFIG = window.CONFIG || {};

window.CONFIG.startup = {
    systemName: "CRYONET v3.2",
    bootDelay: 250,       // ms between each boot line
    autoTypeSpeed: 65,    // ms per keystroke during saved auto-login
    autoRunCommands: [    // Optional commands to run automatically after login (e.g. ["DIR"])
        // "DIR"
    ],
    bootLines: [
        "BIOS Date 01/15/94 14:22:51 Ver 1.02",
        "CPU: ATOM 86605XC 66MHz",
        "Memory Test: 16384K OK\n",
        "Initializing Keyboard... OK",
        "========================================",
        "CRYONET v3.2 - AUTHORIZED ACCESS ONLY",
        "========================================"
    ]
};