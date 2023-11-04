'use client';
import { useBoardStore } from '@/store/BoardStore';
import {useEffect} from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
const Board = () => {
    const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore((state)=>[state.board, state.getBoard, state.setBoardState, state.updateTodoInDB]) ;

    useEffect(()=>{
        getBoard() ; 
    }, [getBoard]);

    const handleDragEnd =(result:DropResult) =>{
      const {destination, source, type} = result; 
      // console.log(destination, source, type);

      // check if user dragged card outside of board 

      if(!destination) return ; 

      // handle column drag

      if(type==="column"){
        const entries = Array.from(board.columns.entries()) ; 
        const [removed] = entries.splice(source.index, 1) ; 
        entries.splice(destination.index,0, removed) ;
        const rearrangedColumns = new Map(entries) ;
        setBoardState({...board, columns:rearrangedColumns}) ; 
      }

      // handle card drag 
      






      if(type==="card")
      {
        const columns = Array.from(board.columns) ;
        const startColIndex  = columns[Number(source.droppableId)] ;
        const finishColIndex = columns[Number(destination.droppableId)] ;
        // console.log(startColIndex,finishColIndex) ;

        const startCol:Column ={
          id:startColIndex[0],
          todos:startColIndex[1].todos
        }

        const finishCol:Column ={
          id: finishColIndex[0],
          todos:finishColIndex[1].todos
        }

        if(!startCol || !finishCol) return ; 

        if( source.index === destination.index && startCol===finishCol) return ; 

        const newTodos = startCol.todos ;

        const [todoMoved] = newTodos.splice(source.index, 1) ; 

        if(startCol.id === finishCol.id) {
          // same column drag
          newTodos.splice(destination.index, 0, todoMoved) ;
          const newCol ={
            id:startCol.id, 
            todos:newTodos,
          }
          const newColumns = new Map(board.columns) ; 
          newColumns.set(startCol.id, newCol); 

          setBoardState({...board, columns:newColumns}) ;
        }
        else{
          // dragging to another column
          const finishTodos =Array.from(finishCol.todos);
          finishTodos.splice(destination.index, 0, todoMoved) ;
          const newCol ={
            id:finishCol.id, 
            todos:finishTodos,
          }
          const newColumns = new Map(board.columns) ; 
          newColumns.set(finishCol.id, newCol);
          
          // updating to database
          updateTodoInDB(todoMoved,finishCol.id)
          

          setBoardState({...board, columns:newColumns}) ;
        }

        

        // const rearrangedColumns = new Map(entries) ;
        // setBoardState({...board, columns:rearrangedColumns}) ; 
        // console.log(entries);
        // console.log(source) ;
        // console.log(destination) ;
        // console.log(board)
      }


    }

    // console.log(board) ; 


  return (
    
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='column' > 
      {
        (provided)=>(<div 
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto p-10'
          {...provided.droppableProps}
          ref={provided.innerRef}>
          {
            Array.from(board.columns.entries()).map(([id, column], index)=>(

              <Column
                key={id} 
                id={id}
                todos= {column.todos}
                index={index}
               />
              // <div key={id}><span>{id}: </span> {column.todos.map(({$id,title})=>(<div key={$id}>{title}</div>))}</div>
            ))
          }  
        </div>)
      }

      </Droppable>
    </DragDropContext>
  )
}

export default Board
