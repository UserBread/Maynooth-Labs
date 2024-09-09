var nums = [0, 0, 0, 0, 0, 0]

function Increase(index) {
    nums[index] += 1;
    console.log(nums[index]);
}

function Decrease(index) {
    if (nums[index] > 0) {
        nums[index] -= 1;
    }
    console.log(nums[index]);
}

function showNum(index) {  
    switch(index) {
        case 0: document.getElementById("RedIndicator").innerText =  nums[0];
        case 1: document.getElementById("OrangeIndicator").innerText =  nums[1];
        case 2: document.getElementById("YellowIndicator").innerText =  nums[2];
        case 3: document.getElementById("BlueIndicator").innerText =  nums[3];
        case 4: document.getElementById("BrownIndicator").innerText =  nums[4];
        case 5: document.getElementById("GreenIndicator").innerText =  nums[5];
    }
}
