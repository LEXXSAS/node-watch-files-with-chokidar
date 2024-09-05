const chokidar = require('chokidar');
const path = require('path');

const arrDirs = ['./files/*', './dir2/*'];

const watcher = chokidar.watch(arrDirs, {
  ignored: /(^|[\/\\])\../,
  ignoreInitial: true,
  persistent: true,
  interval: 100,
  depth: 10,
  awaitWriteFinish: {
    stabilityThreshold: 1000,
    pollInterval: 100
  },
});

const log = console.log.bind(console);

watcher
.on('change', pathWatch => {
  const fileNameFromPath = path.basename(pathWatch)
  log(`Файл ${fileNameFromPath} был изменен`)
})
.on('add', pathWatch => {
  const fileNameFromPath = path.basename(pathWatch)
  log(`Добавлен новый файл ${fileNameFromPath} в каталог ${pathWatch}`)
})
