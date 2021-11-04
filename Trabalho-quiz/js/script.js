//selecionando todos os elementos necessários
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
// se o botão iniciar Quiz for clicado
start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo"); //mostrar caixa de informações
}
// se o botão sair do Quiz for clicado
exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //ocultar caixa de informação
}
// se continuar o botão do questionário clicado
continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo"); //ocultar caixa de informação
    quiz_box.classList.add("activeQuiz"); //mostrar caixa de questionário
    showQuetions(0); //chamando a função showQestions
    queCounter(1); //passando 1 parâmetro para queCounter
    startTimer(15); //chamando a função startTimer
    startTimerLine(0); //chamndo a função startTimerLine
}
let timeValue =  15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");
// se o botão restartQuiz foi clicado
restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); //mostrar caixa de questionário
    result_box.classList.remove("activeResult"); //ocultar caixa de resultado
    timeValue = 15; 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Tempo Restante"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}
// if quitQuiz button clicked
quit_quiz.onclick = ()=>{
    window.location.reload(); //reload the current window
}
const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");
// if Next Que button clicked
next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Tempo Restante"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    }else{
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}
// getting questions and options from array
function showQuetions(index){
    const que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag
    
    const option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';
//if user clicked on option
function optionSelected(answer){
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items
    
    if(userAns == correcAns){ //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");
        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){ //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}
function showResult(){
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ // se o usuário pontuou mais de 7
        //criando uma nova tag de span e passando o número de pontuação do usuário e o número total de perguntas
        let scoreTag = '<span>Parabéns! , Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if(userScore > 1){ // se o usuário pontuou mais de 1
        let scoreTag = '<span>Pode ser melhor , Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{ //se o usuário pontuou menos de 1
        let scoreTag = '<span>Muito ruim! , Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}
function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; //alterando o valor de timeCount com o valor de tempo
        time--; //diminuir tempo
        if(time < 9){ //se o cronômetro for menor que 9
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; //adicione um 0 antes do valor do tempo
        }
        if(time < 0){ //se o cronômetro for menor que 0
            clearInterval(counter); //limpando contador 
            timeText.textContent = "Time Off"; //mudar o texto da hora
            const allOptions = option_list.children.length; //obtendo todos os itens opcionais
            let correcAns = questions[que_count].answer; //obtendo a resposta correta da matriz
            for(i=0; i < allOptions; i++){
                if(option_list.children[i].textContent == correcAns){ //se houver uma opção que corresponda a uma resposta de matriz
                    option_list.children[i].setAttribute("class", "option correct"); //adicionando a cor verde à opção correspondente
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adicionando o ícone de marca à opção correspondente
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for(i=0; i < allOptions; i++){
                option_list.children[i].classList.add("disabled"); //uma vez que o usuário seleciona uma opção, desabilita todas as opções
            }
            next_btn.classList.add("show"); //mostra o próximo botão se o usuário selecionou qualquer opção
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1; //atualizando o valor do tempo com 1
        time_line.style.width = time + "px"; //Aumento de largura time_line com px
        if(time > 549){ //se o valor do tempo for maior que 549
            clearInterval(counterLine); //limpar
        }
    }
}
function queCounter(index){
    //criando uma nova tag de span e passando o número da pergunta e a pergunta total
    let totalQueCounTag = '<span><p>'+ index +'</p> de <p>'+ questions.length +'</p> Questões</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adicionar nova tag span dentro de bottom_ques_counter
}