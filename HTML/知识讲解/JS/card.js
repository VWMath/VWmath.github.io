let cardNameArray = ["特征值与特征向量","二次型"];
let cardBox = document.getElementById('cardBox');
let card = new Array(cardNameArray.length);
let h1 = null;
let img = null;
let div = null;

// 创建卡片
for(let i=0;i<cardNameArray.length;i++)
    {
        h1 = document.createElement("h3");
        h1.innerHTML = `${cardNameArray[i]}`;
        h1.style.textAlign = "center";

        if(cardNameArray[i].length < 5)
            {
                h1.style.fontSize = 16 + 'rem';
            }

        div = document.createElement("div");
        div.appendChild(h1);

        img = document.createElement("img");
        img.src = `./picture/cardPicture/${cardNameArray[i]}.png`;

        card[i] = document.createElement("div");
        card[i].appendChild(div);
        card[i].appendChild(img);

        cardBox.appendChild(card[i]);
    }

// 设置链接
cardBox.addEventListener('click',function(event){
    for(let i=0;i<cardNameArray.length;i++)
        {
            if(event.target === card[i])
                {
                    console.log(1);
                    window.open(`./cardHTML/${cardNameArray[i]}.html`);
                }
        }
})