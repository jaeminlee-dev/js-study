
//document중 form태그에 id가 todo-form인 것을 찾아서 변수에 저장(오브젝트 형식)
const toDoForm = document.querySelector("form#todo-form");

//document중 form태그에 id가 todo-form인 것 안에 input 태그를 찾아서 변수에 저장(오브젝트 형식), 아래 형식처럼도 사용 가능
// const toDoInput = toDoForm.querySelector("input");
const toDoInput = document.querySelector("form#todo-form input");

//doucment중 ul태그에 id가 todo-list인 것을 찾아서 변수에 저장(오브젝트 형식)
const toDoList = document.querySelector("ul#todo-list");

const TODOS_KEY = "todos";

//값이 변할수 있어서 let으로 선언, localStorage에 저장된 값이 있으면 그 값을 가져오고, 없으면 빈 배열을 가져옴
let toDos = [];



//ToDo를 화면에 출력하는 함수
//동작 원리 : li태그를 생성, span태그를 생성, span태그 안에 newToDo를 넣음, li태그 안에 span태그를 넣음, ul태그 안에 li태그를 넣음
function paintToDo(newTodo){
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "❌";
    button.addEventListener("click", deleteToDo);
    
    li.appendChild(span);
    li.appendChild(button);
    
    toDoList.appendChild(li);
    
}

//제출 버튼을 누르면 실행되는 함수, 이벤트 리스너
//동작 원리 : 기존 이벤트 비활성화, newToDo에 입력된 값을 변수에 저장, paintToDo 함수 실행, 입력창 초기화
function handleToDoSubmit(event){
    event.preventDefault();
    const newToDo = toDoInput.value;
    const newTodoObj = {
        text: newToDo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
    toDoInput.value = "";
}

//ToDo 리스트를 로컬 스토리지에 저장하는 함수
function saveToDos(){
    //로컬 스토리지에는 string만 저장 가능, 따라서 배열을 string으로 변환
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}



//ToDo 리스트 삭제
function deleteToDo(event){
    const li = event.target.parentElement;
    //newTodo.id로 number를 넣어주었어도, DOM에선 string으로 형변환해서 받아오기 때문에, string으로 형변환해서 비교
    //filter란 배열의 모든 아이템을 통해 함수를 실행하고, true인 아이템들만 가지고 새로운 배열을 만듦
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
    li.remove();
}

//toDoForm에 submit 이벤트가 발생하면 handleToDoSubmit 함수 실행
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos !== null){
    //로컬 스토리지에 저장된 string을 다시 배열로 변환, 정확히는 JSON 형식을 오브젝트로 변환하는데 우리가 사용하는 배열은 오브젝트의 일종이기 때문에 가능
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    //forEach는 배열의 각 요소에 대해 함수를 실행 시키는 함수이다, item은 javascript에서 배열의 각 요소를 의미하는데 자동으로 생성되는 변수이다
    parsedToDos.forEach(paintToDo);
    //forEach에 바로 함수를 사용하는 방법
    // parsedToDos.forEach((item) => console.log("this is the turn of ", item)); // 이렇게 사용할 수도 있다.
}


//Tip : array 기능
// // 배열의 마지막 요소 제거, 제거된 요소 리턴
// arr.pop();  // 3

// // 배열 마지막에 요소 추가, 배열의 크기 리턴
// arr.push("new");  // 3
// console.log(arr);  //-> [ 1, 2, 'new' ]

// // 배열의 첫번째 요소 제거, 제거된 요소 리턴
// arr.shift();  // 1

// // 배열의 처음에 요소 추가, 배열의 크기 리턴


// console.log로 document.body 객체를 출력하면 태그내용이 출력되고,
// console.dir로 document.body 객체를 출력하면 객체의 속성이 출력된다.
// console.log로 함수를 출력하면 함수의 코드가 출력되고,
// console.dir로 함수를 출력하면 함수의 속성이 출력된다.
// arr.unshift("new");  // 3