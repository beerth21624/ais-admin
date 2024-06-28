import { Badge, Button, Modal, Table } from 'flowbite-react';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { HiPencil, HiPlus, HiTrash } from 'react-icons/hi';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as Yup from 'yup';
import Nodata from '../../../components/common/Nodata';

//service
import { KnowledgeService } from '../../../services';

const MySwal = withReactContent(Swal)

type KnowledgeItem = {
    _id?: string;
    question: string;
    answer: string;
    record_status?: 'A' | 'I';
};

type KnowledgeQAProps = {
    folder_id: string | undefined;
    knowledgeItems: KnowledgeItem[];
    onChangeKnowledgeState?: (knowledgeItems: KnowledgeItem[]) => void;
};

const validationSchema = Yup.object().shape({
    question: Yup.string().required('คำถามจำเป็นต้องกรอก'),
    answer: Yup.string().required('คำตอบจำเป็นต้องกรอก'),
});

const KnowledgeQA: React.FC<KnowledgeQAProps> = ({
    folder_id,
    knowledgeItems,
    onChangeKnowledgeState,
}) => {
    const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);
    const [editingKnowledgeItem, setEditingKnowledgeItem] = useState<KnowledgeItem | null>(null);

    const onAddKnowledge = () => {
        setEditingKnowledgeItem(null);
        setIsKnowledgeModalOpen(true);
    };

    const onEditKnowledge = (item: KnowledgeItem) => {
        setEditingKnowledgeItem(item);
    };



    const onSaveKnowledge = async (values: KnowledgeItem, { resetForm }: any) => {
        try {
            if (!folder_id) return;
            const response = await KnowledgeService.createKnowledgeQA(folder_id, {
                question: values.question,
                answer: values.answer,
                record_status: 'A',
            });
            if (response.status === 201) {
                onChangeKnowledgeState && onChangeKnowledgeState(response.data.qa_knowledge);
                console.log('data', response.data.qa_knowledge);
                MySwal.fire({
                    icon: 'success',
                    title: 'สำเร็จ!',
                    text: `คำถาม ${editingKnowledgeItem ? 'อัพเดท' : 'เพิ่ม'} สำเร็จ`,
                    showConfirmButton: false,
                    timer: 1500,
                })
                setIsKnowledgeModalOpen(false);
                resetForm();
            }
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
            })
        }
    };

const onDeleteKnowledge = async (id: string) => {
    //modal confirm
    MySwal.fire({
        title: 'คุณแน่ใจหรือไม่?',
        text: 'คุณต้องการลบคำถามนี้ใช่หรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ใช่',
        cancelButtonText: 'ไม่',
    }).then(async (result) => {
        if (result.isConfirmed) {
            await deleteKnowledge(id);
        }
    })

}

const deleteKnowledge = async (id: string) => {
    console.log('folder_id', folder_id)
    try {
        if (!folder_id) return;
        const response = await KnowledgeService.deleteKnowledgeQA(folder_id, id);
        if (response.status === 200) {
            onChangeKnowledgeState && onChangeKnowledgeState(response.data.qa_knowledge);
            MySwal.fire({
                icon: 'success',
                title: 'สำเร็จ!',
                text: 'ลบคำถามสำเร็จ',
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





    return (
        <div className="mt-2 p-2 ">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-xl font-bold">
                        คำถาม-คำตอบ
                    </h1>
                    <p className='text-sm text-gray-500'>{`ทั้งหมด ${knowledgeItems.length} รายการ `}</p>
                </div>
                <Button color="success" onClick={onAddKnowledge}>
                    <HiPlus className="mr-2" /> เพิ่มคำถาม
                </Button>
            </div>

            <Table hoverable>
                <Table.Head>
                    <Table.HeadCell>คำถาม</Table.HeadCell>
                    <Table.HeadCell>คำตอบ</Table.HeadCell>
                    <Table.HeadCell>สถานะ</Table.HeadCell>
                    <Table.HeadCell>การจัดการ</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {knowledgeItems.map((item) => (
                        <Table.Row key={item._id}>
                            <Table.Cell>{item.question}</Table.Cell>
                            <Table.Cell>{item.answer}</Table.Cell>
                            <Table.Cell>
                                <div className='flex'>
                                    <Badge color={
                                        item.record_status === 'A' ? 'success' : 'failure'
                                    }>{
                                            item.record_status === 'A' ? 'Active' : 'Inactive'
                                        }</Badge>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <Button.Group>
                                    <Button color="info" onClick={() => onEditKnowledge(item)}>
                                        <HiPencil />
                                    </Button>
                                    <Button color="failure" onClick={() => {
                                        if (!item._id) return;
                                        onDeleteKnowledge(item._id)
                                    }}>
                                        <HiTrash />
                                    </Button>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}{
                        knowledgeItems.length === 0 && (
                            <Table.Row>
                                <Table.Cell colSpan={4}>
                                    <div className='min-h-96 flex items-center justify-center'>
                                        <Nodata />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table>

            <Modal show={isKnowledgeModalOpen} onClose={() => {
                setIsKnowledgeModalOpen(false);
            }}>
                <Modal.Header>{editingKnowledgeItem ? 'แก้ไขคำถาม' : 'เพิ่มคำถาม'}</Modal.Header>
                <Formik
                    initialValues={editingKnowledgeItem || { question: '', answer: '' }}
                    validationSchema={validationSchema}
                    onSubmit={onSaveKnowledge}
                >
                    {({ errors, touched }) => (
                        <Form>
                            <Modal.Body>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="question" className="block mb-2">คำถาม</label>
                                        <Field
                                            name="question"
                                            type="text"
                                            className="w-full px-3 py-2 border rounded-md"
                                            placeholder="กรอกคำถาม"
                                        />
                                        {errors.question && touched.question && <div className="text-red-500">{errors.question}</div>}
                                    </div>
                                    <div>
                                        <label htmlFor="answer" className="block mb-2">คำตอบ</label>
                                        <Field
                                            as="textarea"
                                            name="answer"
                                            className="w-full px-3 py-2 border rounded-md"
                                            placeholder="กรอกคำตอบ"
                                            rows={4}
                                        />
                                        {errors.answer && touched.answer && <div className="text-red-500">{errors.answer}</div>}
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button type="submit" color="success">บันทึก</Button>
                                <Button color="gray" onClick={() => {
                                    setIsKnowledgeModalOpen(false);
                                }}>ยกเลิก</Button>
                            </Modal.Footer>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </div>
    );
};

export default KnowledgeQA;