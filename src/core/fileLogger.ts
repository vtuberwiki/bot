// 

// type Logs = "Message" | "Command" | "Member Joined" | "Error Email Sent" | "Request Received" | "Request Sent";

// class FileLogger {
//     private logFolder: string;
//     private logFile: string;

//     constructor() {
//         this.logFolder = path.join(__dirname, "logs");
//         this.logFile = this.getLogFilePath();
//     }

//     private getLogFilePath(): string {
//         const currentDate = fDate(new Date());
//         const currentTime = fTime(new Date(), true);
//         const logDirectory = path.join(this.logFolder, currentDate);
//         return path.join(logDirectory, `${currentTime}.log`);
//     }

//     private createLogDir(): void {
//         if (!fs.existsSync(this.logFolder)) {
//             fs.mkdirSync(this.logFolder, { recursive: true });
//         }
//     }

//     private createLogFile(): void {
//         const logDirectory = path.dirname(this.logFile);
//         if (!fs.existsSync(logDirectory)) {
//             fs.mkdirSync(logDirectory, { recursive: true });
//         }
//     }

//     public log(log: Logs, args: any): string {
//         const logString = `[${fDate(new Date())} @ ${fTime(new Date(), true)}] ${log}: ${JSON.stringify(args)}\n`;
//         this.createLogDir();
//         this.createLogFile();
//         fs.appendFileSync(this.logFile, logString);
//         return logString;
//     }

//     public async getLogs(): Promise<string[]> {
//         const logs = fs.readdirSync(this.logFolder);
//         return logs;
//     }
// }

// export default FileLogger;


import fs from "fs";
import path from "path";
import { fDate, fTime } from "developer-toolkit-utils";

type ConsoleMethod = 'log' | 'error' | 'warn';

class FileLogger {
    private logStream: fs.WriteStream;
    private originalConsoleMethods: { [key in ConsoleMethod]: (...args: any[]) => void }

    constructor() {
        const logDir = path.join(process.cwd(), "logs");
        const logFilePath = path.join(logDir, `${fDate(new Date())}.log`);

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        // Create the log file if it doesn't exist
        if (!fs.existsSync(logFilePath)) {
            fs.writeFileSync(logFilePath, '');
        }

        this.logStream = fs.createWriteStream(logFilePath);

        this.originalConsoleMethods = {
            log: console.log,
            error: console.error,
            warn: console.warn
        }
    }

    public startLogging() {
        console.log = (...args: any[]) => this.log('log', args);
        console.error = (...args: any[]) => this.log('error', args);
        console.warn = (...args: any[]) => this.log('warn', args);
    }

    public stopLogging() {
        console.log = this.originalConsoleMethods.log;
        console.error = this.originalConsoleMethods.error;
        console.warn = this.originalConsoleMethods.warn;
    }

    public GetLogs(): string[] {
        return fs.readdirSync(path.join(process.cwd(), "logs")).map(log => {
            const logName = log.split(".")[0];
            return logName;
        })
    }

    public ReadLog(logName: string): string {
        const logFilePath = path.join(process.cwd(), "logs", `${logName}.log`);
        return fs.readFileSync(logFilePath, 'utf8');
    }


    private log(method: ConsoleMethod, args: any[]) {
        if (typeof args[0] === "object") {
            this.logStream.write(`(${fDate(new Date())} @ ${fTime(new Date(), true)}) [${method.toUpperCase()}]: ${JSON.stringify(args[0], null, 2)}\n`);
        } else {
            const logMsg = args.map(arg => String(arg)).join(' ');

            const currentDate = fDate(new Date());
            const currentTime = fTime(new Date(), true);

            this.logStream.write(`(${currentDate} @ ${currentTime}) [${method.toUpperCase()}]: ${logMsg}\n`);
        }

        this.originalConsoleMethods[method](...args);
    }
}


export default FileLogger;