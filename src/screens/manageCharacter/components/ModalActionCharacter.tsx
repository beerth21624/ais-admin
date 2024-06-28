import {
  Button,
  FileInput,
  Label,
  Modal,
  TextInput,
  Textarea,
  ToggleSwitch,
} from "flowbite-react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (character: any) => void;
  character?: CharacterData;
};

type CharacterData = {
  id?: string;
  name: string;
  image?: string | undefined;
  image_name?: string | undefined;
  image_url?: string | undefined;
  description: string;
  prompt: string;
  record_status?: string;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("กรุณากรอกชื่อ"),
  image: Yup.mixed().required("กรุณาอัปโหลดรูปภาพ"),
  description: Yup.string().required("กรุณากรอกคำอธิบาย"),
  prompt: Yup.string().required("กรุณากรอก Prompt"),
});

const ModalActionCharacter: React.FC<Props> = ({
  isOpen,
  onClose,
  onSubmit,
  character,
}) => {
  const initialValues: CharacterData = character || {
    name: "",
    image: "",
    description: "",
    prompt: "",
    record_status: "A",
  };

  const handleSubmit = (values: CharacterData) => {
    console.log("values", values)
    if (character) {
      onSubmit(values);
    } else {
      if (!values.image) return;
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("prompt", values.prompt);
      formData.append("image", values.image);

      //log formData
      for (var pair of formData.entries()) {
        console.log(pair[0] + ", " + pair[1]);
      }
      
      onSubmit(formData);
    }
  };

  return (
    <Modal show={isOpen} onClose={onClose} size="xl">
      <Modal.Header>
        {character ? "แก้ไขข้อมูลหลาน" : "เพิ่มหลานใหม่"}
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values);
          setSubmitting(false);
        }}
      >
        {({values, isSubmitting, setFieldValue }) => (
          <Form>
            <Modal.Body>
              <div className="space-y-2">
          
                <div>
                  <Label htmlFor="name" value="ชื่อ" />
                  <Field as={TextInput} id="name" name="name" required />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                {character ? null: (
                  <div>
                    <Label htmlFor="image" value="รูปภาพ" />
                    <FileInput
                      id="image"
                      helperText="อัปโหลดรูปภาพของหลาน"
                      onChange={(event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          setFieldValue("image", file);
                        }
                      }}
                    />
                    <ErrorMessage
                      name="image"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                )}
                <div>
                  <Label htmlFor="description" value="คำอธิบาย" />
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    rows={3}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="prompt" value="Prompt" />
                  <Field
                    as={Textarea}
                    id="prompt"
                    name="prompt"
                    rows={3}
                    helperText="ใส่ prompt สำหรับ AI เพื่อสร้างบุคลิกของหลาน"
                  />
                  <ErrorMessage
                    name="prompt"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                              {/* record_status switch */}
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
                {character ? "บันทึกการแก้ไข" : "เพิ่มหลาน"}
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

export default ModalActionCharacter;
