import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    TextInput,
    Dropdown,
    Badge,
    Button,
    Textarea,
    Avatar,
    Tabs,
    Table,
    Progress
} from 'flowbite-react';
import {
    HiUser,
    HiPhone,
    HiMail,
    HiLocationMarker,
    HiCalendar,
    HiTag,
    HiPlus,
    HiCreditCard,
    HiShoppingCart,
    HiChatAlt,
    HiDocumentText,
} from 'react-icons/hi';

const CustomerFullProfilePage: React.FC = () => {
    const navigate = useNavigate();



    return (
        <div className=" ">
            <div className=" mx-auto">
                <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8">ข้อมูลลูกค้า</h1>
                <Button color="light" onClick={()=>{
                  navigate('/call-center-detail')
                }}>
                    ย้อนกลับ
                </Button>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    {/* คอลัมน์ซ้าย */}
                    <div className="lg:col-span-1 space-y-4 sm:space-y-6 lg:space-y-8">
                        <Card>
                            <div className="flex flex-col items-center pb-6 sm:pb-10">
                                <Avatar size="xl" img="/images/profile.png" rounded />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white mt-4">
                                    สมชาย ใจดี
                                </h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    เป็นลูกค้าตั้งแต่: ม.ค. 2565
                                </span>
                                <div className="flex mt-4 space-x-3 md:mt-6">
                                   
                                    <Button color="light">
                                        <HiMail className="mr-2 h-5 w-5" />
                                        ข้อความ
                                    </Button>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <h5 className="text-lg sm:text-xl font-bold mb-4">สถานะลูกค้า</h5>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm sm:text-base font-medium text-blue-700 dark:text-white">ความพึงพอใจ</span>
                                        <span className="text-sm font-medium text-blue-700 dark:text-white">85%</span>
                                    </div>
                                    <Progress progress={85} color="blue" size="lg" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm sm:text-base font-medium text-green-700 dark:text-white">ความรู้ที่ได้รับ</span>
                                        <span className="text-sm font-medium text-green-700 dark:text-white">92%</span>
                                    </div>
                                    <Progress progress={92} color="green" size="lg" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm sm:text-base font-medium text-yellow-700 dark:text-white">สามารถแก้ปัญหาได้</span>
                                        <span className="text-sm font-medium text-yellow-700 dark:text-white">60%</span>
                                    </div>
                                    <Progress progress={60} color="yellow" size="lg" />
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* คอลัมน์ขวา */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6 lg:space-y-8">
                        <Card>
                            <Tabs aria-label="ข้อมูลลูกค้า" style="underline">
                                <Tabs.Item active icon={HiUser} title="ข้อมูลพื้นฐาน">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <TextInput icon={HiUser} placeholder="ชื่อ-นามสกุล" defaultValue="สมชาย ใจดี" />
                                        <TextInput icon={HiPhone} placeholder="เบอร์โทรศัพท์" defaultValue="081-234-5678" />
                                        <TextInput icon={HiMail} placeholder="อีเมล" defaultValue="somchai@example.com" />
                                        <TextInput icon={HiLocationMarker} placeholder="ที่อยู่" defaultValue="กรุงเทพมหานคร, ประเทศไทย" />
                                        <TextInput icon={HiCalendar} placeholder="วันเกิด" defaultValue="15/03/2528" />
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item icon={HiCreditCard} title="การชำระเงิน">
                                    <div className="space-y-4">
                                        <TextInput icon={HiCreditCard} placeholder="บัตรเครดิต" defaultValue="**** **** **** 1234" />
                                        <TextInput icon={HiCalendar} placeholder="วันหมดอายุ" defaultValue="12/2568" />
                                        <TextInput icon={HiLocationMarker} placeholder="ที่อยู่สำหรับเรียกเก็บเงิน" defaultValue="123 ถ.สุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110" />
                                    </div>
                                </Tabs.Item>
                                <Tabs.Item icon={HiShoppingCart} title="การสมัครบริการ">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <Table.Head>
                                                <Table.HeadCell>แพ็กเกจ</Table.HeadCell>
                                                <Table.HeadCell>วันที่เริ่มต้น</Table.HeadCell>
                                                <Table.HeadCell>วันที่สิ้นสุด</Table.HeadCell>
                                                <Table.HeadCell>สถานะ</Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body className="divide-y">
                                                <Table.Row>
                                                    <Table.Cell>แพ็กเกจพรีเมียม</Table.Cell>
                                                    <Table.Cell>01/01/2566</Table.Cell>
                                                    <Table.Cell>31/12/2566</Table.Cell>
                                                    <Table.Cell><Badge color="success">กำลังใช้งาน</Badge></Table.Cell>
                                                </Table.Row>
                                                <Table.Row>
                                                    <Table.Cell>แพ็กเกจพื้นฐาน</Table.Cell>
                                                    <Table.Cell>01/01/2565</Table.Cell>
                                                    <Table.Cell>31/12/2565</Table.Cell>
                                                    <Table.Cell><Badge color="gray">หมดอายุ</Badge></Table.Cell>
                                                </Table.Row>
                                            </Table.Body>
                                        </Table>
                                    </div>
                                </Tabs.Item>
                            </Tabs>
                        </Card>

                        <Card>
                            <h5 className="text-lg sm:text-xl font-bold mb-4">ประวัติการติดต่อ</h5>
                            <div className="overflow-x-auto">
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>วันที่</Table.HeadCell>
                                        <Table.HeadCell>ประเภท</Table.HeadCell>
                                        <Table.HeadCell>หัวข้อ</Table.HeadCell>
                                        <Table.HeadCell>สถานะ</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divide-y">
                                        <Table.Row>
                                            <Table.Cell>15/06/2566</Table.Cell>
                                            <Table.Cell>
                                                <Badge icon={HiPhone} color="info">โทรศัพท์</Badge>
                                            </Table.Cell>
                                            <Table.Cell>ปัญหาด้านเทคนิค</Table.Cell>
                                            <Table.Cell><Badge color="success">แก้ไขแล้ว</Badge></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>20/05/2566</Table.Cell>
                                            <Table.Cell>
                                                <Badge icon={HiChatAlt} color="info">แชท</Badge>
                                            </Table.Cell>
                                            <Table.Cell>สอบถามเรื่องการเรียกเก็บเงิน</Table.Cell>
                                            <Table.Cell><Badge color="success">แก้ไขแล้ว</Badge></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>10/04/2566</Table.Cell>
                                            <Table.Cell>
                                                <Badge icon={HiChatAlt} color="info">แชท</Badge>
                                            </Table.Cell>
                                            <Table.Cell>ข้อมูลผลิตภัณฑ์</Table.Cell>
                                            <Table.Cell><Badge color="success">แก้ไขแล้ว</Badge></Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                        </Card>

                        <Card>
                            <h5 className="text-lg sm:text-xl font-bold mb-4">Note</h5>
                            <Textarea
                                placeholder="เพิ่มบันทึกเกี่ยวกับลูกค้าที่นี่..."
                                rows={4}
                            />
                            <Button className="mt-4 w-full sm:w-auto">
                                <HiDocumentText className="mr-2 h-5 w-5" />
                                บันทึก
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerFullProfilePage;