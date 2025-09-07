const conf = {
    projectEndPoint : import.meta.env.VITE_APPWRITE_ENDPOINT,
    projectID : import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseID : import.meta.env.VITE_APPWRITE_DATABASE_ID,
    userdbID : import.meta.env.VITE_APPWRITE_USERS_ID,
    doctorId : import.meta.env.VITE_APPWRITE_DOCTORS_ID,
    doctorSlots: import.meta.env.VITE_APPWRITE_DOCSLOTTS_ID,
    hospitalId: import.meta.env.VITE_APPWRITE_HOSPITALS_ID,
    appointmentId:import.meta.env.VITE_APPWRITE_APPOINTMENT_ID,
    MessagingId:import.meta.env.VITE_APPWRITE_MESSAGE_ID
}

export default conf