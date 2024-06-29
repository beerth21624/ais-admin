import {
    Badge,
    Button,
    Card,
    Label,
    Modal,
    Table,
    Tabs,
    TextInput,
    Textarea
} from 'flowbite-react';
import React, { useState } from 'react';
import { HiChat, HiClock, HiExclamation, HiPhone, HiTag, HiUser } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface IncomingCall {
    id: string;
    name: string;
    phoneNumber: string;
    waitTime: number;
    issue: string;
    status: 'รอสาย' | 'กำลังสนทนา' | 'เสร็จสิ้น';
    priority: 'ต่ำ' | 'ปานกลาง' | 'สูง';
}

const CallCenterViewPage: React.FC = () => {
    const navigate = useNavigate();
    const [calls] = useState<IncomingCall[]>([
        { id: '1', name: 'สมชาย ใจดี', phoneNumber: '081-234-5678', waitTime: 120, issue: 'ปัญหาการเชื่อมต่อ', status: 'รอสาย', priority: 'ปานกลาง' },
        { id: '2', name: 'สมหญิง รักดี', phoneNumber: '089-876-5432', waitTime: 60, issue: 'สอบถามยอดค้างชำระ', status: 'กำลังสนทนา', priority: 'ต่ำ' },
        { id: '3', name: 'มานี มีเงิน', phoneNumber: '062-345-6789', waitTime: 30, issue: 'ต้องการยกเลิกบริการ', status: 'รอสาย', priority: 'สูง' },
        { id: '4', name: 'สมศรี ดีใจ', phoneNumber: '091-122-3344', waitTime: 15, issue: 'ปัญหาการชำระเงิน', status: 'กำลังสนทนา', priority: 'ปานกลาง' },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCall, setSelectedCall] = useState<IncomingCall | null>(null);

    const handleCallAction = (call: IncomingCall) => {
        setSelectedCall(call);
        setIsModalOpen(true);
    };

    const handleTransferToCallCenter = () => {
        console.log('Transferring call to main call center:', selectedCall);
        setIsModalOpen(false);
        navigate('/call-center-detail');
    };

    const renderCallTable = (status: 'รอสาย' | 'กำลังสนทนา') => (
        <Table hoverable>
            <Table.Head>
                <Table.HeadCell><HiUser className="mr-2 inline" />ชื่อลูกค้า</Table.HeadCell>
                <Table.HeadCell><HiPhone className="mr-2 inline" />เบอร์โทรศัพท์</Table.HeadCell>
                <Table.HeadCell><HiClock className="mr-2 inline" />เวลารอ (นาที)</Table.HeadCell>
                <Table.HeadCell><HiTag className="mr-2 inline" />ปัญหา</Table.HeadCell>
                <Table.HeadCell><HiExclamation className="mr-2 inline" />ความสำคัญ</Table.HeadCell>
                <Table.HeadCell>การดำเนินการ</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
                {calls
                    .filter(call => call.status === status)
                    .sort((a, b) => {
                        const priorityOrder = { 'สูง': 0, 'ปานกลาง': 1, 'ต่ำ': 2 };
                        return priorityOrder[a.priority] - priorityOrder[b.priority] || b.waitTime - a.waitTime;
                    })
                    .map((call) => (
                        <Table.Row key={call.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {call.name}
                            </Table.Cell>
                            <Table.Cell>{call.phoneNumber}</Table.Cell>
                            <Table.Cell>{Math.floor(call.waitTime / 60)}</Table.Cell>
                            <Table.Cell>{call.issue}</Table.Cell>
                            <Table.Cell>
                                <Badge color={call.priority === 'สูง' ? 'failure' : call.priority === 'ปานกลาง' ? 'warning' : 'success'}>
                                    {call.priority}
                                </Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <Button color="info" onClick={() => handleCallAction(call)}>
                                    {status === 'รอสาย' ? 'รับสาย' : 'ดูรายละเอียด'}
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
            </Table.Body>
        </Table>
    );

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">จัดการสายเรียกเข้า</h1>
            <Tabs aria-label="Call Management Tabs">
                <Tabs.Item active title="สายที่กำลังรอ" icon={HiPhone}>
                    <Card>
                        {renderCallTable('รอสาย')}
                    </Card>
                </Tabs.Item>
                <Tabs.Item title="สายที่กำลังดำเนินการ" icon={HiChat}>
                    <Card>
                        {renderCallTable('กำลังสนทนา')}
                    </Card>
                </Tabs.Item>
            </Tabs>

            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Header>รายละเอียดสายเรียกเข้า</Modal.Header>
                <Modal.Body>
                    {selectedCall && (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name" value="ชื่อลูกค้า" />
                                <TextInput id="name" value={selectedCall.name} readOnly />
                            </div>
                            <div>
                                <Label htmlFor="phoneNumber" value="เบอร์โทรศัพท์" />
                                <TextInput id="phoneNumber" value={selectedCall.phoneNumber} readOnly />
                            </div>
                            <div>
                                <Label htmlFor="issue" value="ปัญหา" />
                                <Textarea id="issue" value={selectedCall.issue} rows={3} readOnly />
                            </div>
                            <div>
                                <Label htmlFor="priority" value="ความสำคัญ" />
                                <Badge color={selectedCall.priority === 'สูง' ? 'failure' : selectedCall.priority === 'ปานกลาง' ? 'warning' : 'success'}>
                                    {selectedCall.priority}
                                </Badge>
                            </div>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button color="success" onClick={handleTransferToCallCenter}>
                        {selectedCall?.status === 'รอสาย' ? 'รับสาย' : 'โอนสายไปยัง Call Center'}
                    </Button>
                    <Button color="gray" onClick={() => setIsModalOpen(false)}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CallCenterViewPage;