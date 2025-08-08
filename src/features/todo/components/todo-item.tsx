import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@radix-ui/react-checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Plus, Trash2, RotateCcw } from "lucide-react";
import React, { useState } from "react";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { getTodos, postTodo } from "../services/action";
import { ITodo } from "../config/types";
import { SkeletonCard } from "./todo-skeleton";

export default function TodoItem() {
  const [title, setTitle] = useState("");

  const queryClient = useQueryClient();
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: postTodo,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const adicionarTarefa = () => {
    if (title.trim() !== "") {
      mutation.mutate({ title });
      setTitle("");
    }
  };

  const alternarTarefa = (id: string) => {
    // setTodos(
    //   todos.map((tarefa) =>
    //     tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa
    //   )
    // );
  };

  const deletarTarefa = (id: string) => {
    // setTodos(
    //   todos.map((tarefa) =>
    //     tarefa.id === id ? { ...tarefa, deleted: true } : tarefa
    //   )
    // );
  };

  const restaurarTarefa = (id: string) => {
    // setTodos(
    //   todos.map((tarefa) =>
    //     tarefa.id === id ? { ...tarefa, deleted: false } : tarefa
    //   )
    // );
  };

  const deletarPermanentemente = (id: string) => {
    // setTodos(todos.filter((tarefa) => tarefa.id !== id));
  };

  const pressEnter = (e: React.KeyboardEvent) => {
    // if (e.key === "Enter") {
    //   adicionarTarefa();
    // }
  };

  if (error) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Lista de tarefas - Erro
          </CardTitle>
          <CardContent>
            Provavelmente ocorreu algum erro na api para buscar as tarefas
          </CardContent>
        </CardHeader>
      </Card>
    );
  }

  if (isLoading) return <SkeletonCard></SkeletonCard>;

  const tarefasAtivas = todos?.filter((t: ITodo) => !t.softDelete);
  const tarefasDeletadas = todos?.filter((t: ITodo) => t.softDelete);
  const tarefasConcluidas = tarefasAtivas?.filter(
    (t: ITodo) => t.completed
  ).length;
  const totalAtivas = tarefasAtivas?.length;

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Lista de Tarefas</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">
              Tarefas Ativas ({totalAtivas})
            </TabsTrigger>
            <TabsTrigger value="deleted">
              Deletadas ({tarefasDeletadas.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4 mt-4">
            <CardDescription className="text-center">
              {totalAtivas === 0
                ? "Nenhuma tarefa ainda. Adicione abaixo!"
                : `${tarefasConcluidas} de ${totalAtivas} tarefas concluídas`}
            </CardDescription>

            <div className="flex gap-2">
              <Input
                placeholder=" uma nova tarefa..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={pressEnter}
                className="flex-1"
              />
              <Button onClick={adicionarTarefa} size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              {tarefasAtivas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Sua lista está vazia</p>
                  <p className="text-sm">Adicione uma tarefa acima</p>
                </div>
              ) : (
                tarefasAtivas.map((tarefa: ITodo) => (
                  <div
                    key={tarefa._id}
                    className={`flex items-center gap-3 p-3 rounded-lg border bg-white transition-all ${
                      tarefa.completed ? "opacity-60" : ""
                    }`}
                  >
                    <Checkbox
                      checked={tarefa.completed}
                      onCheckedChange={() => alternarTarefa(tarefa._id)}
                      id={`todo-${tarefa._id}`}
                    />
                    <label
                      htmlFor={`todo-${tarefa._id}`}
                      className={`flex-1 cursor-pointer ${
                        tarefa.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {tarefa.title}
                    </label>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deletarTarefa(tarefa._id)}
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {tarefasAtivas.length > 0 && (
              <div className="pt-4 border-t">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total: {totalAtivas}</span>
                  <span>Concluídas: {tarefasConcluidas}</span>
                  <span>Restantes: {totalAtivas - tarefasConcluidas}</span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="deleted" className="space-y-4 mt-4">
            <CardDescription className="text-center">
              {tarefasDeletadas.length === 0
                ? "Nenhuma tarefa deletada"
                : `${tarefasDeletadas.length} tarefas deletadas`}
            </CardDescription>

            <div className="space-y-2">
              {tarefasDeletadas.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Nenhuma tarefa deletada</p>
                  <p className="text-sm">
                    As tarefas deletadas aparecerão aqui
                  </p>
                </div>
              ) : (
                tarefasDeletadas.map((tarefa: ITodo) => (
                  <div
                    key={tarefa._id}
                    className="flex items-center gap-3 p-3 rounded-lg border bg-gray-50 opacity-75"
                  >
                    <div className="w-4 h-4" />
                    <span className="flex-1 text-gray-600 line-through">
                      {tarefa.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => restaurarTarefa(tarefa._id)}
                      className="h-8 w-8 text-gray-400 hover:text-green-500"
                      title="Restaurar tarefa"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deletarPermanentemente(tarefa._id)}
                      className="h-8 w-8 text-gray-400 hover:text-red-500"
                      title="Deletar permanentemente"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
