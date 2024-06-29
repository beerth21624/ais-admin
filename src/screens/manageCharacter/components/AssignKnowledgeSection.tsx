import { Button, Table } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiPencil, HiPlus, HiTrash } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Nodata from '../../../components/common/Nodata';
import ModalAssignKnowledge from './ModalAssignKnowledge';
const MySwal = withReactContent(Swal)

//service
import { CharacterService, FolderService } from '../../../services';

type Props = {
    character_id: string | undefined;
}

type KnowledgeItem = {
    _id: string;
    name: string;
    description: string;
};

const AssignKnowledgeSection = (props: Props) => {
    const navigate = useNavigate();
    const { character_id } = props;
    const [folders, setFolders] = useState<any[]>([])

    const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
    const [isKnowledgeModalOpen, setIsKnowledgeModalOpen] = useState(false);


    useEffect(() => {
        fetchFolders();
        fetchKnowledge();
    }, [])

    const fetchFolders = async () => {
        try {
            const response = await FolderService.getFolders()
            if (response.data) {
                setFolders(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const fetchKnowledge = async () => {
        if (!character_id) return;
        try {
            const response = await CharacterService.getCharacterKnowledge(character_id)
            if (response.data) {
                setKnowledgeItems(response.data)
            }
        } catch (e) {
            console.log(e)
        }
    }



    const handleAddKnowledge = () => {
        setIsKnowledgeModalOpen(true);
    };

    const handleDeleteKnowledge = (id: string) => {
        MySwal.fire({
            icon: 'warning',
            title: 'คุณแน่ใจหรือไม่ที่จะลบความรู้นี้?',
            showCancelButton: true,
            confirmButtonText: 'ใช่',
            cancelButtonText: 'ไม่ใช่',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteKnowledge(id)
            }
        })
    }

    const deleteKnowledge = async (id: string) => {
        if (!character_id) return;
        try {
            const response =await CharacterService.deleteCharacterKnowledge(character_id, { folder_id: id })
            if (response.data) {
            MySwal.fire({
                icon: 'success',
                title: 'ลบสำเร็จ',
                showConfirmButton: false,
                timer: 1500,
                willClose: () => {
                    setKnowledgeItems(response.data.folder_knowledge || [])
                }
            })
        }
        }
        catch (e) {
            MySwal.fire({
                icon: 'error',
                title: 'ลบไม่สำเร็จ',
            })
        }

    };

    const newFolders = folders.filter(folder => !knowledgeItems.some(item => item._id === folder._id))

    return (
        <div className='mt-8'>
            <div className='flex  items-center justify-between'>
                <h2 className="text-xl font-semibold mt-8 mb-4">ความรู้ของหลานเอง</h2>
                <Button color="success" onClick={handleAddKnowledge} className="">
                    <HiPlus className="mr-2" /> เพิ่มความรู้
                </Button>
            </div>
            <Table>
                <Table.Head>
                    <Table.HeadCell>คลังความรู้</Table.HeadCell>
                    <Table.HeadCell>คำอธิบาย</Table.HeadCell>
                    <Table.HeadCell>การจัดการ</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                    {knowledgeItems.map((item) => (
                        <Table.Row key={item._id}>
                            <Table.Cell>{item.name}</Table.Cell>
                            <Table.Cell>{item.description}</Table.Cell>
                            <Table.Cell>
                                <Button.Group>
                                    <Button color="warning" onClick={() => {
                                        navigate(`/training/${item._id}`)
                                    }}>
                                        <HiPencil />
                                    </Button>

                                    <Button color="failure" onClick={() => handleDeleteKnowledge(item._id)}>
                                        <HiTrash />
                                    </Button>
                                </Button.Group>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                    {
                        knowledgeItems.length === 0 && (
                            <Table.Row key='12312312'>
                                <Table.Cell colSpan={3}>
                                    <Nodata />
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table>
            <ModalAssignKnowledge
                character_id={character_id}
                isOpen={isKnowledgeModalOpen}
                onClose={() => {
                    setIsKnowledgeModalOpen(false)
                }}
                onSubmit={() => {
                    setIsKnowledgeModalOpen(false)
                    fetchKnowledge()
                }
                }
                folders={newFolders}
            />
        </div>
    )
}

export default AssignKnowledgeSection