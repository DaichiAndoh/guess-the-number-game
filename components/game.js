const { askQuestion } = require('./readline');
const { sleep } = require('./utility');

function printGameStartMessage() {
  console.log('==============================');
  console.log('ゲームを開始します。');
  console.log('==============================');
  console.log('');
}

function printGameEndMessage(isClear, correct) {
  console.log('==============================');
  if (isClear) {
    console.log('おめでとうございます！ゲームクリアです！');
  } else {
    console.log('残念でした...。');
    console.log(`正解は${correct}でした。`);
    console.log('もう一度挑戦してみましょう！');
  }
  console.log('==============================');
  console.log('');
}

function generateRandNumStr(min, max) {
  return (Math.floor(Math.random() * (max - min + 1)) + min).toString();
}

async function game(inputValues) {
  printGameStartMessage();

  const correct = generateRandNumStr(inputValues.min, inputValues.max);
  let inputedCorrectAns = false;
  let loopCnt = inputValues.loopCnt === '' ? Infinity : inputValues.loopCnt;

  while (!inputedCorrectAns && loopCnt > 0) {
    const input = await askQuestion('回答となる数字（半角数字）を入力してください。');
    if (input === correct) {
      inputedCorrectAns = true;
      console.log('正解です！');
    } else {
      console.log('不正解です...');
    }
    console.log('');

    loopCnt--;
    await sleep(1000);
  }

  printGameEndMessage(inputedCorrectAns, correct);
}

module.exports = game;
