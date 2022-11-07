
// Tax Grade according to monthly salary.
const first=6220;
const second=8920;
const third=14320;
const fourth=19900;
const fifth=41410;
const sixth=53333;
// Credit (bonus) point monthly value.
const bPoint=215;

/**
 * Driver function for when the Calculate button is clicked.
 */
function driver(){
    let sum;
    if(boolCheckBox()===true){
        sum=parseFloat(document.getElementById("baseSalary").value);
        sum=sum*12;
    }
    else{
        sum=sumInput();
    }
    let creditPoints=calculateCredit();
    let grade=calculateGrade(sum);
    let tax=calculateTax(sum,grade);
    tax=tax-creditPoints;
    if (tax<0){
        tax=0;
    }
    printAnswer(tax);
}

/**
 * calculates the sum of salary inputted in the months fields and returns a yearly sum.
 * @returns {number}
 */
function sumInput(){
    let sum=0;
    let item=document.getElementsByClassName("monthInput");
    let i;
    for(i=0;i<12;i++){
        let val=parseFloat(item[i].value);
        if(isNaN(val)){
            val=0;
        }
        else if(val<0){
            val=0;
        }
        sum=sum+val;
    }
    return sum;
}

/**
 * Calculates the tax grade according to the passed summed yearly salary and according to the grades defined above as a const.
 * returns a tax grade between 1 to 7.
 * @param input
 * @returns {number}
 */
function calculateGrade(input){
    if (input<(12*first)+1){
        return 1;
    }
    else if(input>(12*first)&&input<(12*second)+1){
        return 2;
    }
    else if(input>(12*second)&&input<(12*third)+1){
        return 3;
    }
    else if(input>(12*third)&&input<(12*fourth)+1){
        return 4;
    }
    else if(input>(12*fourth)&&input<(12*fifth)+1){
        return 5;
    }
    else if(input>(12*fifth)&&input<(12*sixth)+1){
        return 6;
    }
    else if(input>(12*sixth)){
        return 7;
    }
}

/**
 * Calculates the tax according to a provided taxGrade calculated previously in a different function, and the sum of yearly income.
 * returns a final tax amount (without calculating credit points if available).
 * @param yearlyIncome
 * @param taxGrade
 * @returns {number}
 */
function calculateTax(yearlyIncome, taxGrade){
    let tax=0;
    if(taxGrade===1){
        tax=yearlyIncome*0.1;
    }
    else if(taxGrade===2){
        yearlyIncome=yearlyIncome-(12*first);
        let addon=((12*first)*0.1)
        tax=yearlyIncome*0.14;
        tax=tax+addon;
    }
    else if(taxGrade===3){
        yearlyIncome=yearlyIncome-((12*first)+(12*(second-first)));
        let addon=((12*first)*0.1)+(12*(second-first)*0.14);
        tax=yearlyIncome*0.2;
        tax=tax+addon;
    }
    else if(taxGrade===4){
        yearlyIncome=yearlyIncome-((12*first)+(12*(second-first)+(12*(third-second))));
        let addon=((12*first)*0.1)+(12*(second-first)*0.14)+((12*(third-second)*0.2));
        tax=yearlyIncome*0.31;
        tax=tax+addon;
    }
    else if(taxGrade===5){
        yearlyIncome=yearlyIncome-((12*first)+(12*(second-first)+(12*(third-second))+(12*(fourth-third))));
        let addon=((12*first)*0.1)+(12*(second-first)*0.14)+((12*(third-second)*0.2))+((12*(fourth-third)*0.31));
        tax=yearlyIncome*0.35;
        tax=tax+addon;
    }
    else if (taxGrade===6){
        yearlyIncome=yearlyIncome-((12*first)+(12*(second-first))+(12*(third-second))+(12*(fourth-third))+(12*(fifth-fourth)));
        let addon=((12*first)*0.1)+(12*(second-first)*0.14)+((12*(third-second)*0.2))+((12*(fourth-third)*0.31))+(12*(fifth-fourth)*0.35);
        tax=yearlyIncome*0.47;
        tax=tax+addon;
    }
    else if(taxGrade===7){
        yearlyIncome=yearlyIncome-((12*first)+(12*(second-first))+(12*(third-second))+(12*(fourth-third))+(12*(fifth-fourth))+(12*(sixth-fifth)));
        let addon=((12*first)*0.1)+(12*(second-first)*0.14)+((12*(third-second)*0.2))+((12*(fourth-third)*0.31))+(12*(fifth-fourth)*0.35)+(12*(sixth-fifth)*0.47);
        tax=yearlyIncome*0.5;
        tax=tax+addon;
    }
    return tax;
}

/**
 * Gets the amount of credit (bonus) points if entered and returns a number for the yearly value of the credit points.
 * @returns {number}
 */
function calculateCredit(){
    let creditPoints=parseFloat(document.getElementById("bonusPoints").value);
    if (isNaN(creditPoints)){
        creditPoints=0;
    }
    creditPoints=creditPoints*(12*bPoint);
    return creditPoints;
}

/**
 * Adds to the UI Screen the final tax answer.
 * @param tax
 */
function printAnswer(tax){
    let newText = document.createElement("p");
    newText.innerHTML = "Total Tax is: "+tax;
    newText.setAttribute("class","taxAnswer");
    document.body.appendChild(newText);
    console.log(newText.getAttribute("class"));
}

/**
 * Hides the monthly income input fields if the "For 12 Months" check box is checked.
 * Shows the monthly income input fields if the "For 12 Months" check box is unchecked.
 */
function fade(){
    if ($('.remove').is(":checked"))
        $('.fade').fadeOut(5);
    else
        $('.fade').fadeIn(5);
    }

/**
 * checks if "For 12 Months" check box is checked, if yes it returns True, else False.
 * @returns {boolean}
 */
function boolCheckBox(){
    let cb=document.getElementById("12mCheck");
    if (cb.checked){
       return true;
    }
    else
        return false;
}
