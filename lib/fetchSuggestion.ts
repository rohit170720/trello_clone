
export function formatTodosForAI(board: Board): (number|undefined)[] {

    return [board.columns.get("todo")?.todos.length, board.columns.get("inprogress")?.todos.length, board.columns.get("done")?.todos.length ];
}

const fetchSuggestion = (board:Board)=>{
    // const todos = formatTodosForAI(board);
    // console.log(todos)
    let [cnt1, cnt2, cnt3] = formatTodosForAI(board) ;

    let message = `Hi Rohit Welcome to your own Trello app. You have ${(cnt1===0 && cnt2===0 && cnt3===0)?'0 tasks todo':`${cnt1!==0?`${cnt1} task${cnt1&&cnt1>1?'s':""} in todo,`:""} ${cnt2!==0?`${cnt2} task${cnt2&&cnt2>1?'s':""} in progress,`:""} ${cnt3!==0?`${cnt1 || cnt2?"and ":""}${cnt3} task${cnt3&&cnt3>1?'s are done,':" is done,"}`:"and none are done,"} have a productive day!`}`
    // console.log(JSON.stringify({todos}))
    return message;
    

}
export default fetchSuggestion