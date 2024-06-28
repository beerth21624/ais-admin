import React, { useState } from 'react';
import {
    Card,
    Table,
    Badge,
    Button,
    Modal,
    Label,
    TextInput,
    Textarea,
    Select,
    Pagination
} from 'flowbite-react';
import { HiOutlineEye, HiOutlineCheck, HiOutlineX, HiOutlineQuestionMarkCircle } from 'react-icons/hi';

interface NewContent {
    id: string;
    question: string;
    aiResponse: string;
    category: string;
    date: string;
    status: 'รอตรวจสอบ' | 'ตรวจสอบแล้ว' | 'ต้องเรียนรู้เพิ่ม';
    confidence: number;
}

const NewProblemPage: React.FC = () => {
    const [newContents, setNewContents] = useState<NewContent[]>([
        { id: '1', question: "วิธีการใช้งานฟีเจอร์ใหม่ X", aiResponse: "ขออภัย ฉันยังไม่มีข้อมูลเกี่ยวกับฟีเจอร์ใหม่ X", category: "ผลิตภัณฑ์", date: "2023-06-20", status: 'รอตรวจสอบ', confidence: 30 },
        { id: '2', question: "นโยบายการคืนสินค้าล่าสุด", aiResponse: "นโยบายการคืนสินค้าของเรา...", category: "นโยบาย", date: "2023-06-21", status: 'ตรวจสอบแล้ว', confidence: 85 },
        { id: '3', question: "วิธีแก้ปัญหา Y ในแอพ", aiResponse: "ฉันไม่แน่ใจเกี่ยวกับปัญหา Y โปรดติดต่อฝ่ายสนับสนุน", category: "การแก้ปัญหา", date: "2023-06-22", status: 'ต้องเรียนรู้เพิ่ม', confidence: 20 },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContent, setSelectedContent] = useState<NewContent | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const handleContentAction = (content: NewContent) => {
        setSelectedContent(content);
        setIsModalOpen(true);
    };

    const handleStatusChange = (id: string, newStatus: 'รอตรวจสอบ' | 'ตรวจสอบแล้ว' | 'ต้องเรียนรู้เพิ่ม') => {
        setNewContents(contents =>
            contents.map(content =>
                content.id === id ? { ...content, status: newStatus } : content
            )
        );
    };

    const onPageChange = (page: number) => setCurrentPage(page);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">ติดตามเนื้อหาและคำถามใหม่</h1>
            <Card>
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>คำถาม</Table.HeadCell>
                            <Table.HeadCell>หมวดหมู่</Table.HeadCell>
                            <Table.HeadCell>วันที่</Table.HeadCell>
                            <Table.HeadCell>ความมั่นใจของ AI</Table.HeadCell>
                            <Table.HeadCell>สถานะ</Table.HeadCell>
                            <Table.HeadCell>การดำเนินการ</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {newContents.map((content) => (
                                <Table.Row key={content.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {content.question.length > 50 ? `${content.question.substring(0, 50)}...` : content.question}
                                    </Table.Cell>
                                    <Table.Cell>{content.category}</Table.Cell>
                                    <Table.Cell>{content.date}</Table.Cell>
                                    <Table.Cell>
                                        <Badge color={content.confidence > 80 ? 'success' : content.confidence > 50 ? 'warning' : 'failure'}>
                                            {content.confidence}%
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge color={
                                            content.status === 'รอตรวจสอบ' ? 'warning' :
                                                content.status === 'ตรวจสอบแล้ว' ? 'success' : 'failure'
                                        }>
                                            {content.status}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex space-x-2">
                                            <Button color="info" size="sm" onClick={() => handleContentAction(content)}>
                                                <HiOutlineEye className="mr-2 h-4 w-4" /> ดู
                                            </Button>
                                            <Button color="success" size="sm" onClick={() => handleStatusChange(content.id, 'ตรวจสอบแล้ว')}>
                                                <HiOutlineCheck className="mr-2 h-4 w-4" /> ตรวจสอบแล้ว
                                            </Button>
                                            <Button color="failure" size="sm" onClick={() => handleStatusChange(content.id, 'ต้องเรียนรู้เพิ่ม')}>
                                                <HiOutlineQuestionMarkCircle className="mr-2 h-4 w-4" /> ต้องเรียนรู้เพิ่ม
                                            </Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
         
            </Card>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
                <Modal.Header>รายละเอียดคำถามและการตอบ</Modal.Header>
                <Modal.Body>
                    {selectedContent && (
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="question" value="คำถาม" />
                                <Textarea
                                    id="question"
                                    value={selectedContent.question}
                                    readOnly
                                    rows={2}
                                />
                            </div>
                            <div>
                                <Label htmlFor="aiResponse" value="การตอบของ AI" />
                                <Textarea
                                    id="aiResponse"
                                    value={selectedContent.aiResponse}
                                    readOnly
                                    rows={4}
                                />
                            </div>
                            <div>
                                <Label htmlFor="category" value="หมวดหมู่" />
                                <TextInput
                                    id="category"
                                    value={selectedContent.category}
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label htmlFor="confidence" value="ความมั่นใจของ AI" />
                                <TextInput
                                    id="confidence"
                                    value={`${selectedContent.confidence}%`}
                                    readOnly
                                />
                            </div>
                            <div>
                                <Label htmlFor="status" value="สถานะ" />
                                <Select
                                    id="status"
                                    value={selectedContent.status}
                                    onChange={(e) => handleStatusChange(selectedContent.id, e.target.value as 'รอตรวจสอบ' | 'ตรวจสอบแล้ว' | 'ต้องเรียนรู้เพิ่ม')}
                                >
                                    <option value="รอตรวจสอบ">รอตรวจสอบ</option>
                                    <option value="ตรวจสอบแล้ว">ตรวจสอบแล้ว</option>
                                    <option value="ต้องเรียนรู้เพิ่ม">ต้องเรียนรู้เพิ่ม</option>
                                </Select>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default NewProblemPage;