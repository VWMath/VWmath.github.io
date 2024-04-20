let arr = ["多元函数的连续性","偏导数","方向导数","梯度","全微分","多元函数泰勒展开","二重积分","三重积分",
            "坐标变换","含参变量的积分","Γ函数","B函数","反常重积分","第一型曲线积分","第二型曲线积分",
            "第一型曲面积分","第二型曲面积分"];

function add_new_div(i){
    let div = document.getElementById("main_block");

    let new_div = document.createElement("div");
    let word = document.createElement("h1");

    new_div.className = "show_block";
    new_div.innerHTML = '<img src="/picture/展示框.png">';

    word.style.color = "coral"
    word.style.fontSize = "10rem";
    word.style.fontFamily = "KaiTi";
    word.style.textAlign = "center";
    word.innerHTML = arr[i];

    div.appendChild(new_div);
    new_div.appendChild(word);
}
let arr_len = arr.length;
for(i=0; i<arr_len; i++){add_new_div(i);}