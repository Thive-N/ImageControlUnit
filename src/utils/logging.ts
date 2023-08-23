import { TERM_COLOR } from './constants';

const PADCONST = 10;
function warning(str: string): void {
  console.log(
    TERM_COLOR.Bright +
      TERM_COLOR.FgRed +
      '[WARNING]'.padEnd(PADCONST, ' ') +
      TERM_COLOR.Reset +
      str,
  );
}

function error(str: string): void {
  console.log(
    TERM_COLOR.Bright +
      TERM_COLOR.FgYellow +
      '[ERROR]'.padEnd(PADCONST, ' ') +
      TERM_COLOR.Reset +
      str,
  );
}

function info(str: string): void {
  console.log(
    TERM_COLOR.Bright +
      TERM_COLOR.FgCyan +
      '[INFO]'.padEnd(PADCONST, ' ') +
      TERM_COLOR.Reset +
      str,
  );
}

export const logging = {
  warning,
  error,
  info,
};
