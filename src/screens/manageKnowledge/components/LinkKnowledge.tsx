import  { useState,useEffect } from 'react';
import { Button, TextInput, Checkbox, Table, Pagination } from 'flowbite-react';
import { FaPlus, FaLink, FaFile, FaTable, FaSync, FaTrash, FaEye } from 'react-icons/fa';
import { IoIosRocket } from "react-icons/io";
import Nodata from '../../../components/common/Nodata';
import ModalAddLink from './ModalAddLink';
import ModalViewLinkKnowledge from './ModalViewLinkKnowledge';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

//service
import { KnowledgeService } from "../../../services";

type LinkItem = {
    _id: string;
    name: string;
    url: string;
    content: string;
    record_status?: "A" | "I";
    is_recommend: boolean;
    is_training: boolean;
    last_training: string;
};

type props = {
    folder_id: string | undefined;
};



const LinkKnowledge = ({
    folder_id,
}:props) => {
    const [showModal, setShowModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [links, setLinks] = useState<LinkItem[]>([
      
    ]);
    const [filter, setFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const [tempLink_id, setTempLink_id] = useState('');

    const filteredLinks = links.filter(link =>
        link.url.toLowerCase().includes(filter.toLowerCase())
    );

    useEffect(() => {
        try {
            const fetchData = async () => {
                if (!folder_id) return;
                const response = await KnowledgeService.getLinkKnowledge(folder_id);
                setLinks(response.data);
            };
            fetchData();
        }catch (e) {
            console.log(e);
        }
    } , [folder_id]);

    const handleAddSource = () => {
        setShowModal(true);
    };

    const getIcon = (name: string) => {
        if (name.includes('.txt') || name.includes('.pdf')) return <FaFile className="text-blue-500" />;
        if (name.includes('.csv')) return <FaTable className="text-green-500" />;
        return <FaLink className="text-purple-500" />;
    };



    const handleSaveLinkKnowledge = async (newLink: { name: string; url: string; is_recommend:boolean }) => {
        if (!folder_id) return;
        try {
           const response =  await KnowledgeService.createLinkKnowledge(folder_id, newLink);
           console.log("response knowledge", response);
           setLinks(response.data.link_knowledge);
            MySwal.fire({
                icon: "success",
                title: "สำเร็จ!",
                text: "บันทึกข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
            });
        }
    }

    const handleTrainingLinkKnowledge = async (link_id:string) => {
        //confirm training
        const result = await MySwal.fire({
            icon: "warning",
            title: "ยืนยันการ Train",
            text: "คุณต้องการ Train ข้อมูลใช่หรือไม่?",
            showCancelButton: true,
            confirmButtonText: "ใช่",
            cancelButtonText: "ไม่ใช่",
        });
        if (!result.isConfirmed) return;

        if (!folder_id) return;
        try {
           const response= await KnowledgeService.trainingLinkKnowledge(folder_id, link_id);
           if(response.status === 200){
            MySwal.fire({
                icon: "success",
                title: "สำเร็จ!",
                text: "Train ข้อมูลสำเร็จ",
                showConfirmButton: false,
                timer: 1500,
            });
            if(response.data.link_knowledge){
            setLinks(
                response.data.link_knowledge)
            }
            }else{
                MySwal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด!",
                });
            }
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
            });
        }
    }

    const handleDeleteLinkKnowledge = async (link_id: string) => {
        //confirm delete
        const result = await MySwal.fire({
            icon: "warning",
            title: "ยืนยันการลบ",
            text: "คุณต้องการลบข้อมูลใช่หรือไม่?",
            showCancelButton: true,
            confirmButtonText: "ใช่",
            cancelButtonText: "ไม่ใช่",
        });
        if (!result.isConfirmed) return;

        if (!folder_id) return;
        try {
            const response = await KnowledgeService.deleteLinkKnowledge(folder_id, link_id);
            if(response.status === 200){
                MySwal.fire({
                    icon: "success",
                    title: "สำเร็จ!",
                    text: "ลบข้อมูลสำเร็จ",
                    showConfirmButton: false,
                    timer: 1500,
                });
                if(response.data.link_knowledge){
                    setLinks(
                        response.data.link_knowledge)
                    }
            }else{
                MySwal.fire({
                    icon: "error",
                    title: "เกิดข้อผิดพลาด!",
                });
            }
        } catch (error) {
            MySwal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด!",
            });
        }
    }





    return (
        <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800">
                        Training with Links
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">{`ทั้งหมด ${links.length} รายการ`}</p>
                </div>
                <Button color="success" onClick={handleAddSource} className="w-full md:w-auto">
                    <FaPlus className="mr-2" /> เพิ่ม URL
                </Button>
            </div>

            <div className='flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-6'>
                <div className="relative w-full md:w-auto flex-grow">
                    <TextInput
                        id="filter"
                        type="text"
                        placeholder="ค้นหา URL..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button color="light" className="w-full sm:w-auto" disabled>
                        <IoIosRocket className="mr-2" /> Train(0)
                    </Button>
                    <Button color="warning" className="w-full sm:w-auto" disabled>
                        <FaSync className="mr-2" /> Retrain(0)
                    </Button>
                    <Button color="failure" className="w-full sm:w-auto" disabled>
                        <FaTrash className="mr-2" /> Delete(0)
                    </Button>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <Table hoverable className="w-full">
                    <Table.Head>
                        <Table.HeadCell className="p-4">
                            <Checkbox />
                        </Table.HeadCell>
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>URL</Table.HeadCell>
                        <Table.HeadCell>Status</Table.HeadCell>
                        <Table.HeadCell></Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {filteredLinks.map((link, index) => (
                            <Table.Row key={index} className="bg-white hover:bg-gray-50">
                                <Table.Cell className="p-4">
                                    <Checkbox />
                                </Table.Cell>
                                <Table.Cell className="text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
                                    <span className="flex items-center">
                                        <span className="ml-2">{link.name}</span>
                                    </span>
                                </Table.Cell>
                                <Table.Cell className="text-gray-500 whitespace-nowrap overflow-hidden overflow-ellipsis max-w-xs">
                                    <span className="flex items-center">

                                    {getIcon(link.url)}
                                        <span className="ml-2">{link.url}</span>
                                    </span>
                                    
                                </Table.Cell>
                                <Table.Cell>
                                    <span className={`px-2 py-1 rounded-full text-xs ${link.is_training ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                                        {link.is_training ? 'Trained' : 'Not Trained'}
                                    </span>
                                </Table.Cell>
                                <Table.Cell className="flex items-center gap-2">
                                    {!link.is_training ? (
                                        <Button className='w-20' color="light" size="sm" onClick={() => handleTrainingLinkKnowledge(link._id)}>
                                            <IoIosRocket className="mr-2" /> Train
                                        </Button>
                                    ) : (
                                        <div className='w-20 h-8'></div>
                                    )}
                                    <Button color="info" size="sm" onClick={() => {
                                        setTempLink_id(link._id);
                                        setShowViewModal(true);
                                    }
                                    }
                                disabled={!link.is_training}
                                    >
                                        <FaEye />
                                    </Button>
                                    <Button color="failure" size="sm" onClick={()=>{
                                        handleDeleteLinkKnowledge(link._id)
                                    }}>
                                        <FaTrash className="" />
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                        {filteredLinks.length === 0 && (
                            <Table.Row className="bg-white hover:bg-gray-50 h-96">
                                <Table.Cell colSpan={6}>
                                    <Nodata />
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </div>

            <div className="mt-4 flex justify-end">
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(filteredLinks.length / itemsPerPage)}
                    onPageChange={setCurrentPage}
                    showIcons={true}
                />
            </div>

            <ModalAddLink
                show={showModal}
                onClose={() => setShowModal(false)}
                onAddLink={handleSaveLinkKnowledge}
            />
            <ModalViewLinkKnowledge
            folder_id={folder_id || ''}
            link_id={tempLink_id || ''}
            isOpen={showViewModal}
            onClose={() =>{
                setShowViewModal(false)
                setTempLink_id('')
            }}
            />
        </div>
    );
};

export default LinkKnowledge;