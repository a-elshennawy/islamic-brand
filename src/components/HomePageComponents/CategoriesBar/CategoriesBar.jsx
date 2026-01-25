import "./CategoriesBar.css";
import { useCategories } from "../../../hooks/useGeneral";
import { AnimatePresence, motion as Motion } from "motion/react";
import SectionLoader from "../../Loaders/SectionLoader";

function CategoriesBar() {
  const { data: categories, isLoading } = useCategories();
  const categoriesArray = Array.isArray(categories) ? categories : [];

  if (isLoading) return <SectionLoader />;
  if (categoriesArray.length === 0) return null;

  return (
    <>
      <div className="categoriesBar row justify-content-center align-items-center gap-2 m-0 py-2">
        <AnimatePresence>
          {categoriesArray.map((category) => (
            <Motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              key={category.id}
              className="categoryIcon text-center p-2 col-2"
            >
              <img src={category.image} alt={category.name} />
              <h4 className="m-0">{category.name}</h4>
            </Motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CategoriesBar;
