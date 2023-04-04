import chalk from 'chalk';

export const infoLog = (message?: any, ...optionalParams: any[]) => {
    console.log(chalk.blue(`[ℹ️ INFO] ${message}`), ...optionalParams);
};

export const warnLog = (message?: any, ...optionalParams: any[]) => {
    console.log(chalk.yellow(`[⚠️ WARN] ${message}`), ...optionalParams);
};

export const errorLog = (message?: any, ...optionalParams: any[]) => {
    console.log(chalk.red(`[❌ ERROR] ${message}`), ...optionalParams);
};

export const successLog = (message?: any, ...optionalParams: any[]) => {
    console.log(chalk.green(`[✅ SUCCESS] ${message}`), ...optionalParams);
};
