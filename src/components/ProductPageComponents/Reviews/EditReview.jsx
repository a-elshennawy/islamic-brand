import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReview } from "../../../services/api/products";
import { Rating, Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BtnSpinner from "../../Loaders/BtnSpinner";
import Toastify from "toastify-js";

function EditReview({ review, onCancel }) {
  const [t] = useTranslation();
  const [rating, setRating] = useState(review?.rating);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ rating, review: reviewText }) =>
      updateReview(review.id, rating, reviewText),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      Toastify({
        text: t("review updated"),
        className: "toast-success",
        duration: 3000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
      }).showToast();
      onCancel();
    },
    onError: (error) => {
      Toastify({
        text: error || t("failed updating review"),
        className: "toast-error",
        duration: 3000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
      }).showToast();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reviewText = formData.get("review");
    mutate({ rating, review: reviewText });
  };

  return (
    <form onSubmit={handleSubmit} className="reviewsForm my-2">
      <Box dir="ltr" className="inputContainer p-0">
        <Rating
          name="edit-rating"
          value={rating}
          precision={1}
          onChange={(_, newValue) => setRating(newValue)}
          sx={{
            direction: "ltr",
            "& .MuiRating-iconHover": { transform: "none" },
          }}
        />
      </Box>
      <div className="inputContainer">
        <textarea
          name="review"
          rows={4}
          required
          defaultValue={review?.review}
          placeholder={t("write your review")}
        />
      </div>
      <button type="submit" disabled={isPending || rating === 0}>
        {isPending ? <BtnSpinner color="var(--dark-sec-color)" /> : t("save")}
      </button>
      <button type="button" onClick={onCancel} disabled={isPending}>
        {t("cancel")}
      </button>
    </form>
  );
}

export default EditReview;
