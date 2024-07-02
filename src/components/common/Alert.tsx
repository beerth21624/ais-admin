// Alert.tsx
import React from 'react';
import { Modal } from 'flowbite-react';
import { useAlert } from '../../contexts/AlertContext';

const Alert: React.FC = () => {
    const { alertType, message, hideAlert } = useAlert();

    const renderAlertContent = () => {
        switch (alertType) {
            case 'loading':
                return <LoadingContent />;
            case 'success':
                return <SuccessContent message={message} />;
            case 'error':
                return <ErrorContent message={message} />;
            default:
                return null;
        }
    };

    return (
        <Modal
            show={alertType !== null}
            size="md"
            onClose={hideAlert}
            style={{
                padding: '0',
                outline: 'none',
                border: 'none',
            }}
         
            >
            <Modal.Body className="p-8">
                {renderAlertContent()}
            </Modal.Body>
        </Modal>
    );
};

const LoadingContent: React.FC = () => (
    <div className="flex flex-col items-center">
        <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0">
                <div className="w-full h-full border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            </div>
        </div>
        <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
            กำลังโหลด...
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400">
            กรุณารอสักครู่
        </p>
    </div>
);

const SuccessContent: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center">
        <div className="mb-4 text-green-500">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
            สำเร็จ
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400">
            {message}
        </p>
    </div>
);

const ErrorContent: React.FC<{ message: string }> = ({ message }) => (
    <div className="flex flex-col items-center">
        <div className="mb-4 text-red-500">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
        <h3 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-gray-200">
            เกิดข้อผิดพลาด
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-400">
            {message}
        </p>
    </div>
);

export default Alert;