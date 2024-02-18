const { rl } = require('./components/readline');
const { sleep } = require('./components/utility');
const setting = require('./components/setting');
const game = require('./components/game');

async function main() {
  const settings = await setting();
  await sleep(1000);
  await game(settings);
}

main()
  .then(() => {
    console.log('プログラムを終了します。');
    rl.close();
  })
  .catch((error) => {
    console.error('エラーが発生しました。:', error);
    rl.close();
  });
