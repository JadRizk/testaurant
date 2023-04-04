#!/usr/bin/env node

import { getCommandOptions } from './utils/getCommandOptions';
import { executeCommand } from './utils/executeCommand';
import { errorLog } from './console-logger';

const options = getCommandOptions();

executeCommand(options).catch(() => {
    errorLog('Crashed 💥');
});
