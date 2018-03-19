(function(){
    'use strict';
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
    /**
     * 指定した要素の子供をすべて削除する
     * @param {HTMLElement} element HTMLの要素
     */
    function removeAllChildren(element) {
        while (element.firstChild) { //子供の要素がある限り削除
            element.removeChild(element.firstChild);
        }
    }
    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) { //名前が空のときは処理を終了する
            return;
        }
     
        // 診断結果エリアの作成
        removeAllChildren(resultDivided);
        const header = document.createElement('h3');
        header.innerText = '診断結果';
        resultDivided.appendChild(header);

        const paragraph = document.createElement('p')
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);

        //TODO ツイートエリアの作成
        removeAllChildren(tweetDivided);
    };

    const answers = [
        '{userName}のいいところは声です。{userName}のこえには癒やされます',
        '{userName}のいいところは顔です。{userName}をみればときめきます。',
        '{userName}のいいところは情熱です。{userName}の情熱に感化されます',
        '{userName}のいいところは用心深さです。{userName}の洞察に助けられます',
        '{userName}のいいところは好奇心です。あたらしいことに向かう{userName}が魅力的です。',
        '{userName}のいいところはすべてです。ありのままの{userName}自身がいいところです。',
        '{userName}のいいところは推理力です。{userName}が謎を解き明かします',
        '{userName}のいいところは気配りです。{userName}の配慮が救っています',
        '{userName}のいいところは知識です。{userName}の博識に助けられます。',
        '{userName}のいいところは山です。{userName}の体力が削られます。'
        '{userName}のいいところは優しさですとはいえないですね。HAHAHAHA!'
    ];
   /**
    * 名前の文字列を渡すと診断結果を返す関数
    * @param {string} userName ユーザーの名前
    * @return {string} 診断結果
    */
    function assessment(userName) {
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode = 0;
        for (let i = 0; i  < userName.length; i++) {
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }
        //文字のコード番号の合計を回答の数で割って添字の数値を求める
        const index = sumOfcharCode % answers.length;
        let result = answers[index];

        result = result.replace(/\{userName\}/g, userName);
        return result;
    }

    //　テストコード
    console.assert(
        assessment('太郎') === '太郎のいいところは推理力です。太郎が謎を解き明かします',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
    );
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理がただしくありません。'
    );
})();
