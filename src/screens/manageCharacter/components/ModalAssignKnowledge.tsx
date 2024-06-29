import { Button, Card, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaFolder, FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Nodata from '../../../components/common/Nodata';
import { CharacterService } from '../../../services';

const MySwal = withReactContent(Swal);

interface Folder {
    _id: string;
    name: string;
}

interface Props {
    character_id: string | undefined;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    folders: Folder[];
}

const ModalAssignKnowledge: React.FC<Props> = ({
    character_id,
    isOpen,
    onClose,
    onSubmit,
    folders,
}) => {
    const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        return () => {
            setSelectedFolders([]);
            setSearchTerm('');
        };
    }
    , [isOpen]);

    const handleSelectFolder = (folderId: string) => {
        setSelectedFolders((prev) =>
            prev.includes(folderId)
                ? prev.filter((id) => id !== folderId)
                : [...prev, folderId]
        );
    };

    const handleSave = async () => {
        if (selectedFolders.length === 0) {
            onClose();
            return;
        }
        if (!character_id) return;

        try {
            const response = await CharacterService.assignKnowledge(character_id, {
                folder_ids: selectedFolders,
            });

            if (response.data) {
                MySwal.fire({
                    icon: 'success',
                    title: 'บันทึกสำเร็จ',
                    showConfirmButton: false,
                    timer: 1500,
                });
                onSubmit();
            }
        } catch (error) {
            MySwal.fire({
                icon: 'error',
                title: 'บันทึกไม่สำเร็จ',
            });
        }
    };

    const filteredFolders = folders.filter((folder) =>
        folder.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Modal show={isOpen} onClose={onClose} size="xl">
            <Modal.Header className="text-2xl font-bold text-gray-800">
                เพิ่มคลังความรู้
            </Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <TextInput
                        id="search"
                        type="text"
                        icon={FaSearch}
                        placeholder="ค้นหาคลังความรู้"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full"
                    />
                    <div className="max-h-60 overflow-y-auto">
                        {filteredFolders.length > 0 ? (
                            filteredFolders.map((folder) => (
                                <FolderCard
                                    key={folder._id}
                                    folder={folder}
                                    isSelected={selectedFolders.includes(folder._id)}
                                    onSelect={() => handleSelectFolder(folder._id)}
                                />
                            ))
                        ) : (
                            <Nodata />
                        )}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="success" onClick={handleSave}
                    disabled={selectedFolders.length === 0}
                >
                    บันทึก
                </Button>
                <Button color="gray" onClick={onClose}>
                    ยกเลิก
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

interface FolderCardProps {
    folder: Folder;
    isSelected: boolean;
    onSelect: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({
    folder,
    isSelected,
    onSelect,
}) => (
    <Card
        className="mb-3 cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
        onClick={onSelect}
    >
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <FaFolder className="text-blue-500" size={20} />
                <span className="text-gray-700">{folder.name}</span>
            </div>
            {isSelected && <FaCheck className="text-green-500" size={20} />}
        </div>
    </Card>
);

export default ModalAssignKnowledge;