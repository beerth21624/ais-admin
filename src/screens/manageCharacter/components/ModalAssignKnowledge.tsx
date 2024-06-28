import { Button, Card, Modal, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { FaCheck, FaFolder, FaSearch } from 'react-icons/fa'
import Nodata from '../../../components/common/Nodata'

// service
import { CharacterService } from '../../../services'

type Props = {
    character_id: string | undefined;
    isOpen: boolean;
    onClose: () => void;
    folders: any[];
}

const ModalAssignKnowledge = (props: Props) => {
    const { character_id, isOpen, onClose, folders } = props
    const [selectedFolder, setSelectedFolder] = useState<any[]>([])
    const [searchTerm, setSearchTerm] = useState('')


    const handleSelectFolder = (folder_id: any) => {
        setSelectedFolder((prev) => 
            prev.includes(folder_id) ? prev.filter((id) => id !== folder_id) : [...prev, folder_id]
        )
    }

    const handleSave = async () => {
        if(!character_id) return
        try {
            const response = await CharacterService.assignKnowledge(character_id, { folder_ids: selectedFolder })
            if (response.data) {
                onClose()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const filteredFolders = folders.filter(folder => 
        folder.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <Modal show={isOpen} onClose={onClose} size="xl">
            <Modal.Header className="text-2xl font-bold text-gray-800">เพิ่มคลังความรู้</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <div className="relative">
                        <TextInput
                            id="search"
                            type="text"
                            icon={FaSearch}
                            placeholder="ค้นหาคลังความรู้"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full "
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                        {filteredFolders.map((folder) => (
                            <Card key={folder._id} className="mb-3 cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out">
                                <div 
                                    className="flex items-center justify-between"
                                    onClick={() => handleSelectFolder(folder._id)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <FaFolder className="text-blue-500" size={20} />
                                        <span className="text-gray-700">{folder.name}</span>
                                    </div>
                                    {selectedFolder.includes(folder._id) && (
                                        <FaCheck className="text-green-500" size={20} />
                                    )}
                                </div>
                            </Card>
                        ))}
                        {
                            filteredFolders.length === 0 && (
                                <Nodata />
                            )
                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleSave}>
                    บันทึก
                </Button>
                <Button color="gray" onClick={onClose}>
                    ยกเลิก
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAssignKnowledge