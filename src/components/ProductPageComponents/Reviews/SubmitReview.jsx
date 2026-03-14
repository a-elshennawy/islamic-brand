import { useTranslation } from "react-i18next";
import { useIsAr } from "../../../hooks/useIsAr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview } from "../../../services/api/products";
import { Rating, Box } from "@mui/material";
import { useState } from "react";
import BtnSpinner from "../../Loaders/BtnSpinner";

function SubmitReview({ id }) {
  const [t] = useTranslation();
  const isAr = useIsAr();
  const [rating, setRating] = useState(3);
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ review, rating }) => addReview(id, rating, review),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", id]);
      setRating(3);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const review = formData.get("review");

    mutate({ review, rating });
    e.target.reset();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="reviewsForm col-xl-2 col-lg-2 col-md-10 col-sm-10 col-10 my-2"
      >
        <h4>{t("add a review")}</h4>

        <Box dir="ltr" className="inputContainer p-0">
          <Rating
            name="product-rating"
            value={rating}
            precision={1}
            onChange={(event, newValue) => setRating(newValue)}
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
            placeholder={t("write your review")}
          />
        </div>

        <button type="submit" disabled={isPending || rating === 0}>
          {isPending ? (
            <BtnSpinner color="var(--dark-sec-color)" />
          ) : (
            t("submit review")
          )}
        </button>
      </form>
    </>
  );
}

export default SubmitReview;
