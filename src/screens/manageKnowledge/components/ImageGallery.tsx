import { Button, Modal, Table, TextInput } from 'flowbite-react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react';
import { HiPencil, HiPlus, HiTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as Yup from 'yup';
import Nodata from '../../../components/Nodata';
const MySwal = withReactContent(Swal)

//service
import { KnowledgeService } from '../../../services';

interface ImageItem {
    _id: string;
    description: string;
    image_url: string;
}

interface ImageFormValues {
    description: string;
    image: File | null;
}

const validationSchema = Yup.object().shape({
    description: Yup.string().required('คำอธิบายรูปภาพจำเป็นต้องกรอก'),
    image: Yup.mixed<File>()
        .test('fileSize', 'ไฟล์ขนาดใหญ่เกินไป', (value) => {
            if (!value) return true;
            return value.size <= 1024 * 1024 * 5; // 5MB
        })
        .test('fileType', 'รองรับเฉพาะไฟล์รูปภาพ', (value) => {
            if (!value) return true;
            return ['image/jpeg', 'image/png', 'image/gif'].includes(value.type);
        }),
});

interface ImageGalleryProps {
    folder_id: string | undefined;
    imageItems: ImageItem[];
    onChangeImageState ?: (imageItems: ImageItem[]) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
    folder_id,
    imageItems,
    onChangeImageState
}) => {
    const [isImageModalOpen, setIsImageModalOpen] = React.useState(false);
    const [editingImageItem, setEditingImageItem] = React.useState<ImageItem | null>(null);

    
    const initialValues: ImageFormValues = {
        description: editingImageItem?.description || '',
        image: null,
    };

    const handleSubmit = (
        values: ImageFormValues,
        { setSubmitting, resetForm }: FormikHelpers<ImageFormValues>
    ) => {
        onSaveImage(values);
        setSubmitting(false);
        resetForm();
        onCloseModal();
    };

    const onAddImage = () => {
        setEditingImageItem(null);
        setIsImageModalOpen(true);
    };

    const onEditImage = (item: ImageItem) => {
        setEditingImageItem(item);
        setIsImageModalOpen(true);
    };

    const onDeleteImage = (id: string) => {
        if (!folder_id) return;
        MySwal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณต้องการลบรูปภาพนี้ใช่หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ลบ!',
            cancelButtonText: 'ยกเลิก',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await KnowledgeService.deleteKnowledgeImage(folder_id, id);
                    if (response.status === 200) {
                        onChangeImageState && onChangeImageState(response.data.image_knowledge);
                        MySwal.fire({
                            icon: 'success',
                            title: 'สำเร็จ!',
                            text: 'ลบรูปภาพสำเร็จ',
                            showConfirmButton: false,
                            timer: 1500,
                        })
                    }
                } catch (error) {
                    MySwal.fire({
                        icon: 'error',
                        title: 'เกิดข้อผิดพลาด!',
                    })
                }
            }
        });

    };

    const onCloseModal = () => {
        setIsImageModalOpen(false);
    };

    const onSaveImage = async (values: ImageFormValues) => {
        try {
            if (!folder_id) return;
            const formData = new FormData();
            formData.append('description', values.description);
            formData.append('image', values.image as File);

                const response = await KnowledgeService.createKnowledgeImage(folder_id, formData);
                if (response.status === 201) {
                    onChangeImageState && onChangeImageState(response.data.image_knowledge);
                    setIsImageModalOpen(false);
                    MySwal.fire({
                        icon: 'success',
                        title: 'สำเร็จ!',
                        text: `รูปภาพ ${editingImageItem ? 'อัพเดท' : 'เพิ่ม'} สำเร็จ`,
                        showConfirmButton: false,
                        timer: 1500,
                    })

                }
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
            })
        }
    };



    return (
        <div className="mt-2 p-2 ">
                <div className="flex justify-between items-center mb-4">
                    <div>
                <h1 className="text-xl font-bold">
                    คลังรูปภาพ
                </h1>
                    <p className='text-sm text-gray-500'>{`ทั้งหมด ${imageItems.length} รายการ `}</p>
                </div>
                <Button color="success" onClick={onAddImage}>
                    <HiPlus className="mr-2" /> เพิ่มรูปภาพ
                </Button>
            </div>

            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>รูปภาพ</Table.HeadCell>
                    <Table.HeadCell>คำอธิบาย</Table.HeadCell>
                    <Table.HeadCell>การจัดการ</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {imageItems.map((item) => (
                        <Table.Row key={item._id}>
                            <Table.Cell>
                                <img src={item.image_url} alt={item.description} className="w-14 h-14 object-cover" />
                            </Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell>
                                <Button.Group>
                                    <Button color="info" onClick={() => onEditImage(item)}>
                                        <HiPencil />
                                    </Button>
                                    <Button color="failure" onClick={() => onDeleteImage(item._id)}>
                                        <HiTrash />
                                    </Button>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    {imageItems.length === 0 && (
                        <Table.Row>
                            <Table.Cell colSpan={3}>
                                    <div className='min-h-96 flex items-center justify-center'>
                                        <Nodata />
                                    </div>
                            </Table.Cell>
                        </Table.Row>
                    )}

                </Table.Body>
            </Table>

            <Modal show={isImageModalOpen} onClose={onCloseModal}>
                <Modal.Header>{editingImageItem?._id ? 'แก้ไขรูปภาพ' : 'เพิ่มรูปภาพ'}</Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <Modal.Body>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="description" className="block mb-2">คำอธิบาย</label>
                                        <Field
                                            as={TextInput}
                                            id="description"
                                            name="description"
                                            placeholder="กรอกคำอธิบายรูปภาพ"
                                        />
                                        <ErrorMessage name="description" component="div" className="text-red-500 mt-1" />
                                    </div>
                                    <div>
                                        <label htmlFor="image" className="block mb-2">รูปภาพ</label>
                                        <input
                                            id="image"
                                            name="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setFieldValue("image", event.currentTarget.files?.[0] || null);
                                            }}
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                        />
                                        <ErrorMessage name="image" component="div" className="text-red-500 mt-1" />
                                    </div>
                                    {(editingImageItem?.image_url|| values.image) && (
                                        <div>
                                            <p className="mb-2">ตัวอย่างรูปภาพ:</p>
                                            <img
                                                src={values.image ? URL.createObjectURL(values.image) : editingImageItem?.image_url}
                                                alt="Preview"
                                                className="max-w-full h-auto"
                                                style={{
                                                    maxHeight: '200px',
                                                
                                                }}
                                                
                                            />
                                        </div>
                                    )}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" color="success" disabled={isSubmitting}>
                                    บันทึก
                                </Button>
                                <Button color="gray" onClick={onCloseModal}>
                                    ยกเลิก
                                </Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default ImageGallery;