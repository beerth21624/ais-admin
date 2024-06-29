import { Button, Tabs } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaRegImage, FaRegQuestionCircle } from "react-icons/fa";
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import GeneralKnowledge from './components/GeneralKnowledge';
import ImageGallery from './components/ImageGallery';
import KnowledgeQA from './components/KnowledgeQA';
const MySwal = withReactContent(Swal)

//service
import { FolderService } from '../../services';

type KnowledgeItem = {
  _id: string;
  question: string;
  answer: string;
  record_status?: 'A' | 'I';
};

type ImageItem = {
  _id: string;
  description: string;
  image_url: string;
  record_status?: 'A' | 'I';
};

const TrainingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [folderName , setFolderName] = useState('');
  const [generalKnowledge, setGeneralKnowledge] = useState('');
  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([]);
  const [imageItems, setImageItems] = useState<ImageItem[]>([]);

  useEffect(() => {
    fetchFolderKnowledge();
  }, []);

  const fetchFolderKnowledge = async () => {
    if (!id) return;
    try {
      const response = await FolderService.getFolderById(id);
      if (response.data){
        setFolderName(response.data.name);
      setGeneralKnowledge(response.data.general_knowledge);
        setKnowledgeItems(response.data.qa_knowledge);
        setImageItems(response.data.image_knowledge);
      }
    } catch (e) {
      console.log(e)
    } 
  }


  // General Knowledge handlers
  const handleGeneralKnowledgeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGeneralKnowledge(e.target.value);
  };

  const handleSaveGeneralKnowledge = async () => {
    if(!id) return;
    try {
      console.log('generalKnowledge:', generalKnowledge)
      await FolderService.updateGeneralKnowledge(id, generalKnowledge);
      MySwal.fire({
        icon: 'success',
        title: 'สำเร็จ!',
        text: 'บันทึกข้อมูลสำเร็จ',
        showConfirmButton: false,
        timer: 1500,
      })
    } catch (error) {
      MySwal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด!',
      })
    }
  };



  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
      
        <div className=" flex justify-between items-center">
          <div className="flex items-center mb-4 gap-2">
            <h1 className="text-3xl font-bold">คลังความรู้:</h1>
            <p className="text-3xl">{folderName || ''}</p>
          </div>
          <Button color="gray" onClick={() => window.history.back()}>ย้อนกลับ</Button>
        </div>
      
        <Tabs aria-label="Default tabs" >

          <Tabs.Item active title="ความรู้ทั่วไป"  icon={HiOutlineInformationCircle}>
          <GeneralKnowledge
          generalKnowledge={generalKnowledge}
          onGeneralKnowledgeChange={handleGeneralKnowledgeChange}
          onSaveGeneralKnowledge={handleSaveGeneralKnowledge}
        />
        </Tabs.Item>
          <Tabs.Item title="ความรู้ ถาม-ตอบ" icon={FaRegQuestionCircle}>
        <KnowledgeQA
          folder_id={id}
          knowledgeItems={knowledgeItems}
          onChangeKnowledgeState={(newKnowledgeItems) => setKnowledgeItems(newKnowledgeItems as KnowledgeItem[])}
        />
        </Tabs.Item>
          <Tabs.Item title="รูปภาพ" icon={FaRegImage}>

        <ImageGallery
          folder_id={id}
          imageItems={imageItems}
          onChangeImageState={(newImageItems) => setImageItems(newImageItems as ImageItem[])}
        />
        </Tabs.Item>
        </Tabs>
      </div>

     
    </div>
  );
};

export default TrainingPage;