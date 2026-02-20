import { useLocation, useNavigate } from "react-router-dom";

export const usePagination = (maxPage = 1) => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(search);
  const page = parseInt(searchParams.get("page"), 10) || 1;

  const updateUrl = (newPage) => {
    if (newPage < 1 || newPage > maxPage) return;

    const params = new URLSearchParams(search);
    if (newPage <= 1) {
      params.delete("page");
    } else {
      params.set("page", newPage.toString());
    }

    navigate({
      pathname,
      search: params.toString() ? `?${params.toString()}` : "",
    });
  };

  return {
    page,
    handlePrevPage: () => updateUrl(page - 1),
    handleNextPage: () => updateUrl(page + 1),
    isFirstPage: page <= 1,
    isLastPage: page >= maxPage,
  };
};
