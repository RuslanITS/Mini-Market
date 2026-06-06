import { ListGroup } from "react-bootstrap";
import { categories } from "../../constans";

const Sidebar = () => {
  return (
    <>
      <h4 className="mb-3">Categories</h4>

      <ListGroup>
        <ListGroup.Item action>All</ListGroup.Item>

        {categories.map(category => (
          <ListGroup.Item
            key={category.id}
            action
          >
            {category.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;