import "./Search.css";
import { FaSearch } from "react-icons/fa";
import { Box, Drawer } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMobile from "../../hooks/useMobile";
import { useTranslation } from "react-i18next";

function Search() {
  const [t] = useTranslation();
  const { isMobile } = useMobile();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-shop?search=${searchTerm}`);
      setOpen(false);
    }
  };

  return (
    <>
      <button className="actionBtn" onClick={toggleDrawer(true)}>
        <FaSearch size={18} />
      </button>

      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            className: "searchDrawer",
          },
        }}
      >
        <Box sx={{ height: isMobile ? 250 : 350 }} role="presentation">
          <form
            onSubmit={handleSearch}
            className="inputContainer p-0 text-center"
          >
            <h6>{t("search products")}</h6>
            <input
              type="search"
              required
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("product name")}
            />
            <button type="submit" className="my-2 mx-auto">
              {t("search")}
            </button>
          </form>
        </Box>
      </Drawer>
    </>
  );
}
export default Search;
