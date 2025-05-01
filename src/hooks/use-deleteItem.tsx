import { useState } from 'react';
import { toast } from 'sonner';

type DeleteFunction = (id: string) => Promise<void>;

/**
 * Hook para gerenciar a exclusão de itens com diálogo de confirmação
 * @param deleteFunction Função que realiza a exclusão na API
 * @param onSuccess Callback executada após exclusão bem-sucedida
 */
export function useDeleteItem<T extends { id: string | number }>(
  deleteFunction: DeleteFunction,
  onSuccess?: () => void
) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteClick = (item: T) => {
    setItemToDelete(item);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    
    setIsDeleting(true);
    try {
      await deleteFunction(String(itemToDelete.id));
      toast.success("Item excluído com sucesso");
      setDeleteDialogOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Erro ao excluir item:", error);
      toast.error("Erro ao excluir item. Tente novamente.");
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  };

  return {
    itemToDelete,
    deleteDialogOpen,
    isDeleting,
    handleDeleteClick,
    confirmDelete,
    setDeleteDialogOpen
  };
}