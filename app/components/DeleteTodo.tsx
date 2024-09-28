import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import { mutate } from "swr";
import { deleteTodoApi } from "@/lib/todoApi";

export default function DeleteTodo({ id }: { id: string }) {
  const handleDelete = async () => {
    const res = await deleteTodoApi(id);
    if (res.ok) {
      console.log("Todo delete successfully");
      mutate("/api/todos");
    }
  };
  return (
    <Button
      onClick={handleDelete}
      variant="ghost"
      size="icon"
      className="text-red-500 bg-red-100 hover:text-red-700 hover:bg-red"
    >
      <TrashIcon className="w-4 h-4" />
    </Button>
  );
}
