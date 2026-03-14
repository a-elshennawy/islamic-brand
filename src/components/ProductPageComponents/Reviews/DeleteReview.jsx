import { RiChatDeleteFill } from "react-icons/ri";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReview } from "../../../services/api/products";
import Toastify from "toastify-js";
import { useTranslation } from "react-i18next";

function DeleteReview({ id }) {
  const queryClient = useQueryClient();
  const [t] = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      Toastify({
        text: t("review is deleted"),
        className: "toast-success",
        duration: 3000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
      }).showToast();
    },

    onError: (error) => {
      Toastify({
        text: error || t("failed deleting review"),
        className: "toast-error",
        duration: 3000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
      }).showToast();
    },
  });

  return (
    <>
      <button
        className="deleteBtn"
        onClick={() => mutate()}
        disabled={isPending}
      >
        <RiChatDeleteFill size={24} />
      </button>
    </>
  );
}

export default DeleteReview;
