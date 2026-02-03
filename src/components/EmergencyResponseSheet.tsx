import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with specific credentials for this component
const supabaseUrl = "https://nqiyyailhxmavrcokrmv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xaXl5YWlsaHhtYXZyY29rcm12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5NTMzNzQsImV4cCI6MjA4NTUyOTM3NH0.py8zZIE91mqXq3SDw6BIDJEFw5qCLuCMAISTZrnzt7M";
const supabase = createClient(supabaseUrl, supabaseKey);

interface HospitalResponse {
    id: string;
    hospital_name: string;
    status: "BED AVAILABLE" | "HOSPITAL FULL";
    bed_availability: boolean; // true = Available, false = Full
    medical_advice: string;
    created_at: string;
    responded_at: string;
    eta: string;
    emergency_id: string;
}

interface EmergencyResponseSheetProps {
    emergencyId: string | null;
}

const EmergencyResponseSheet = ({ emergencyId }: EmergencyResponseSheetProps) => {
    const [responses, setResponses] = useState<HospitalResponse[]>([]);

    useEffect(() => {
        if (!emergencyId) return;

        // Initial fetch of existing responses
        const fetchResponses = async () => {
            console.log("Fetching initial responses for emergency ID:", emergencyId);
            const { data, error } = await supabase
                .from("Hospital_Responses")
                .select("*")
                .eq("emergency_id", emergencyId)
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching responses:", error);
            } else if (data) {
                setResponses(data as unknown as HospitalResponse[]);
            }
        };

        fetchResponses();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('hospital_replies')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'Hospital_Responses',
                    filter: `emergency_id=eq.${emergencyId}`,
                },
                (payload) => {
                    console.log('New response received:', payload);
                    const newResponse = payload.new as HospitalResponse;
                    setResponses((prev) => [newResponse, ...prev]);
                }
            )
            .subscribe();

        // Cleanup subscription on unmount or id change
        return () => {
            supabase.removeChannel(channel);
        };
    }, [emergencyId]);

    if (!emergencyId) return null;

    return (
        <div className="mt-8 border rounded-lg overflow-hidden shadow-sm bg-white" style={{ fontFamily: 'sans-serif' }}>
            <div className="bg-gray-50 px-6 py-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Hospital Responses</h3>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-medium text-green-700">Live Tracking Active</span>
                </div>
            </div>

            {responses.length === 0 ? (
                <div className="p-8 text-center bg-blue-50/50">
                    <div className="inline-block relative">
                        <div className="w-4 h-4 bg-blue-500 rounded-full animate-ping absolute"></div>
                        <div className="w-4 h-4 bg-blue-500 rounded-full relative"></div>
                    </div>
                    <p className="mt-4 text-gray-600 font-medium animate-pulse">Waiting for nearby hospitals...</p>
                    <p className="text-sm text-gray-400 mt-2">Emergency ID: {emergencyId}</p>
                </div>
            ) : (
                <div className="divide-y">
                    {responses.map((response) => (
                        <div key={response.id} className="p-6 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h4 className="font-bold text-xl text-gray-900">{response.hospital_name}</h4>
                                    {response.eta && (
                                        <p className="text-sm text-blue-600 font-medium mt-1">
                                            🚑 ETA: {response.eta}
                                        </p>
                                    )}
                                </div>

                                {response.bed_availability === true ? (
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full border border-green-200">
                                        Available
                                    </span>
                                ) : response.bed_availability === false ? (
                                    <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-bold rounded-full border border-red-200">
                                        Full
                                    </span>
                                ) : (
                                    // Fallback to strict string status matching if bed_availability is missing
                                    response.status === "BED AVAILABLE" ? (
                                        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-bold rounded-full border border-green-200">
                                            BED AVAILABLE
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-bold rounded-full border border-red-200">
                                            HOSPITAL FULL
                                        </span>
                                    )
                                )}
                            </div>

                            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-md">
                                <p className="text-sm font-bold text-blue-700 mb-1">Medical Advice:</p>
                                <p className="text-gray-700">{response.medical_advice}</p>
                            </div>

                            <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
                                <span>
                                    Responded: {response.responded_at
                                        ? new Date(response.responded_at).toLocaleTimeString()
                                        : new Date(response.created_at).toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EmergencyResponseSheet;
