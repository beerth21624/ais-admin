import { Modal, Button } from 'flowbite-react';
import { KnowledgeService } from '../../../services';
import { useEffect,useState } from 'react';

type LinkKnowledge = {
    _id: string;
    name: string;
    url: string;
    content: string;
    record_status?: "A" | "I";
    is_recommend: boolean;
    is_training: boolean;
    last_training: string;

};

function ModalViewLinkKnowledge({
    folder_id,
    link_id,
    isOpen,
    onClose,
}:{
    folder_id: string;
    link_id: string;
    isOpen: boolean;
    onClose: () => void;
}) {
    const [linkKnowledge, setLinkKnowledge] = useState<LinkKnowledge>();
    console.log('linkKnowledge', linkKnowledge);

        useEffect(() => {
        if (folder_id && link_id) {
        fetchLinkKnowledgeById();
        }
    }
    , [folder_id, link_id]);

    const fetchLinkKnowledgeById = async () => {
 
        try {
            const response = await KnowledgeService.getLinkKnowledgeById(folder_id, link_id);
            setLinkKnowledge(response.data);
        } catch (error) {
            console.log(error);
        }
    }

 


    return (
        <>
            <Modal show={isOpen}  size="4xl" onClose={onClose}>
                <Modal.Header >
                    <h3 className="text-xl font-semibold">
                        {linkKnowledge?.name}
                    </h3>
                </Modal.Header>
                <Modal.Body>
                   
                    <div className="space-y-4 max-h-96 overflow-y-auto
                    ">
                        <p>
                            {linkKnowledge?.content}
                        </p>
                      
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="gray" onClick={onClose}>
                        ปิด
                    </Button>
                    <Button color="success" href={linkKnowledge?.url || '#'} target="_blank">
                        เยี่ยมชมเว็บไซต์ทางการ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalViewLinkKnowledge;