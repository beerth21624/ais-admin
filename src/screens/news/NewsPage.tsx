import {
    Badge,
    Button,
    Card,
    Label,
    Modal,
    Select,
    Table,
    TextInput,
    Textarea
} from 'flowbite-react';
import React, { useState } from 'react';
import { HiEye, HiPencil, HiPlus, HiTrash } from 'react-icons/hi';

interface NewsItem {
    id: string;
    title: string;
    content: string;
    category: string;
    publishDate: string;
    status: 'ร่าง' | 'เผยแพร่' | 'ถูกลบ';
}

const NewsPage: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([
        { id: '1', title: 'โปรโมชั่นใหม่ประจำเดือน', content: 'รายละเอียดโปรโมชั่น...', category: 'โปรโมชั่น', publishDate: '2023-06-01', status: 'เผยแพร่' },
        { id: '2', title: 'การปรับปรุงระบบ', content: 'รายละเอียดการปรับปรุง...', category: 'ระบบ', publishDate: '2023-06-15', status: 'ร่าง' },
        { id: '3', title: 'ข่าวสารบริษัท', content: 'รายละเอียดข่าวสาร...', category: 'ทั่วไป', publishDate: '2023-05-20', status: 'เผยแพร่' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const handleNewsAction = (news: NewsItem | null, creating: boolean = false) => {
        setSelectedNews(news);
        setIsCreating(creating);
        setIsModalOpen(true);
    };

    const handleSaveNews = (event: React.FormEvent) => {
        event.preventDefault();
        if (isCreating) {
            console.log('Creating new news:', selectedNews);
        } else {
            console.log('Updating news:', selectedNews);
        }
        setIsModalOpen(false);
    };

    const handleDeleteNews = (id: string) => {
        // Logic to delete news
        console.log('Deleting news with id:', id);
        setNews(news.filter(item => item.id !== id));
    };

    return (
        <div className="">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">จัดการข่าวสาร</h1>
                <Button color="success" onClick={() => handleNewsAction(null, true)}>
                    <HiPlus className="mr-2 h-5 w-5" /> สร้างข่าวใหม่
                </Button>
            </div>
            <Card>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>หัวข้อข่าว</Table.HeadCell>
                        <Table.HeadCell>หมวดหมู่</Table.HeadCell>
                        <Table.HeadCell>วันที่เผยแพร่</Table.HeadCell>
                        <Table.HeadCell>สถานะ</Table.HeadCell>
                        <Table.HeadCell>การดำเนินการ</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {news.map((item) => (
                            <Table.Row key={item.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.title}
                                </Table.Cell>
                                <Table.Cell>{item.category}</Table.Cell>
                                <Table.Cell>{item.publishDate}</Table.Cell>
                                <Table.Cell>
                                    <Badge color={item.status === 'เผยแพร่' ? 'success' : item.status === 'ร่าง' ? 'warning' : 'failure'}>
                                        {item.status}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex space-x-2">
                                        <Button color="info" size="sm" onClick={() => handleNewsAction(item)}>
                                            <HiEye className="mr-2 h-4 w-4" /> ดู
                                        </Button>
                                        <Button color="warning" size="sm" onClick={() => handleNewsAction(item)}>
                                            <HiPencil className="mr-2 h-4 w-4" /> แก้ไข
                                        </Button>
                                        <Button color="failure" size="sm" onClick={() => handleDeleteNews(item.id)}>
                                            <HiTrash className="mr-2 h-4 w-4" /> ลบ
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="xl">
                <Modal.Header>{isCreating ? 'สร้างข่าวใหม่' : 'แก้ไขข่าว'}</Modal.Header>
                <form onSubmit={handleSaveNews}>
                    <Modal.Body>
                        <div className="space-y-6">
                            <div>
                                <Label htmlFor="title" value="หัวข้อข่าว" />
                                <TextInput
                                    id="title"
                                    value={selectedNews?.title || ''}
                                    onChange={(e) => setSelectedNews(prev => prev ? { ...prev, title: e.target.value } : null)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="content" value="เนื้อหาข่าว" />
                                <Textarea
                                    id="content"
                                    value={selectedNews?.content || ''}
                                    onChange={(e) => setSelectedNews(prev => prev ? { ...prev, content: e.target.value } : null)}
                                    required
                                    rows={4}
                                />
                            </div>
                            <div>
                                <Label htmlFor="category" value="หมวดหมู่" />
                                <Select
                                    id="category"
                                    value={selectedNews?.category || ''}
                                    onChange={(e) => setSelectedNews(prev => prev ? { ...prev, category: e.target.value } : null)}
                                    required
                                >
                                    <option value="โปรโมชั่น">โปรโมชั่น</option>
                                    <option value="ระบบ">ระบบ</option>
                                    <option value="ทั่วไป">ทั่วไป</option>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="publishDate" value="วันที่เผยแพร่" />
                                <TextInput
                                    id="publishDate"
                                    type="date"
                                    value={selectedNews?.publishDate || ''}
                                    onChange={(e) => setSelectedNews(prev => prev ? { ...prev, publishDate: e.target.value } : null)}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="status" value="สถานะ" />
                                <Select
                                    id="status"
                                    value={selectedNews?.status || ''}
                                    onChange={(e) => setSelectedNews(prev => prev ? { ...prev, status: e.target.value as 'ร่าง' | 'เผยแพร่' | 'ถูกลบ' } : null)}
                                    required
                                >
                                    <option value="ร่าง">ร่าง</option>
                                    <option value="เผยแพร่">เผยแพร่</option>
                                    <option value="ถูกลบ">ถูกลบ</option>
                                </Select>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" color="success">บันทึก</Button>
                        <Button color="gray" onClick={() => setIsModalOpen(false)}>
                            ยกเลิก
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default NewsPage;