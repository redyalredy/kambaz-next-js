import { InputGroup, FormControl, Button } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function AssignmentControls() {
    return (
        <div
            id="wd-assignment-controls"
            className="d-flex justify-content-between align-items-center mb-4"
        >
            <div className="wd-search-wrapper">
                <FaSearch className="wd-search-icon" />
                <FormControl
                    size="lg"
                    placeholder="Search..."
                    id="wd-search-assignment"
                    className="wd-search-input"
                />
            </div>

            <div>
                <Button variant="secondary" size="lg" className="me-2">
                    <FaPlus className="me-2" />
                    Group
                </Button>

                <Button variant="danger" size="lg">
                    <FaPlus className="me-2" />
                    Assignment
                </Button>
            </div>
        </div>
    )
}