import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Avatar, Badge, Card, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { HiOutlineChartPie, HiOutlineChat, HiOutlineDocumentText, HiOutlineUsers } from 'react-icons/hi';

ChartJS.register(ArcElement, Tooltip, Legend);

type RecentChat = {
    user: string;
    character: string;
    time: string;
    status: 'active' | 'ended';
};

type PopularCharacter = {
    name: string;
    image: string;
    chats: number;
};

const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeChats: 0,
        knowledgeItems: 0,
        charactersCount: 0,
    });

    const [recentChats, setRecentChats] = useState<RecentChat[]>([]);
    const [popularCharacters, setPopularCharacters] = useState<PopularCharacter[]>([]);
    const [aiPerformance, setAiPerformance] = useState({
        accuracy: 0,
        responseTime: 0,
        userSatisfaction: 0,
    });

    useEffect(() => {
        // จำลองการเรียก API
        setTimeout(() => {
            setStats({
                totalUsers: 5678,
                activeChats: 123,
                knowledgeItems: 4567,
                charactersCount: 50,
            });

            setRecentChats([
                { user: 'คุณ A', character: 'หลานเอง', time: '5 นาทีที่แล้ว', status: 'active' },
                { user: 'คุณ B', character: 'น้องแบงค์', time: '15 นาทีที่แล้ว', status: 'ended' },
                { user: 'คุณ C', character: 'คุณครูใจดี', time: '30 นาทีที่แล้ว', status: 'active' },
                { user: 'คุณ D', character: 'หลานเอง', time: '1 ชั่วโมงที่แล้ว', status: 'ended' },
                { user: 'คุณ E', character: 'น้องแบงค์', time: '2 ชั่วโมงที่แล้ว', status: 'ended' },
            ]);

            setPopularCharacters([
                { name: 'หลานเอง', image: 'https://example.com/luan-eng.jpg', chats: 1234 },
                { name: 'น้องแบงค์', image: 'https://example.com/nong-bank.jpg', chats: 987 },
                { name: 'คุณครูใจดี', image: 'https://example.com/kind-teacher.jpg', chats: 765 },
                { name: 'หมอน้อย', image: 'https://example.com/little-doctor.jpg', chats: 543 },
                { name: 'เชฟมือทอง', image: 'https://example.com/golden-chef.jpg', chats: 321 },
            ]);

            setAiPerformance({
                accuracy: 85,
                responseTime: 92,
                userSatisfaction: 88,
            });
        }, 1000);
    }, []);

    const aiPerformanceData = {
        labels: ['ความแม่นยำ', 'เวลาตอบสนอง', 'ความพึงพอใจของผู้ใช้'],
        datasets: [
            {
                data: [aiPerformance.accuracy, aiPerformance.responseTime, aiPerformance.userSatisfaction],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };


    return (
        <div className="container mx-auto ">
            <h1 className="text-3xl font-bold mb-8">แดชบอร์ดภาพรวมระบบ</h1>

            {/* สถิติหลัก */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <div className="flex items-center">
                        <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-blue-600 bg-blue-100 rounded-lg mr-3">
                            <HiOutlineUsers className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block text-2xl font-bold">{stats.totalUsers.toLocaleString()}</span>
                            <span className="block text-gray-500">ผู้ใช้ทั้งหมด</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center">
                        <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-green-600 bg-green-100 rounded-lg mr-3">
                            <HiOutlineChat className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block text-2xl font-bold">{stats.activeChats.toLocaleString()}</span>
                            <span className="block text-gray-500">แชทที่กำลังสนทนา</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center">
                        <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-yellow-600 bg-yellow-100 rounded-lg mr-3">
                            <HiOutlineDocumentText className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block text-2xl font-bold">{stats.knowledgeItems.toLocaleString()}</span>
                            <span className="block text-gray-500">รายการความรู้</span>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center">
                        <div className="inline-flex flex-shrink-0 justify-center items-center w-12 h-12 text-purple-600 bg-purple-100 rounded-lg mr-3">
                            <HiOutlineChartPie className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="block text-2xl font-bold">{stats.charactersCount.toLocaleString()}</span>
                            <span className="block text-gray-500">ตัวละครทั้งหมด</span>
                        </div>
                    </div>
                </Card>
            </div>

            {/* แผนภูมิและตาราง */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <Card>
                    <h5 className="text-xl font-bold mb-4">ประสิทธิภาพของ AI หลานเอง</h5>
                    <div className="w-full max-w-md mx-auto">
                        <Doughnut data={aiPerformanceData} />
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-sm font-medium text-gray-500">ความแม่นยำ</p>
                            <p className="text-lg font-semibold text-blue-600">{aiPerformance.accuracy}%</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">เวลาตอบสนอง</p>
                            <p className="text-lg font-semibold text-green-600">{aiPerformance.responseTime}%</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">ความพึงพอใจ</p>
                            <p className="text-lg font-semibold text-yellow-600">{aiPerformance.userSatisfaction}%</p>
                        </div>
                    </div>
                </Card>
                <Card>
                    <div className='h-full '>
                    <h5 className="text-xl font-bold mb-4">การสนทนาล่าสุด</h5>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>ผู้ใช้</Table.HeadCell>
                            <Table.HeadCell>ตัวละคร</Table.HeadCell>
                            <Table.HeadCell>เวลา</Table.HeadCell>
                            <Table.HeadCell>สถานะ</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {recentChats.map((chat, index) => (
                                <Table.Row key={index}>
                                    <Table.Cell>{chat.user}</Table.Cell>
                                    <Table.Cell>{chat.character}</Table.Cell>
                                    <Table.Cell>{chat.time}</Table.Cell>
                                    <Table.Cell>
                                        <Badge color={chat.status === 'active' ? 'success' : 'gray'}>
                                            {chat.status === 'active' ? 'กำลังสนทนา' : 'จบการสนทนา'}
                                        </Badge>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    </div>
                </Card>
            </div>

            {/* ตัวละครยอดนิยม */}
            <Card>
                <h5 className="text-xl font-bold mb-4">ตัวละครยอดนิยม</h5>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {popularCharacters.map((character, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <Avatar size="xl" img={character.image} rounded />
                            <span className="mt-2 font-medium">{character.name}</span>
                            <span className="text-sm text-gray-500">{character.chats.toLocaleString()} การสนทนา</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default DashboardPage;