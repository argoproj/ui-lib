'use strict';

const webfontsGenerator = require('webfonts-generator');
const path = require('path');
const glob = require('glob');
const FONT_TYPES = [ 'svg', 'ttf', 'woff', 'eot' ];

webfontsGenerator({
  files: glob.sync('src/assets/icons/*.svg'),
  dest: 'src/assets/fonts/',
  fontName: 'ax-icon-v1',
  types: FONT_TYPES,
  cssTemplate: path.resolve(__dirname, './css.hbs'),
  templateOptions: {
    baseTag: 'i',
	classPrefix: 'ax-icon-',
	baseSelector: '.ax-icon'
} }, function(error) {
  if (error) {
    console.log('Fail!', error);
  } else {
    console.log('Done!');
  }
});
