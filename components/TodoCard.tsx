import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps } from "react-beautiful-dnd"
import getUrl from "@/lib/getUrl";
import Image from "next/image";


type Props = {
  todo:Todo;
  index:number; 
  id:TypedColumn;
  innerRef :(element:HTMLElement | null)=>void;
  draggableProps:DraggableProvidedDraggableProps;
  dragHandleProps:DraggableProvidedDragHandleProps | null | undefined ; 
}

const TodoCard = ({
  todo,
  index, 
  id,
  innerRef,
  draggableProps,
  dragHandleProps 
}:Props) => {

  const deleteTask = useBoardStore((state)=>state.deleteTask) ;
  const [imageUrl, setImageUrl] = useState<string|null>(null);

  useEffect(()=>{
    if(todo.image)
    {
      console.log(`${id} ${index+1} there is an image`)
      const fetchImage = async () =>{
        const url = await getUrl(todo.image!);
        if(url)
        {
          console.log(url.toString());
          setImageUrl(url.toString());
        }

      }

      fetchImage() ; 
    }

  }, [])


  

  return (
    <div
     className="bg-white rounded-md space-y-2 drop-shadow-md p-2"
     {...draggableProps}
     {...dragHandleProps}
     ref={innerRef}>
      <div className="flex justify-between items-center p-5">
        
        <p>{todo.title}</p>
        <button onClick={()=>deleteTask(index, todo, id)} className="text-red-500 hover:text-red-600">
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
      {/* image part  */}
      {
        imageUrl && (
          <div className="relative h-full w-full ">
            <Image
              src={imageUrl}
              alt="Task Image"
              width={400}
              height={200}
              className="w-full object-contain rounded-b-md"    
            />
          </div>
        )
      }


      
    </div>
  )
}

export default TodoCard
