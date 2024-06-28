import { Button, Textarea } from 'flowbite-react';
import React from 'react';



type GeneralKnowledgeProps = {
    generalKnowledge: string;
    onGeneralKnowledgeChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSaveGeneralKnowledge: () => void;
};

const GeneralKnowledge: React.FC<GeneralKnowledgeProps> = ({
    generalKnowledge,
    onGeneralKnowledgeChange,
    onSaveGeneralKnowledge,
}) => {



    return (
        <div className="mt-4  p-2 rounded-lg">
            <Textarea
                value={generalKnowledge}
                onChange={onGeneralKnowledgeChange}
                placeholder="กรอกข้อมูลความรู้ทั่วไป"
                rows={26}
                className="mb-4"
            />
            <div className="flex justify-end">
                <Button color="success" onClick={onSaveGeneralKnowledge}>
                    บันทึกข้อมูลทั่วไป
                </Button>
            </div>
        </div>
    );
};

export default GeneralKnowledge;