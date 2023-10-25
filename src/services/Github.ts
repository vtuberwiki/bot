const exec = require('child_process').exec;

export async function SelfUpdate(useTimer?: boolean) {
    console.warn(`Auto-updating VtuberWiki Discord Bot...`);
    async function GodSoHelpme() {
        const { stdout } = await exec('git pull');

        if (stdout.includes("Already up to date")) {
            console.log(`VtuberWiki Discord Bot is up to date!`);
            return; 
        } else {
            console.log(`VtuberWiki Discord Bot has been updated!`);
            console.warn(`Rebuilding VtuberWiki Discord Bot...`);
            await exec('npm run build');
            console.warn(`VtuberWiki Discord Bot has been rebuilt!`);
            process.exit();
        }
    }

    if (useTimer) {
        setTimeout(async () => await SelfUpdate(), 6000);
    } else {
        await GodSoHelpme();
    }
}


