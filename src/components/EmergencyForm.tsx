import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useTranslation } from 'react-i18next';

interface EmergencyFormProps {
    patientName: string;
    setPatientName: (name: string) => void;
    emergencyType: string;
    setEmergencyType: (type: string) => void;
    message: string;
    setMessage: (message: string) => void;
    handleEmergency: () => void;
    isLoading: boolean;
    locationError: string | null;
    coords: { lat: number | null; lng: number | null };
    isNameTouched: boolean;
    setIsNameTouched: (touched: boolean) => void;
}

const EmergencyForm: React.FC<EmergencyFormProps> = ({
    patientName,
    setPatientName,
    emergencyType,
    setEmergencyType,
    message,
    setMessage,
    handleEmergency,
    isLoading,
    locationError,
    coords,
    isNameTouched,
    setIsNameTouched
}) => {
    const { t } = useTranslation();

    return (
        <div className="bg-background border-2 border-red-600 rounded-xl p-6 shadow-sm dark:border-red-500 overflow-y-auto">
            <div className="mb-6 flex items-center gap-2 border-b border-red-100 pb-2 text-2xl font-bold text-red-600 dark:border-red-900 dark:text-red-500">
                <span>🚨</span> {t('sos.access.title')}
            </div>

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="patient-name" className="text-sm font-semibold text-foreground">
                        {t('sos.access.patientName')} <span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="patient-name"
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        onBlur={() => setIsNameTouched(true)}
                        placeholder={t('sos.access.patientNamePlaceholder')}
                        className={`w-full ${isNameTouched && !patientName ? "border-red-500 bg-red-50 dark:bg-red-950/20" : ""}`}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="emergency-type" className="text-sm font-semibold text-foreground">
                        {t('sos.access.type')}
                    </Label>
                    <Select value={emergencyType} onValueChange={setEmergencyType}>
                        <SelectTrigger id="emergency-type" className="w-full">
                            <SelectValue placeholder={t('sos.access.typePlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Snake Bite">{t('sos.access.types.snakeBite')}</SelectItem>
                            <SelectItem value="Accident / Trauma">{t('sos.access.types.accident')}</SelectItem>
                            <SelectItem value="Cardiac / Chest Pain">{t('sos.access.types.cardiac')}</SelectItem>
                            <SelectItem value="Pregnancy Emergency">{t('sos.access.types.pregnancy')}</SelectItem>
                            <SelectItem value="Severe Fever / Infection">{t('sos.access.types.fever')}</SelectItem>
                            <SelectItem value="Other">{t('sos.access.types.other')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="emergency-message" className="text-sm font-semibold text-foreground">
                        {t('sos.access.message')}
                    </Label>
                    <Textarea
                        id="emergency-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t('sos.access.messagePlaceholder')}
                        className="min-h-[80px] resize-y"
                    />
                </div>

                {locationError && (
                    <div className="mb-2 text-sm font-bold text-red-600 dark:text-red-400">
                        ⚠️ {locationError}
                    </div>
                )}

                <Button
                    onClick={handleEmergency}
                    disabled={isLoading || !patientName || coords.lat === null}
                    className="w-full bg-red-600 py-6 text-lg font-bold uppercase hover:bg-red-700 disabled:opacity-60 dark:text-white mt-4"
                >
                    {isLoading ? t('sos.access.sending') : t('sos.access.pushButton')}
                </Button>
            </div>
        </div>
    );
};

export default EmergencyForm;
