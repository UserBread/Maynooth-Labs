import { Form } from './delete';
import { UpdatePersonal } from './updatePersonal';
import "../../styles/updatePersonal.css";

export const DeleteAccount = () => {
    return (
        <div className="flex-container">
            <div className="container">
                <UpdatePersonal />
                <Form />
            </div>
        </div>
    );
}