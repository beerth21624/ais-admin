import {useState,useEffect} from 'react'
import {  Button, Table } from 'flowbite-react';
import { HiPencil, HiPlus, HiTrash, HiEye } from 'react-icons/hi';
import ModalAssignKnowledge from './ModalAssignKnowledge';

//service
import { FolderService,CharacterService} from '../../../services';

type Props = {
    character_id: string | undefined;
}

type KnowledgeItem = {
    _id: string;
    name: string;
    description: string;
};

const AssignKnowledgeSection = (props: Props) => {
    const { character_id} = props;
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
                console.log("knowledgeItems",response.data)
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
        setKnowledgeItems(knowledgeItems.filter(item => item._id !== id));
    };

  return (
      <div>  <h2 className="text-xl font-semibold mt-8 mb-4">ความรู้ของหลานเอง</h2>
          <Button color="success" onClick={handleAddKnowledge} className="mb-4">
              <HiPlus className="mr-2" /> เพิ่มความรู้
          </Button>
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
                                    <Button color="info">
                                        <HiEye />
                                    </Button>
                                  <Button color="light" >
                                      <HiPencil />
                                  </Button>
                                  <Button color="failure" onClick={() => handleDeleteKnowledge(item._id)}>
                                      <HiTrash />
                                  </Button>
                              </Button.Group>
                          </Table.Cell>
                      </Table.Row>
                  ))}
              </Table.Body>
          </Table>
          <ModalAssignKnowledge
              character_id={character_id}
              isOpen={isKnowledgeModalOpen}
              onClose={() => {
                  setIsKnowledgeModalOpen(false)
              }}
              folders={folders}
          />
          </div>
  )
}

export default AssignKnowledgeSection