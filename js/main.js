"use strict";

{
  const question = document.getElementById("question");
  const choices = document.getElementById("choices");
  const btn = document.getElementById("btn");
  const result = document.getElementById("result");
  const scoreLabel = document.querySelector('#result>p');

  //c[0]が正解
  const quizSet = shuffle([
    { q: "世界で一番大きな湖?", c: ["カスピ海", "A1", "A2"] },
    { q: "2×3", c: ["6", "8", "10"] },
    { q: "What is C0?", c: ["C0", "C1", "C2"] },
  ]);

  let currentNum = 0;
  let isAnswered;
  let score=0;

  question.textContent = quizSet[currentNum].q;
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    if(isAnswered){
      return;
    }
    isAnswered=true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswered=false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild){
      choices.removeChild(choices.firstChild);
    }

    //参照渡しにならないようにする
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener('click',()=>{
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
    // 最終問題のときのボタン
    if(currentNum===quizSet.length-1){
      btn.textContent='Show Score';
    }
  }

  setQuiz();

  // clickイベント
  btn.addEventListener('click',()=>{
    // 押せない状態＝回答後
    if(btn.classList.contains('disabled')){
      return;
    }
    //回答したら追加
    btn.classList.add('disabled');
    //最終問題かいなか
    if(currentNum===quizSet.length-1){
      scoreLabel.textContent=`score: ${score}/${quizSet.length}`
      result.classList.remove('hidden');
    }else{
      currentNum++;
      setQuiz();
    }
  });
}
