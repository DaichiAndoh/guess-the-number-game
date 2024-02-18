const { askQuestion } = require('./readline');
const { isValidNumber } = require('./validate');

const questions = [
  {
    q: '最小値を入力してください。',
    min: 0,
    max: 100,
    require: true,
    label: 'min',
  },
  {
    q: '最大値を入力してください。',
    min: 0,
    max: 1000,
    require: true,
    label: 'max',
  },
  {
    q: '試行回数を入力してください。（試行回数を設定しない場合は、そのままエンターを押してください。）',
    min: 0,
    max: 20,
    require: false,
    label: 'loopCnt',
  },
];

const inputValues = {
  min: null,
  max: null,
  loopCnt: null,
};

function printSettingStartMassage() {
  console.log('==============================');
  console.log('ゲームを設定します。');
  console.log('==============================');
  console.log('');
}

function printSettingEndMessage(inputValues) {
  console.log('==============================');
  console.log('ゲームを設定しました。');
  console.log(`${inputValues.min}から${inputValues.max}までの範囲でプログラムが生成する数字を当ててください。`);
  if (inputValues.loopCnt === '') {
    console.log('試行回数に制限はありません。');
  } else {
    console.log(`試行回数は${inputValues.loopCnt}回です。`);
  }
  console.log('==============================');
  console.log('');
}

async function setting() {
  printSettingStartMassage();

  let i = 0;
  while (i < questions.length) {
    const { q, min, max, require, label } = questions[i];

    let input = await askQuestion(q);
    input = input.trim();

    if (require && input === '') {
      console.log('入力してください。');
      continue;
    }

    if (input !== '') {
      if (isNaN(input)) {
        console.log('半角数字を入力してください。');
        continue;
      } else {
        input = parseInt(input);
      }
  
      if (!isValidNumber(input, min, max)) {
        console.log(`${min}以上${max}以下の数字を入力してください。`);
        continue;
      }
  
      if (label === 'max' && input <= inputValues.min) {
        console.log('最小値よりも大きい数字を入力してください。');
        continue;
      }
    }

    console.log('入力された内容:', input);
    console.log('');

    inputValues[label] = input;
    i++;
  }

  printSettingEndMessage(inputValues);
  return inputValues;
}

module.exports = setting;
