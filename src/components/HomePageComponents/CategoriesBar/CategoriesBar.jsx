import "./CategoriesBar.css";
import { useCategories } from "../../../hooks/useGeneral";
import { motion, AnimatePresence } from "motion/react";

function CategoriesBar() {
  const { data: categories } = useCategories();
  const categoriesArray = Array.isArray(categories) ? categories : [];
  return (
    <>
      <div className="categoriesBar row justify-content-center align-items-center gap-2 m-0 py-2">
        <AnimatePresence>
          {categoriesArray.map((category) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              key={category.id}
              className="categoryIcon text-center p-2 col-2"
            >
              <img src={category.image} alt={category.name} />
              <h4 className="m-0">{category.name}</h4>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

export default CategoriesBar;
