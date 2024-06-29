import { Button, Table, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiBookOpen, HiPencil, HiSearch, HiTrash } from 'react-icons/hi';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Nodata from '../../components/common/Nodata';
const MySwal = withReactContent(Swal)

//components
import ModalActionKnowledge from './components/ModalActionKnowledge';

//service
import { FolderService } from '../../services';



interface KnowledgeItem {
    _id: string;
    name: string;
    description: string;
    record_status: 'A' | 'I';
}

const ManageKnowledgeView = () => {
    const navigate = useNavigate();
    const [isOpenActionModal, setIsOpenActionModal] = useState<boolean>(false)
    const [knowledge, setKnowledge] = useState<KnowledgeItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof KnowledgeItem>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
    const [selectedFolderForAction, setSelectedFolderForAction] = useState<KnowledgeItem | null>(null)

    useEffect(() => {
        fetchKnowledge();
    }, []);

    const fetchKnowledge = async () => {
        try {
            const response = await FolderService.getFolders();
            setKnowledge(response.data);
        } catch (e) {
            MySwal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
            })
        }
     
    };


    const handleSort = (column: keyof KnowledgeItem) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const sortedKnowledge = [...knowledge].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredKnowledge = sortedKnowledge.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSubmitFolder = async (formData: any) => {
        try {
            const response = await FolderService.createFolder(formData);
            if (response.data) {
                fetchKnowledge();
                MySwal.fire({
                    icon: 'success',
                    title: 'สำเร็จ!',
                    text: 'เพิ่มคลังความรู้สำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        } catch (e) {
            MySwal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
            })
        }
      
    }

    const onSubmitEditFolder = async (formData: any) => {
        if (!selectedFolderForAction) return
        try {
            const response = await FolderService.updateFolder(selectedFolderForAction?._id, formData);
            if (response.data) {
                fetchKnowledge();
                MySwal.fire({
                    icon: 'success',
                    title: 'สำเร็จ!',
                    text: 'แก้ไขคลังความรู้สำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        } catch (e) {
            MySwal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
            })
        }
        finally {
            setSelectedFolderForAction(null)
        }
    }

    const onDeleteFolder = async (folder_id: string) => {
        MySwal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'คุณต้องการลบคลังความรู้นี้หรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ใช่, ลบ!',
            cancelButtonText: 'ยกเลิก',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFolder(folder_id)
            }
        })
    }
    const deleteFolder = async (folder_id: string) => {


        try {
            const response = await FolderService.deleteFolder(folder_id);
            if (response.data) {
                fetchKnowledge();
                MySwal.fire({
                    icon: 'success',
                    title: 'สำเร็จ!',
                    text: 'ลบคลังความรู้สำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        } catch (e) {
            MySwal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด!',
            })
        }
        
    }


    return (
        <div className="w-full flex flex-col h-full">
            <div>
                <h1 className="text-2xl font-bold mb-4">คลังความรู้</h1>
                <div className="flex justify-between items-center mb-4">
                    <div className="w-1/3">
                        <TextInput
                            icon={HiSearch}
                            placeholder="Search knowledge..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button color="success"
                        onClick={() => {
                            setIsOpenActionModal(true)
                        }}
                    >เพิ่มคลังความรู้</Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell className="cursor-pointer" onClick={() => handleSort('name')}>
                            Title {sortColumn === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </Table.HeadCell>
                        <Table.HeadCell className="cursor-pointer" onClick={() => handleSort('description')}>
                            Description {sortColumn === 'description' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </Table.HeadCell>
                        <Table.HeadCell className="cursor-pointer" onClick={() => handleSort('record_status')}>
                            Status {sortColumn === 'record_status' && (sortDirection === 'asc' ? '↑' : '↓')}
                        </Table.HeadCell>
                        <Table.HeadCell>Actions</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {filteredKnowledge.map((item) => (
                            <Table.Row key={item._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {item.name}
                                </Table.Cell>
                                <Table.Cell>{item.description}</Table.Cell>
                                <Table.Cell>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.record_status === 'A' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                        {item.record_status === 'A' ? 'Active' : 'Inactive'}
                                    </span>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center space-x-2">
                                        <Button size="sm" color="info"
                                            onClick={() => {
                                                navigate(`/training/${item._id}`)
                                            }}
                                        >
                                            <HiBookOpen className="h-5 w-5" />
                                        </Button>
                                        <Button size="sm" color="light" onClick={() => {
                                            setSelectedFolderForAction(item)
                                            setIsOpenActionModal(true)
                                        }
                                        }
                                        >
                                            <HiPencil className="h-5 w-5" />
                                        </Button>
                                        <Button size="sm" color="failure"
                                            onClick={() => {
                                                onDeleteFolder(item._id)
                                            }}
                                        >
                                            <HiTrash className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
            {filteredKnowledge.length <= 0 ? (
                <div className='flex flex-col items-center justify-center h-full'>
                    <Nodata />
                </div>
            ) : null}
            <ModalActionKnowledge
                isOpen={isOpenActionModal}
                onClose={() => {
                    setIsOpenActionModal(false)
                    setSelectedFolderForAction(null)
                }}
                onSubmit={(formData) => {
                    if (selectedFolderForAction) {
                        onSubmitEditFolder(formData)
                    } else {
                        onSubmitFolder(formData)
                    }
                    setIsOpenActionModal(false)
                }}
                folder={selectedFolderForAction}
            />

        </div>
    )
}

export default ManageKnowledgeView