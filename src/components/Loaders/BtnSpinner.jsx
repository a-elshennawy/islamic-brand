import CircularProgress from "@mui/material/CircularProgress";
import "./loaders.css";

function BtnSpinner({ color = "var(--main-color)", size = 20 }) {
  return (
    <>
      <div className="btnSpinner p-0">
        <CircularProgress size={size} sx={{ color: color }} />
      </div>
    </>
  );
}

export default BtnSpinner;
