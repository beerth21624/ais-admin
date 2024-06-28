import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    TextInput,
    Badge,
    Timeline,
    Dropdown,
    Textarea,
    Avatar
} from 'flowbite-react';
import {
    HiPhone,
    HiVideoCamera,
    HiChat,
    HiDesktopComputer,
    HiUser,
    HiOutlineChevronDoubleRight,
    HiOutlineChevronDoubleLeft,
    HiMail,
    HiLocationMarker,
    HiCalendar,
    HiTag,
    HiPlus
} from 'react-icons/hi';

const CallCenterPage: React.FC = () => {
    const navigate = useNavigate();
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [tags, setTags] = useState<string[]>(['ลูกค้า VIP', 'โทรบ่อย']);
    const [newTag, setNewTag] = useState('');

    const addTag = () => {
        if (newTag && !tags.includes(newTag)) {
            setTags([...tags, newTag]);
            setNewTag('');
        }
    };

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className="flex flex-col lg:flex-row ">
            <Button
                onClick={toggleSidebar}
                className="lg:absolute lg:left-0 lg:top-1/2 lg:transform lg:-translate-y-1/2 z-10 mb-4 lg:mb-0"
            >
                {isSidebarCollapsed ? <HiOutlineChevronDoubleRight /> : <HiOutlineChevronDoubleLeft />}
            </Button>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold mb-6">call center หลานเอง</h1>
                <Button color="light" onClick={() => navigate('/call-center')}>
                  ย้อนกลับ
                    </Button>
                    </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                        <h5 className="text-xl font-bold mb-2">หน้าจอลูกค้า</h5>
                        <div className="bg-gray-200 h-full  min-h-64 lg:min-h-96 flex items-center justify-center">
                            <HiDesktopComputer className="w-20 h-20 text-gray-400" />
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <Button.Group>
                                <Button color="gray">
                                    <HiPhone className="mr-2 h-5 w-5" /> โทรเสียง
                                </Button>
                                <Button color="gray">
                                    <HiVideoCamera className="mr-2 h-5 w-5" /> วิดีโอคอล
                                </Button>
                                <Button color="gray">
                                    <HiChat className="mr-2 h-5 w-5" /> แชท
                                </Button>
                            </Button.Group>
                        </div>
                    </Card>

                    <Card className="overflow-hidden">
                        <h5 className="text-xl font-bold mb-4">ข้อมูลลูกค้า</h5>
                        <div className="flex items-center mb-4">
                            <Avatar size="lg" img="/images/profile.png" rounded />
                            <div className="ml-4">
                                <p className="text-lg font-semibold">สมชาย ใจดี</p>
                                <p className="text-sm text-gray-500">เป็นลูกค้าตั้งแต่: ม.ค. 2565</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <TextInput icon={HiUser} placeholder="ชื่อลูกค้า" defaultValue="สมชาย ใจดี" />
                            <TextInput icon={HiPhone} placeholder="เบอร์โทรศัพท์" defaultValue="081-234-5678" />
                            <TextInput icon={HiMail} placeholder="อีเมล" defaultValue="somchai@example.com" />
                            <TextInput icon={HiLocationMarker} placeholder="ที่อยู่" defaultValue="กรุงเทพมหานคร, ประเทศไทย" />
                            <TextInput icon={HiCalendar} placeholder="ติดต่อล่าสุด" defaultValue="15/06/2566" />

                            <Dropdown label="หมวดหมู่ปัญหา">
                                <Dropdown.Item>ปัญหาทางเทคนิค</Dropdown.Item>
                                <Dropdown.Item>สอบถามเรื่องบิล</Dropdown.Item>
                                <Dropdown.Item>ข้อมูลผลิตภัณฑ์</Dropdown.Item>
                                <Dropdown.Item>จัดการบัญชี</Dropdown.Item>
                                <Dropdown.Item>ขอฟีเจอร์เพิ่มเติม</Dropdown.Item>
                                <Dropdown.Item>ร้องเรียน</Dropdown.Item>
                                <Dropdown.Item>อื่นๆ</Dropdown.Item>
                            </Dropdown>

                            <Textarea
                                placeholder="บันทึกเพิ่มเติม"
                                rows={4}
                            />

                            <div className="flex flex-col sm:flex-row justify-between gap-2">
                                <Button color="light" className="w-full sm:w-auto"
                                    onClick={() => navigate('/customer-full-profile')}
                                >ดูโปรไฟล์ทั้งหมด</Button>
                                <Button color="success" className="w-full sm:w-auto">บันทึกการเปลี่ยนแปลง</Button>
                            </div>
                        </div>
                    </Card>
                    <Card className="lg:col-span-2 flex ">
                        <div className='w-full h-full'>
                        <h5 className="text-xl font-bold mb-2">เครื่องมือสนับสนุน</h5>
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                            <Button color="light">ช่วยเหลือระยะไกล</Button>
                            <Button color="light">ส่งคำแนะนำ</Button>
                            <Button color="light">ฐานความรู้</Button>
                            <Button color="light">จับภาพหน้าจอ</Button>
                            <Button color="light">ส่งไฟล์</Button>
                            <Button color="light">ยกระดับการโทร</Button>
                        </div>
                        </div>
                    </Card>
                    <Card>
                        <h5 className="text-xl font-bold mb-2">ประวัติการโทร</h5>
                        <Timeline>
                            <Timeline.Item>
                                <Timeline.Point icon={HiPhone} />
                                <Timeline.Content>
                                    <Timeline.Time>2 ชั่วโมงที่แล้ว</Timeline.Time>
                                    <Timeline.Title>ปัญหาทางเทคนิค</Timeline.Title>
                                    <Timeline.Body>
                                        ช่วยติดตั้งแอพพลิเคชัน
                                    </Timeline.Body>
                                    <Badge color="success">แก้ไขแล้ว</Badge>
                                </Timeline.Content>
                            </Timeline.Item>
                            <Timeline.Item>
                                <Timeline.Point icon={HiChat} />
                                <Timeline.Content>
                                    <Timeline.Time>เมื่อวาน</Timeline.Time>
                                    <Timeline.Title>สอบถามเรื่องบิล</Timeline.Title>
                                    <Timeline.Body>
                                        อธิบายตัวเลือกการสมัครสมาชิก
                                    </Timeline.Body>
                                    <Badge color="warning">รอดำเนินการ</Badge>
                                </Timeline.Content>
                            </Timeline.Item>
                        </Timeline>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CallCenterPage;