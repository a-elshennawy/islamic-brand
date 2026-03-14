import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getUserId } from "../../../utils/helpers";
import DeleteReview from "./DeleteReview";
import EditReview from "./EditReview";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";

function ReviewCard({ review }) {
  const userId = getUserId();
  const isOwner = userId == review?.user?.id;
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="reviewItem p-2 text-center">
        {isOwner && !isEditing && (
          <div className="d-flex justify-content-center gap-2">
            <DeleteReview id={review?.id} />
            <button className="editBtn" onClick={() => setIsEditing(true)}>
              <FaEdit size={24} />
            </button>
          </div>
        )}

        {isEditing ? (
          <EditReview review={review} onCancel={() => setIsEditing(false)} />
        ) : (
          <>
            <h4>{review?.user?.name}</h4>
            <Rating
              name="text-feedback"
              value={review?.rating}
              readOnly
              precision={1}
              size="small"
              emptyIcon={
                <StarBorderIcon style={{ opacity: 0.4 }} fontSize="inherit" />
              }
              sx={{
                fontSize: "1.25rem",
                "& .MuiRating-iconFilled": { fontSize: "inherit" },
                "& .MuiRating-iconEmpty": { fontSize: "inherit" },
              }}
            />
            <h4>{review?.review}</h4>
          </>
        )}
      </div>
    </>
  );
}

export default ReviewCard;
