import { Button, Label, Modal, TextInput, Textarea, ToggleSwitch } from 'flowbite-react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import * as Yup from 'yup';

interface FolderData {
    _id?: string;
    name: string;
    description: string;
    record_status: string;
}


interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (folderData: FolderData) => void;
    folder?: FolderData | null;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('กรุณากรอกชื่อโฟลเดอร์'),
    description: Yup.string(),
});

const ModalActionKnowledge: React.FC<Props> = ({ isOpen, onClose, onSubmit,folder }) => {

    const initialValues: FolderData = {
        name: folder?.name || '',
        description: folder?.description || '',
        record_status: folder?.record_status || 'A',
    };

    const handleSubmit = (values: FolderData, { setSubmitting }: FormikHelpers<FolderData>) => {
        onSubmit(values);
        setSubmitting(false);
        onClose();
    };

    return (
        <Modal show={isOpen} onClose={onClose} size="xl">
            <Modal.Header>สร้างคลังความรู้</Modal.Header>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Modal.Body>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name" value="ชื่อคลังความรู้" />
                                    <Field as={TextInput} id="name" name="name" required />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <Label htmlFor="description" value="คำอธิบาย" />
                                    <Field as={Textarea} id="description" name="description" rows={3} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <Label htmlFor="record_status" value="สถานะ" />
                                    <ToggleSwitch
                                        id="record_status"
                                        name="record_status"
                                        checked={values.record_status === "A"}
                                        onChange={(value) => {
                                            setFieldValue("record_status", value ? "A" : "I");
                                        }}
                                        label={values?.record_status === "A" ? "Active" : "Inactive"}

                                    />
                                </div>

                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button type="submit" color="success" disabled={isSubmitting}>
                                สร้างคลังความรู้
                            </Button>
                            <Button color="gray" onClick={onClose}>
                                ยกเลิก
                            </Button>
                        </Modal.Footer>
                    </Form>
                )}
            </Formik>
        </Modal>
    );
};

export default ModalActionKnowledge;