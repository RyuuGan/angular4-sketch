let createHash: any = require('sha.js');

export default function (text: string): string {
  return createHash('sha256').update(text, 'utf-8').digest('hex');
};
