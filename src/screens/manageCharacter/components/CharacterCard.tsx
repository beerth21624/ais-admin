import { Badge, Button, Card } from 'flowbite-react';
import React from 'react';
import { useNavigate } from "react-router-dom";

type CharacterCardProps = {
    character:{
        _id?: string;
        name: string;
        image_name?: string;
        image_url: string;
        description: string;
        prompt?: string;
        record_status?: string;
    }
};

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
    const navigate = useNavigate();


    const handleViewDetail = () => {
        navigate(`/character-detail/${character._id}`);
    }


    return (
        <Card className="max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
            <div className="relative">
                <img
                    src={character.image_url}
                    alt={character.name}
                    className="w-full h-32  xl:h-56 object-contain transition-transform duration-300 ease-in-out hover:scale-105"
                />
                <Badge color={
                    character.record_status==='A'? 'success':'failure'
                
                }className="absolute top-2 right-2">
                    {character.record_status==='A'? 'Active':'Inactive'}
                </Badge>
            </div>
            <div className="p-2">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-ellipsis break-words ">
                    {character.name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3 whitespace-nowrap text-ellipsis break-words
                ">
                    {character.description}
                </p>
                <div className="flex justify-end items-center mt-4">
                  
                    <Button color="info" size="sm"
                        onClick={handleViewDetail}
                    >
                        ดูรายละเอียด
                    </Button>
                  
                    
                </div>
            </div>
        </Card>
    );
};

export default CharacterCard;