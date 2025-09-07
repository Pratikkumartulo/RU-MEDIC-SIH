import { Client, Databases, ID, Query } from "appwrite";
import conf from "../config/EnvConfig";
import { setupListeners } from "@reduxjs/toolkit/query";


export class createDcoument {
    client = new Client();
    databases;
    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(conf.projectID);
        this.databases = new Databases(this.client);
    }
    async CreateUser({email,password,name,phone,age,gender,address}){
        console.log(email,password,name,phone,age,gender,address)
        const createdUser =await this.databases.createDocument(
            conf.databaseID,
            conf.userdbID,
            ID.unique(),
            {email,password,name,phone,age:parseInt(age),gender:gender.toLowerCase(),address}
        )
        if(createdUser){
            return createdUser;
        }else{
            return false;
        }
    }
    async CreateDoctor({email,name,contact,specializations,hospital}){
        console.log({email,name,contact,specializations,hospital})
        const createdUser =await this.databases.createDocument(
            conf.databaseID,
            conf.doctorId,
            ID.unique(),
            {email,name,contact,specializations,hospital}
        )
        if(createdUser){
            return createdUser;
        }else{
            return false;
        }
    }

    async generateUnique4DigitHospitalId() {
        let isUnique = false;
        let newId = "";
        while (!isUnique) {
            newId = Math.floor(1000 + Math.random() * 9000).toString();
            // Check if this ID exists
            const existing = await this.databases.listDocuments(
                conf.databaseID,
                conf.hospitalId,
                [Query.equal('uniqueId', String(newId))]
            );
            if (existing.total === 0) {
                isUnique = true;
            }
        }
        return String(newId);
    }

    async CreateNewHospital({name,location,contact,email,departments,pharmacy,capacity,availableBeds}) {
        console.log({name,location,contact,email,departments,pharmacy});
        const uniqueId = await this.generateUnique4DigitHospitalId();
        const createdHospital = await this.databases.createDocument(
            conf.databaseID,
            conf.hospitalId,
            ID.unique(),
            {name,location,contact,email,departments,pharmacy,uniqueId,capacity:parseInt(capacity),availableBeds:parseInt(availableBeds)}
        );
        return createdHospital;
    }

    async updateDoctor(doc, docCreated,specialization) {
        console.log(doc);
        const updated = await this.databases.updateDocument(
            conf.databaseID,
            conf.userdbID,
            doc.$id,
            {
                role: 'doctor',
                docId: docCreated.$id,
                email: doc.email,
                password: doc.password,
                name: doc.name,
                phone: doc.phone,
                age: doc.age,
                gender: doc.gender,
                address: doc.address,
                specialization
            }
        );
        if (updated) {
            return updated;
        } else {
            return false;
        }
    }

    async addSlot({docId, date, startTime, endTime, capacity}) {
        console.log(docId, date, startTime, endTime, capacity);
        const docDetails = await this.databases.createDocument(
            conf.databaseID,
            conf.doctorSlots,
            ID.unique(),
            {
                doctorId:docId,
                date,
                timeSlot: `${startTime}-${endTime}`,
                capacity:parseInt(capacity),
                booked:0
            }
        );
        if (!docDetails) {
            return false;
        }
        return docDetails;  
    }

    async addAvailable({docId, data}) {
        // Fetch the current doctor document to get the existing 'available' array
        const doctorDoc = await this.databases.getDocument(
            conf.databaseID,
            conf.doctorId,
            docId
        );
        const currentAvailable = doctorDoc.availabity || [];
        const updatedAvailable = [
            ...currentAvailable,
            `${data.date}:${data.startTime}-${data.endTime}`
        ];

        const docDetails = await this.databases.updateDocument(
            conf.databaseID,
            conf.doctorId,
            docId,
            {
                availabity: updatedAvailable
            }
        );
        if (!docDetails) {
            return false;
        } else {
            const slotAdded = await this.addSlot({
                docId,
                date: data.date,
                startTime: data.startTime,
                endTime: data.endTime,
                capacity: data.capacity
            });
            if (!slotAdded) {
                return false;
            } else {
                return docDetails;
            }
        }
    }

    async getDoctorSlots(docId) {
        if (!docId) {
            throw new Error("Doctor ID is required for fetching slots.");
        }
        const slots = await this.databases.listDocuments(
            conf.databaseID,
            conf.doctorSlots,
            [
                Query.equal('doctorId', docId)
            ]
        );
        return slots;
    }

    async getHospitalLogin({id,password}){
        //find a single hosppital by its id
        let hospital = await this.databases.listDocuments(
            conf.databaseID,
            conf.hospitalId,
            [
                Query.equal('uniqueId',id),
                Query.equal('password',password)
            ]
        );
        console.log(hospital);
        if(hospital.total === 0){
            return false;
        }
        return hospital.documents[0];
    }

    async addDoctorToHospital({ahospitalId, doctorId}) {
        console.log(ahospitalId,doctorId);
        try {
            // Fetch the hospital document to get the existing 'doctors' array
            let hospitalDoc = await this.databases.getDocument(
                conf.databaseID,
                conf.hospitalId,
                ahospitalId
            );
            console.log("Found Hospital", hospitalDoc);
            // Check if the hospital document exists
            if (!hospitalDoc) {
                throw new Error("Hospital not found");
            }
            // hospitalDoc = hospitalDoc.documents[0];
            console.log("Hospital Document:", hospitalDoc);

            // Add the doctor ID to the hospital's 'doctors' array
            const updatedDoctors = [...hospitalDoc.doctors || [], doctorId];
            const updatedHospital = await this.databases.updateDocument(
                conf.databaseID,
                conf.hospitalId,
                hospitalDoc.$id,
                { doctors: updatedDoctors }
            );

            return updatedHospital;
        } catch (error) {
            console.error("Error adding doctor to hospital:", error);
            throw error;
        }
    }
    async getstarDoctors(){
        let doctors = await this.databases.listDocuments(
            conf.databaseID,
            conf.doctorId,
            [
                Query.equal('hospital','***')
            ]
        );
        return doctors;
    }
    async getDoctorIdDetails(docId){
        // console.log(email)
        let doctor = await this.databases.getDocument(
            conf.databaseID,
            conf.doctorId,
            docId
        );
        return doctor;
    }
    async getDoctorEmailDetails(email){
        // console.log(email)
        let doctor = await this.databases.listDocuments(
            conf.databaseID,
            conf.doctorId,
            [
                Query.equal('email',email)
            ]
        );
        return doctor.documents[0];
    }
    async getAllUser(){
        let user = await this.databases.listDocuments(
            conf.databaseID,
            conf.userdbID,
        );
        return user;
    }

    async getAllHospital(){
        let hospitals = await this.databases.listDocuments(
            conf.databaseID,
            conf.hospitalId,
        );
        return hospitals;
    }

    async updateAppointmentDoctor({doctorId,date,time,patientId}){
        try{
            let doctorSlot = await this.databases.listDocuments(
                conf.databaseID,
                conf.doctorSlots,
                [
                    Query.equal('doctorId',doctorId),
                    Query.equal('date',date),
                    Query.equal('timeSlot',time)
                ]
            );
            doctorSlot = doctorSlot.documents[0];
            if(doctorSlot.isFull){
                alert("No slot available, Try another time");
                return false;
            }
            console.log(doctorSlot);
            let count = doctorSlot.booked+1
            console.log(count);
            let checkFull = count == doctorSlot.capacity
            let patients = doctorSlot.patientsIds || [];
            patients.push(patientId);
            await this.databases.updateDocument(
                conf.databaseID,
                conf.doctorSlots,
                doctorSlot.$id,
                {
                    booked:count,
                    isFull:checkFull,
                    patientsIds:patients
                }
            );
            return true;
        }catch(err){
            console.log("Error updating appointment:", err);
        }
    }

    async createAppointment({ patientId,
         doctorId,
          date,
           time,
            symptoms,
             status }) {
        try {
            let created = this.updateAppointmentDoctor({doctorId,date,time,patientId});
            console.log(created);
            if(created){
                let appointment = await this.databases.createDocument(
                    conf.databaseID,
                    conf.appointmentId,
                    ID.unique(),
                    {
                        patientId,
                        doctorId,
                        date,
                        time,
                        symptoms,
                        status
                    }
                );
                return appointment;
            }
        } catch (err) {
            console.error("Error creating appointment:", err);
            return false;
        }
    }
    async getUserByEmail(email){
        let user = await this.databases.listDocuments(
            conf.databaseID,
            conf.userdbID,
            [
                Query.equal('email',email)
            ]
        );
        return user.documents[0];
    }
    async getUserAppointments(patientId){
        let appointments = await this.databases.listDocuments(
            conf.databaseID,
            conf.appointmentId,
            [
                Query.equal('patientId',patientId)
            ]
        );
        return appointments;
    }
//     async updateUserAppDetails(slug,{isUser}){
//         try{
//            return await this.databases.updateDocument(
//             conf.databaseID,
//             conf.collectioNID,
//             slug,
//             {isUser}
//            )
//         }catch(err){
//             console.log("Update error for post : ",err)
//         }
//     }
//     async updateUserChatDetails(username1, username2) {
//       try {
//           // Fetch user details (ensure getIdDetails is async)
//           const usr1 = await this.getIdDetails(username1);
//           const usr2 = await this.getIdDetails(username2);
  
//           // Extract ChatsWith arrays, handle undefined
//           const chatsWith1 = usr1.ChatsWith || [];
//           const chatsWith2 = usr2.ChatsWith || [];
  
//           // Add usernames if not already present
//           if (!chatsWith1.includes(username2)) {
//               chatsWith1.push(username2);
//           }
//           if (!chatsWith2.includes(username1)) {
//               chatsWith2.push(username1);
//           }
  
//           // Update both users' ChatsWith fields in parallel
//           await Promise.all([
//               this.databases.updateDocument(
//                   conf.databaseID,
//                   conf.collectioNID,
//                   usr1.$id,
//                   { ChatsWith: chatsWith1 }
//               ),
//               this.databases.updateDocument(
//                   conf.databaseID,
//                   conf.collectioNID,
//                   usr2.$id,
//                   { ChatsWith: chatsWith2 }
//               ),
//           ]);
  
//           // console.log("Chat details updated successfully for", username1, "and", username2);
//       } catch (err) {
//           console.error("Error updating chat details for", username1, "and", username2, ":", err);
//       }
//   }
  
//     async follow(slug, { UserName, currentId }) {
//         try {
//           // Fetch the target user document (the user being followed)
//           const targetUser = await this.databases.getDocument(
//             conf.databaseID,
//             conf.collectioNID,
//             slug
//           );
      
//           // Fetch the current user's document to get the UserName
//           const currentUser = await this.databases.getDocument(
//             conf.databaseID,
//             conf.collectioNID,
//             currentId
//           );
      
//           const currentUserName = UserName; // Assuming `UserName` is stored in the document
      
//           // Add the current user's username to the target user's followers list if not already present
//           const updatedFollowers = targetUser.Follower || [];
//           if (!updatedFollowers.includes(currentUserName)) {
//             updatedFollowers.push(currentUserName);
//           }
      
//           // Add the target user's username to the current user's following list if not already present
//           const updatedFollowings = currentUser.Following || [];
//           if (!updatedFollowings.includes(targetUser.UserName)) {
//             updatedFollowings.push(targetUser.UserName);
//           }
      
//           // Update the target user's document with the new followers list
//           await this.databases.updateDocument(
//             conf.databaseID,
//             conf.collectioNID,
//             slug,
//             { Follower: updatedFollowers }
//           );
      
//           // Update the current user's document with the new following list
//           await this.databases.updateDocument(
//             conf.databaseID,
//             conf.collectioNID,
//             currentId,
//             { Following: updatedFollowings }
//           );
      
//           return true;
//         } catch (err) {
//           console.error("Error during follow action:", err);
//           return false;
//         }
//       }

//       async unfollow (slug, { UserName, currentId }){
//         try {
//           // Fetch the target user document (the user being unfollowed)
//           const targetUser = await this.databases.getDocument(
//             conf.databaseID,
//             conf.collectioNID,
//             slug
//           );
      
//           // Fetch the current user document (the user initiating the unfollow)
//           const currentUser = await this.databases.getDocument(
//             conf.databaseID,
//             conf.collectioNID,
//             currentId
//           );
      
//           // Remove the current user's ID from the target user's followers list
//           const updatedFollowers = targetUser.Follower || [];
//           const followerIndex = updatedFollowers.indexOf(UserName);
//           if (followerIndex !== -1) {
//             updatedFollowers.splice(followerIndex, 1);
//           }
      
//           // Remove the target user's ID from the current user's following list
//           const updatedFollowings = currentUser.Following || [];
//           const followingIndex = updatedFollowings.indexOf(targetUser.UserName);
//           if (followingIndex !== -1) {
//             updatedFollowings.splice(followingIndex, 1);
//           }
      
//           // Update the target user's document with the new followers list
//           await this.databases.updateDocument(
//             conf.databaseID,
//             conf.collectioNID,
//             slug,
//             { Follower: updatedFollowers }
//           );
      
//           // Update the current user's document with the new following list
//           await this.databases.updateDocument(
//             conf.databaseID,
//             conf.collectioNID,
//             currentId,
//             { Following: updatedFollowings }
//           );
      
//           return true; // Successfully unfollowed
//         } catch (err) {
//           console.error("Error unfollowing user:", err);
//           return false; // Unfollow failed
//         }
//       };

//       async getMentor(SpecializedIn){
//         const mentors = await this.databases.listDocuments(
//           conf.databaseID,
//           conf.collectioNID,
//           [
//               Query.equal('isUser',false),
//               Query.equal('SpecializedIn',SpecializedIn)
//           ]
//         )
//       // console.log(user.documents);
//       return mentors;
//       }
}
const DocumentService = new createDcoument();
export default DocumentService