import React from 'react';
import { Modal, Button, Label, TextInput, Checkbox } from 'flowbite-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaLink } from 'react-icons/fa';

// Define the shape of our form values
interface FormValues {
    name: string;
    url: string;
    is_recommend: boolean;
}

// Define the props for our component
interface ModalAddLinkProps {
    show: boolean;
    onClose: () => void;
    onAddLink: (link: FormValues) => void;
}

// Create a validation schema using Yup
const validationSchema = Yup.object().shape({
    name: Yup.string(),
    url: Yup.string().url('Invalid URL').required('URL is required'),
    is_recommend: Yup.boolean().default(false),
});

const ModalAddLink: React.FC<ModalAddLinkProps> = ({ show, onClose, onAddLink }) => {
    const initialValues: FormValues = {
        name: '',
        url: '',
        is_recommend: false,
    };

    const handleSubmit = (values: FormValues, { resetForm }: { resetForm: () => void }) => {
        onAddLink(values);
        resetForm();
        onClose();
    };

    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header>Add New Link</Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({values, errors, touched,setFieldValue }) => (
                        <Form className="space-y-2">
                            <div>
                                <Label htmlFor="name" value="Name" />
                                <Field
                                    as={TextInput}
                                    id="name"
                                    name="name"
                                    placeholder="Name"
                                    className={errors.name && touched.name ? 'border-red-500' : ''}
                                />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <Label htmlFor="url" value="URL" />
                                <Field
                                    as={TextInput}
                                    id="url"
                                    name="url"
                                    type="url"
                                    icon={FaLink}
                                    placeholder="https://example.com"
                                    className={errors.url && touched.url ? 'border-red-500' : ''}
                                />
                                <ErrorMessage name="url" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="remember" checked={values.is_recommend} onChange={() =>{
                                    setFieldValue('is_recommend',!values.is_recommend)
                                
                                }} />
                                <Label htmlFor="remember">
                                แสดง link แนะนำ
                                </Label>
                            </div>
                     
                            <div className="flex justify-end space-x-2">
                                <Button color="gray" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" color="success">
                                    Add Link
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
};

export default ModalAddLink;