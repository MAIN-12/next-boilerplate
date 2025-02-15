// components/SupportModal.tsx
import React, { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
} from "@heroui/react";
import { useTranslations } from 'next-intl';
import { BugReport, Lightbulb, Feedback, HelpOutline } from '@mui/icons-material';

import BackArrowIcon from '../icons/BackArrow';

import ReportBug from "./ReportBug";
import ProvideFeedback from "./ProvideFeedback";
import RequestFeature from "./RequestFeature";
import RequestHelp from "./RequestHelp";


interface SupportModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onOpenChange }) => {
    const t = useTranslations('FeedBackModal');
    const [currentView, setCurrentView] = useState<string>("");

    const handleButtonClick = (view: string) => {
        setCurrentView(view);
    };

    const handleBackClick = () => {
        setCurrentView("");
    };

    const buttons = [
        {
            id: 'bug',
            icon: <BugReport />,
            label: t('reportBug'),
        },
        {
            id: 'feature',
            icon: <Lightbulb />,
            label: t('requestFeature'),
        },
        {
            id: 'feedback',
            icon: <Feedback />,
            label: t('provideFeedback'),
        },
        {
            id: 'Help',
            icon: <HelpOutline />,
            label: t('help'),
        },
    ];

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col">
                    {currentView !== "" ? (
                        <Button
                            onPress={handleBackClick}
                            variant="light"
                            isIconOnly
                        >
                            <BackArrowIcon />
                        </Button>
                    ) : (
                        <h2 className="text-2xl font-bold text-center">{t("title")}</h2>
                    )}
                </ModalHeader>
                <ModalBody>
                    {currentView === "" && (
                        <>
                            <p className="text-center mb-6">{t("intro")}</p>
                            <div className={`grid gap-4 ${buttons.length <= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                                {buttons.map((button) => (
                                    <Button
                                        key={button.id}
                                        onPress={() => handleButtonClick(button.id)}
                                        className={`flex flex-col items-center justify-center h-20 w-full p-4 shadow-md transition-all duration-200 hover:shadow-lg ${buttons.length <= 3 ? 'aspect-[3/2]' : 'aspect-square'
                                            }`}
                                        variant="bordered"
                                    >
                                        <div className="flex flex-col items-center">
                                            {React.cloneElement(button.icon, { className: " text-3xl mb-2" })}
                                            <span className="text-center w-full break-words text-sm">{button.label}</span>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </>
                    )}

                    {currentView === "bug" && (<ReportBug />)}
                    {currentView === "feature" && (<RequestFeature />)}
                    {currentView === "feedback" && (<ProvideFeedback />)}
                    {currentView === "Help" && (<RequestHelp />)}
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal >
    );
};

export default SupportModal;
