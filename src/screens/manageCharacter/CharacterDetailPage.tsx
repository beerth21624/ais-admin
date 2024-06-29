import { Badge, Button, Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { HiOutlineChatAlt2, HiOutlineInformationCircle, HiPencil, HiTrash } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ModalActionCharacter from './components/ModalActionCharacter';
const MySwal = withReactContent(Swal)
import AssignKnowledgeSection from './components/AssignKnowledgeSection';

//services
import { CharacterService } from '../../services';

type Character = {
    id?: string;
    name: string
    image?: string | undefined
    image_name?: string | undefined
    image_url?: string | undefined
    description: string
    prompt: string
    record_status: string
};



const CharacterDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [character, setCharacter] = useState<Character | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            callCharacterApi()
          
        };

        fetchData();

    }, []);

    useEffect(() => {
    }, [])

  



    const callCharacterApi = async () => {
        if (!id) return;
        try {
            const response = await CharacterService.getCharacterById(id)
            console.log(response.data)
            setCharacter(response.data)
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const handleEditCharacter = () => {
        setIsEditModalOpen(true);
    };


    if (!character) {
        return <div>Loading...</div>;
    }


    const callApiUpdateCharacter = async (character: Character) => {
        console.log('character update', character)
        if (!id) return;
        const dataForUpdate = {
            name: character.name,
            description: character.description,
            prompt: character.prompt,
            record_status: character.record_status
        }
        try {
            const response = await CharacterService.updateCharacter(id, dataForUpdate)
            if (response.status === 200) {
                MySwal.fire({
                    icon: 'success',
                    title: 'สำเร็จ!',
                    text: 'แก้ไขหลานสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                    didClose() {
                        callCharacterApi()
                    },

                })
            }

        } catch (e) {
            MySwal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถแก้ไขหลานได้',
            })
        }
    }



    const handleDeleteCharacter = () => {
        MySwal.fire({
            title: 'คุณแน่ใจหรือไม่?',
            text: 'หลานที่ถูกลบจะไม่สามารถกู้คืนได้!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ใช่, ลบหลาน!',
            cancelButtonText: 'ยกเลิก'
        }).then((result) => {
            if (result.isConfirmed) {
                callApiDeleteCharacter()
            }
        })

    }

    const callApiDeleteCharacter = async () => {
        if (!id) return;
        try {
            const response = await CharacterService.deleteCharacter(id)
            if (response.status === 200) {
                MySwal.fire({
                    icon: 'success',
                    title: 'สำเร็จ!',
                    text: 'ลบหลานสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                })
                window.history.back()
            }

        } catch (e) {
            MySwal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: 'ไม่สามารถลบหลานได้',
            })
        }
    }

    return (
        <div>
            <div className="container mx-auto p-4">
                <Card className=" mx-auto shadow-lg">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 mb-4 md:mb-0">
                            <img
                                src={character.image_url}
                                alt={character.name}
                                className="w-full h-96 object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                        <div className="md:w-2/3 md:pl-6">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-3xl font-bold text-gray-800">{character.name}</h1>
                                <Badge color={character.record_status === 'A' ? 'success' :'failure'} size="sm">{
                                    character.record_status === 'A' ? 'Active' : 'Inactive'
                                
                                }</Badge>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Button color='light' size="sm" className="mb-4" onClick={handleEditCharacter}>
                                    <HiPencil className="mr-2" /> แก้ไขข้อมูล
                                </Button>
                                <Button color='failure' size="sm" className="mb-4"
                                    onClick={handleDeleteCharacter}
                                >
                                    <HiTrash className="mr-2" /> ลบ
                                </Button>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-start">
                                    <HiOutlineInformationCircle className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2 mt-1" />
                                    <p className="text-gray-600"><span className="font-semibold">คำอธิบาย:</span> {character.description}</p>
                                </div>
                                <div className="flex items-start">
                                    <HiOutlineChatAlt2 className="flex-shrink-0 w-5 h-5 text-gray-500 mr-2 mt-1" />
                                    <p className="text-gray-600"><span className="font-semibold">Prompt:</span> {character.prompt}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
                <AssignKnowledgeSection 
                character_id={id}
                />

              
            </div>
            <div className='flex justify-start'>
                <Button color="light" onClick={() => window.history.back()} className="mb-4">
                    ย้อนกลับ
                </Button>
            </div>
  
            <ModalActionCharacter
                character={{
                    ...character,
                    image: character.image_url
                }}
                isOpen={isEditModalOpen}
                onClose={() => {
                    setIsEditModalOpen(false)
                }}
                onSubmit={(formData) => {
                    callApiUpdateCharacter(formData)
                    setIsEditModalOpen(false)
                }
                }
            />
        </div>
    );
};

export default CharacterDetailPage;