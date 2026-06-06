import { ListGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { categories } from "../../constans";

const Sidebar = () => {
  return (
    <>
      <h4 className="mb-3">Categories</h4>

      <ListGroup>
        <ListGroup.Item
          as={NavLink}
          to="/"
        >
          All
        </ListGroup.Item>

        {categories.map(category => (
          <ListGroup.Item
            key={category.id}
            as={NavLink}
            to={`/${category.id}`}
          >
            {category.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;